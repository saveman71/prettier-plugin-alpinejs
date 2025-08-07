# Changelog

All notable changes to this project will be documented in this file.

The format is based on [Keep a Changelog](https://keepachangelog.com/en/1.0.0/),
and this project adheres to [Semantic Versioning](https://semver.org/spec/v2.0.0.html).

## [Unreleased]

### Added
- Added comprehensive test suite using Vitest
- Added test cases for directives, expressions, and events
- Added ESLint configuration
- Added CONTRIBUTING.md with development guidelines
- Added debug.js script for troubleshooting formatting issues

### Changed
- Removed Django-specific functionality
- Updated package name from prettier-plugin-django-alpine to prettier-plugin-alpinejs
- Updated documentation to reflect Alpine.js focus

### Fixed
- Fixed indentation in Alpine.js expressions to use spaces instead of tabs
- Fixed indentation to respect user's tabWidth configuration
- Fixed handling of trailing semicolons and commas in Alpine.js expressions
- Fixed handling of multiple statements in Alpine.js expressions
- Fixed string literal handling to prevent unwanted modifications
- Improved attribute value formatting for Alpine.js directives

## [1.x.x] - Earlier

This project is based on [prettier-plugin-django-alpine](https://github.com/sezze/prettier-plugin-django-alpine).
