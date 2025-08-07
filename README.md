# Alpine.js formatting support in HTML

This Prettier plugin adds support for formatting Alpine.js code in HTML files.

Alpine.js directives use modified JavaScript formatting to improve readability and maintainability.

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
