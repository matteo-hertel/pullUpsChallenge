jest.mock('./../config', () => ({}));

const {
  generateRandomInteger,
  generateDeadline,
  getProjectId,
  padTime,
} = require('./todoist.js').__test__;

describe('Todoist helper functions', () => {
  test('generateRandomInteger', () => {
    const min = 8;
    const max = 16;
    expect(generateRandomInteger(min, max)).toBeDefined();
    expect(generateRandomInteger(min, max)).toBeGreaterThan(0);
    expect(generateRandomInteger(min, max)).toBeGreaterThanOrEqual(min);
    expect(generateRandomInteger(min, max)).toBeLessThanOrEqual(max);
  });
  test('generateDeadline', () => {
    expect(generateDeadline()).toBeDefined();
    expect(generateDeadline()).toEqual(expect.stringContaining('Today'));
    expect(generateDeadline()).toEqual(expect.stringContaining('at'));
    expect(generateDeadline()).toEqual(expect.stringContaining('pm'));
  });
  test('getProjectId', () => {
    const projects = [
      { id: 1, name: 'X' },
      { id: 2, name: 'Y' },
      { id: 3, name: 'Z' },
    ];
    expect(getProjectId('X')(projects)).toEqual(1);
    expect(getProjectId('Y')(projects)).toEqual(2);
    expect(getProjectId('Z')(projects)).toEqual(3);
  });
  test('padTime', () => {
    expect(padTime(10)).toEqual('10');
    expect(padTime(11)).toEqual('11');
    expect(padTime(8)).toEqual('08');
    expect(padTime(4)).toEqual('04');
  });
});
