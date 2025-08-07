import { defineConfig } from 'vitest/config';
import { fileURLToPath } from 'url';
import { dirname, resolve } from 'path';

const __dirname = dirname(fileURLToPath(import.meta.url));

export default defineConfig({
  resolve: {
    alias: {
      '@': resolve(__dirname, './'),
      tests: resolve(__dirname, './tests'),
    },
  },
  test: {
    globals: true,
    environment: 'node',
    include: ['./tests/**/*.test.js'],
    coverage: {
      reporter: ['text', 'html'],
      include: ['index.mjs', 'alpine.mjs'],
      exclude: ['node_modules/**', 'tests/**'],
      provider: 'v8',
      all: true,
    },
  },
});
