import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';
import prettier from 'prettier';
import * as alpinePlugin from '../index.mjs';

/**
 * Compare two files with each other and return the result for testing.
 *
 * @param {string} metaUrl Pass `import.meta.url`, so the function can relatively resolve the files
 * @param {Object} options Compare options
 * @param {string} [options.source='unformatted.html'] The source file with unformatted code
 * @param {string} [options.target='formatted.html'] The target file with expected formatted code
 * @param {Object} [options.formatOptions={}] Further Prettier format options
 * @returns {Promise<Object>} The result to use in test assertions
 */
export async function compareFiles(
  metaUrl,
  {
    source = 'unformatted.html',
    target = 'formatted.html',
    formatOptions = {},
  } = {}
) {
  const dirname = path.dirname(fileURLToPath(metaUrl));

  const expected = fs.readFileSync(path.resolve(dirname, target), 'utf8');
  const code = fs.readFileSync(path.resolve(dirname, source), 'utf8');
  const actual = await prettier.format(code, {
    parser: 'html',
    plugins: [alpinePlugin],
    ...formatOptions,
  });

  // Generate useful debug information for mismatched formatting
  const result = { expected, code, actual };

  if (expected !== actual) {
    // Create a line-by-line comparison to help with debugging
    result.diff = generateDiff(expected, actual);
  }

  return result;
}

/**
 * Generate a line-by-line diff between expected and actual formatted code
 *
 * @param {string} expected Expected formatted code
 * @param {string} actual Actual formatted code
 * @returns {string} Line-by-line diff
 */
function generateDiff(expected, actual) {
  const expectedLines = expected.split('\n');
  const actualLines = actual.split('\n');
  const maxLines = Math.max(expectedLines.length, actualLines.length);

  let diff = '\n=== FORMATTING DIFF ===\n';

  for (let i = 0; i < maxLines; i++) {
    const expectedLine = expectedLines[i] || '';
    const actualLine = actualLines[i] || '';

    if (expectedLine === actualLine) {
      diff += `  ${i + 1}: ${actualLine}\n`;
    } else {
      diff += `- ${i + 1}: ${JSON.stringify(expectedLine)}\n`;
      diff += `+ ${i + 1}: ${JSON.stringify(actualLine)}\n`;
    }
  }

  return diff;
}

/**
 * Format a string directly without reading from files.
 *
 * @param {string} code The code string to format
 * @param {Object} [formatOptions={}] Further Prettier format options
 * @returns {Promise<string>} The formatted code
 */
export async function formatCode(code, formatOptions = {}) {
  try {
    return prettier.format(code, {
      parser: 'html',
      plugins: [alpinePlugin],
      ...formatOptions,
    });
  } catch (error) {
    console.error('Error formatting code:', error);
    throw error;
  }
}

/**
 * Create test files with example code for testing.
 *
 * @param {string} directory The directory to create files in
 * @param {string} unformatted The unformatted code
 * @param {string} formatted The expected formatted code
 */
export function createTestFiles(directory, unformatted, formatted) {
  fs.mkdirSync(directory, { recursive: true });
  fs.writeFileSync(path.join(directory, 'unformatted.html'), unformatted);
  fs.writeFileSync(path.join(directory, 'formatted.html'), formatted);
}

/**
 * Helper function to update the expected output in a test file with the actual output
 * Useful when fixing the plugin to match expected behavior
 *
 * @param {string} metaUrl Pass `import.meta.url`, so the function can relatively resolve the files
 * @param {string} [target='formatted.html'] The target file to update
 * @param {string} actual The actual formatted output to save
 */
export function updateExpectedOutput(
  metaUrl,
  target = 'formatted.html',
  actual
) {
  const dirname = path.dirname(fileURLToPath(metaUrl));
  fs.writeFileSync(path.resolve(dirname, target), actual);
  console.log(`Updated ${target} with actual output`);
}
