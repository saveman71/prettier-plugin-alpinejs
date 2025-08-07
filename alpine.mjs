import prettier from 'prettier';

const alpineExpressionAttributeMatch =
  /^:[\w\d-]+|x-(data|show|bind|text|html|model|modelable|if|id)([.\w\d\-:])*/;
const alpineNonExpressionAttributeMatch =
  /@[\w\d-]+|x-(init|on|effect)([.\w\d\-:])*/;

export const isAlpineAttribute = attrName => {
  return (
    alpineExpressionAttributeMatch.test(attrName) ||
    alpineNonExpressionAttributeMatch.test(attrName)
  );
};

export const formatAlpineAttribute = async (
  attrName,
  attrValue,
  options,
  col
) => {
  if (!attrValue) {
    return attrValue;
  }

  const isExpression = alpineExpressionAttributeMatch.test(attrName);
  const isValidButNotExpression =
    !isExpression && alpineNonExpressionAttributeMatch.test(attrName);
  if (!isExpression && !isValidButNotExpression) {
    return attrValue;
  }

  let formattedAttributeValue = await formatAlpineAttributeValue(
    attrValue,
    isExpression,
    options,
    col
  );

  return formattedAttributeValue;
};

async function formatAlpineAttributeValue(
  value,
  isValueExpression,
  options,
  col
) {
  const valueToFormat = isValueExpression ? `() => (${value})` : value;

  let f = '';
  try {
    f = await prettier.format(valueToFormat, {
      ...options,
      parser: 'typescript',
      __isInHtmlAttribute: true,
      __embeddedInHtml: true,
    });

    // Remove any leading semicolons that might appear
    f = f.replace(/^;+/, '');

    // trim spaces
    f = f.trim();

    if (isValueExpression) {
      // Remove the () => from the formatted value using regex (ignore whitespace)
      f = f.replace(/\s*\(\s*\)\s*=>\s*/, '');
      // IF there's a ( at the start and a ) at the end, remove them
      f = f.trim();
      if (f.startsWith('(') && f.endsWith(')')) {
        f = f.slice(1, -1);
      } else if (f.startsWith('(') && f.endsWith(');')) {
        f = f.slice(1, -2);
      }
    }

    // Allow short values to be on one line, first, test if there's any new lines that are inside of template strings
    if (!/`[^`]*\n[^`]*`/.test(f) && f.includes('\n')) {
      const oneLineVersion = f.replace(/\s+/gm, ' ');
      const finalWidth = oneLineVersion.length + col * options.tabWidth;
      if (finalWidth <= options.printWidth && oneLineVersion.length < 60) {
        f = oneLineVersion;
      }
    }

    // If any new line isn't followed by whitespace, indent it and put on new lines
    if (/\n[^\s{}]/.test(f)) {
      // indent first
      const indent = options.useTabs ? '\t' : ' '.repeat(options.tabWidth || 2);
      f = f.replace(/\n/g, `\n${indent}`);
      f = `\n${indent}${f}\n`;
    } else {
      // remove last char if its a semicolon
      f = f.replace(/;$/, '');
    }

    // Ensure semicolons between multiple statements in one-liners
    // Skip text inside quotes/strings
    const stringLiterals = [];
    let stringReplacer = match => {
      const placeholder = `__STRING_${stringLiterals.length}__`;
      stringLiterals.push(match);
      return placeholder;
    };

    // Remove any semicolons at the beginning of lines
    f = f.replace(/\n\s*;/g, '\n');

    // Indent to match the attribute position
    const indentation = options.useTabs
      ? '\t'.repeat(col)
      : ' '.repeat((options.tabWidth || 2) * col);

    f = f.replace(/\n/g, `\n${indentation}`);

    // Remove trailing whitespace
    f = f.replace(/[ \t]+\n/g, '\n');

    // Remove trailing commas in objects and arrays
    f = f.replace(/,(\s*)}/g, '$1}');
    f = f.replace(/,(\s*)]/g, '$1]');

    // Clean up any remaining semicolons in the formatted text if it's a one-liner
    if (!/\n/.test(f)) {
      f = f.replace(/;(\s*)(,|\)|\]|\})/g, '$1$2');
    }
  } catch (error) {
    f = value;
  }

  return f;
}
