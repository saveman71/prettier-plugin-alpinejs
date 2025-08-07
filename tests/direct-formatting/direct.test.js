import { formatCode } from '../common.js';
import { describe, expect, it } from 'vitest';

describe('Alpine.js direct code formatting', () => {
  it('should format simple Alpine.js expressions', async () => {
    const unformatted =
      '<div x-data="{ count: 0 }"><button @click="count++">Increment</button><span x-text="count"></span></div>';
    const expected =
      '<div x-data="{ count: 0 }">\n  <button @click="count++">Increment</button><span x-text="count"></span>\n</div>\n';

    const result = await formatCode(unformatted);
    expect(result).toBe(expected);
  });

  it('should format complex Alpine.js expressions', async () => {
    const unformatted =
      '<div x-data="{ users: [{name: \'John\', age: 25}, {name: \'Jane\', age: 30}] }"><template x-for="user in users"><div><span x-text="user.name"></span>: <span x-text="user.age"></span></div></template></div>';
    const expected =
      '<div\n  x-data="{\n    users: [\n      { name: \'John\', age: 25 },\n      { name: \'Jane\', age: 30 }\n    ]\n  }"\n>\n  <template x-for="user in users"\n    ><div><span x-text="user.name"></span>: <span x-text="user.age"></span></div\n  ></template>\n</div>\n';

    const result = await formatCode(unformatted);
    expect(result).toBe(expected);
  });

  it('should preserve Alpine.js template syntax', async () => {
    const unformatted =
      '<div x-data="{ show: false }"><button @click="show = !show">Toggle</button><div x-show="show">Content</div></div>';
    const expected =
      '<div x-data="{ show: false }">\n  <button @click="show = !show">Toggle</button>\n  <div x-show="show">Content</div>\n</div>\n';

    const result = await formatCode(unformatted);
    expect(result).toBe(expected);
  });

  it('should format with custom options', async () => {
    const unformatted =
      '<div x-data="{ message: \'Hello\' }"><span x-text="message"></span></div>';
    const expected =
      '<div x-data="{ message: \'Hello\' }"><span x-text="message"></span></div>\n';

    const result = await formatCode(unformatted, {
      tabWidth: 4,
    });
    expect(result).toBe(expected);
  });
});
