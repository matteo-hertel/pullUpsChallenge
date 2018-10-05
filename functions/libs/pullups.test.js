const { createSet } = require('./pullups.js');

describe('Pullups functions', () => {
  test('createSet', () => {
    const set = createSet(4, 16, 12);
    expect(set.length).toBeDefined();
    expect(set.length).toBeGreaterThan(0);
    set.map(n => expect(typeof n).toBe('number'));
  });
});
