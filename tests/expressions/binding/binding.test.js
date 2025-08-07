import { compareFiles } from '../../common.js';
import { describe, expect, it } from 'vitest';

describe('Alpine.js binding expressions', () => {
  it('should format binding expressions with proper indentation and spacing', async () => {
    const { expected, actual } = await compareFiles(import.meta.url);
    expect(actual).toBe(expected);
  });
});
