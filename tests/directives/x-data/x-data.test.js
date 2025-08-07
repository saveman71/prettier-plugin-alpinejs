import { compareFiles } from '../../common.js';
import { describe, expect, it } from 'vitest';

describe('Alpine.js x-data directive', () => {
  it('should format x-data object with proper indentation and spacing', async () => {
    const { expected, actual } = await compareFiles(import.meta.url);
    expect(actual).toBe(expected);
  });
});
