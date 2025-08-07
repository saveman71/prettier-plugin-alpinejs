#!/usr/bin/env node

import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';
import prettier from 'prettier';
import * as alpinePlugin from './index.mjs';

const __dirname = path.dirname(fileURLToPath(import.meta.url));

// Check if a file path is provided
if (process.argv.length < 3) {
  console.error('Please provide a file path to format');
  console.error('Usage: node debug.js <file-path>');
  process.exit(1);
}

// Get the file path
const filePath = process.argv[2];
const resolvedPath = path.resolve(process.cwd(), filePath);

// Read the file content
let content;
try {
  content = fs.readFileSync(resolvedPath, 'utf8');
} catch (error) {
  console.error(`Error reading file: ${error.message}`);
  process.exit(1);
}

// Format the content
try {
  const formatted = await prettier.format(content, {
    parser: 'html',
    plugins: [alpinePlugin],
    filepath: resolvedPath,
    // Add any additional options here
    singleQuote: true,
    tabWidth: 2,
    useTabs: false,
    printWidth: 80,
  });

  console.log('--- Formatted Output ---');
  console.log(formatted);

  // Save to a new file if requested
  if (process.argv.includes('--save')) {
    const outputPath = path.join(
      path.dirname(resolvedPath),
      `${path.basename(resolvedPath, path.extname(resolvedPath))}-formatted${path.extname(resolvedPath)}`
    );
    fs.writeFileSync(outputPath, formatted);
    console.log(`Saved formatted output to: ${outputPath}`);
  }
} catch (error) {
  console.error('Error formatting file:');
  console.error(error);
  process.exit(1);
}
