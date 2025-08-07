import htmlParserPlugin from "prettier/plugins/html";
import { formatAlpineAttribute, isAlpineAttribute } from "./alpine.mjs";

const htmlParser = htmlParserPlugin.parsers.html;
const htmlPrinter = htmlParserPlugin.printers.html;

/** @type {Record<string, import('prettier').Parser>} */
export const parsers = {
  html: {
    ...htmlParser,
    preprocess(text, options) {
      // Calculate nesting level for each line
      const nesting = [];
      let currentNesting = 0;

      for (let i = 0; i < text.length; i++) {
        if (text[i] === "\n") {
          nesting.push(currentNesting);
        } else if (text[i] === "<" && text[i + 1] !== "/" && text[i + 1] !== "!" && text[i + 1] !== "?") {
          currentNesting++;
          nesting[nesting.length || 0] = currentNesting;
        } else if (text[i] === "<" && text[i + 1] === "/") {
          currentNesting--;
        }
      }
      nesting.push(currentNesting);

      // Store nesting for later
      options.nesting = nesting;

      return text;
    },
  },
};

// Perform custom Alpine and Django printing, including reinserting Django tags
/** @type {Record<string, import('prettier').Printer>} */
export const printers = {
  html: {
    ...htmlPrinter,
    preprocess: async (ast, options) => {
      ast = htmlPrinter.preprocess(ast, options);

      // Find Alpine directives and format them
      const traverse = async (node) => {
        if (node.type === "element") {
          if (node.attrs) {
            for (const attr of node.attrs) {
              if (attr.name && attr.value && isAlpineAttribute(attr.name)) {
                attr.value = await formatAlpineAttribute(attr.name, attr.value, options, options.nesting[attr.valueSpan.start.line]);
              }
            }
          }
        }
        if (node.children) {
          for (const child of node.children) {
            await traverse(child);
          }
        }
      };
      await traverse(ast);
      return ast;
    },
    print(path, options, print) {
      let doc = htmlPrinter.print(path, options, print);
      return doc;
    },
  },
};

export const defaultOptions = {
  singleQuote: true,
};
