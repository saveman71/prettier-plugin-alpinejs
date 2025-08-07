import { compareFiles } from '../../common.js';
import { describe, expect, it } from 'vitest';

describe('Alpine.js click events', () => {
  it('should format click event handlers with proper indentation and spacing', async () => {
    const { expected, actual } = await compareFiles(import.meta.url);
    expect(actual).toBe(expected);
  });
});
