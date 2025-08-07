# Alpine.js formatting support in HTML

This Prettier plugin adds support for formatting Alpine.js code in HTML files.

Alpine.js directives and expressions are formatted using a modified JavaScript formatting approach to improve readability and maintainability. The plugin handles all Alpine.js directives including `x-data`, `x-bind`, `x-on`, `x-text`, and more.

## Features

- Formats Alpine.js directives and expressions with proper indentation
- Preserves spaces vs tabs based on your Prettier configuration
- Formats complex JavaScript expressions inside Alpine.js attributes
- Handles multi-line expressions with proper indentation
- Maintains proper spacing in object and array literals
- Properly formats event handlers and complex conditionals

## Installation

Install [prettier](https://prettier.io/) and this plugin:

```bash
npm i -D prettier-plugin-alpinejs
```

## Usage

Add the plugin to your `.prettierrc` file:

```json
{
  "plugins": ["prettier-plugin-alpinejs"]
}
```

Or use it directly:

```bash
prettier --write --plugin=prettier-plugin-alpinejs "**/*.html"
```

### Configuration

This plugin respects your Prettier configuration settings such as:

- `tabWidth` - Number of spaces per indentation level
- `useTabs` - Indent with tabs instead of spaces
- `printWidth` - Maximum line length before wrapping
- `singleQuote` - Use single quotes instead of double quotes

For example:

```json
{
  "plugins": ["prettier-plugin-alpinejs"],
  "tabWidth": 2,
  "useTabs": false,
  "printWidth": 80,
  "singleQuote": true
}
```

## Development

### Testing

This plugin uses Vitest for testing. The test suite verifies that Alpine.js expressions and directives are formatted correctly.

To run the tests:

```bash
# Install dependencies
npm install

# Run tests
npm test

# Run tests with coverage report
npm run test:coverage

# Run tests in watch mode
npm run test:watch
```

### Debugging

If you encounter formatting issues, you can use the debug script to troubleshoot:

```bash
# Make the script executable (if needed)
chmod +x ./debug.js

# Run the debug script on a specific file
node ./debug.js path/to/your/file.html

# Save the formatted output to a new file
node ./debug.js path/to/your/file.html --save
```

This will output the formatted HTML so you can see exactly how the plugin is processing your Alpine.js code.

## Development

### Testing

This plugin uses Vitest for testing. The test suite verifies that Alpine.js expressions and directives are formatted correctly.

To run the tests:

```bash
# Install dependencies
npm install

# Run tests
npm test

# Run tests with coverage report
npm run test:coverage

# Run tests in watch mode
npm run test:watch
```

### Test Structure

The tests are organized into categories:

- **Directives**: Tests for formatting Alpine.js directives like `x-data`, `x-show`, etc.
- **Expressions**: Tests for formatting Alpine.js expressions and bindings
- **Events**: Tests for formatting Alpine.js event handlers
- **Direct Formatting**: Tests that verify code formatting directly without comparing files

Each test category contains:
- `unformatted.html` - The input HTML with unformatted Alpine.js code
- `formatted.html` - The expected output after formatting
- `*.test.js` - The test file that compares the formatting results

### Adding Tests

To add a new test:

1. Create a new directory in the appropriate category under `tests/`
2. Create `unformatted.html`, `formatted.html`, and a test file
3. Run the tests to verify the formatting works as expected

## How It Works

This plugin extends Prettier's HTML parser and adds Alpine.js-specific formatting:

1. When processing HTML attributes, it identifies Alpine.js directives using regular expressions
2. For each Alpine.js attribute, it extracts the value and formats it using a specialized formatter
3. The formatter transforms the JavaScript expressions with proper indentation and spacing
4. The formatted expressions are then reinserted into the HTML

For Alpine.js expressions, the plugin:
- Formats objects and arrays with proper indentation
- Ensures proper spacing in function calls and expressions
- Removes unnecessary semicolons and commas
- Preserves string literals and template strings
- Respects your Prettier configuration (tabs vs. spaces, etc.)

## Contributing

Contributions are welcome! See [CONTRIBUTING.md](CONTRIBUTING.md) for more details.

## License

MIT
