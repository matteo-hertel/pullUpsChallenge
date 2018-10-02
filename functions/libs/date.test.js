const {
  getDataWithFormat,
  getDifferenceInWeeksToToday,
  toUnix,
  getWeekNumer,
} = require('./date');

const MockDate = require('mockdate');
const fixeDate = 1520208000000;
beforeAll(() => {
  MockDate.set(fixeDate);
});

describe('Date functions', () => {
  test('getDataWithFormat', () => {
    expect(getDataWithFormat('YYYY-MM-DD')).toBe('2018-03-05');
    expect(getDataWithFormat('YYYY-MM-DD', '2018-10-19')).toBe('2018-10-19');
  });
  test('getDifferenceInWeeksToToday', () => {
    expect(getDifferenceInWeeksToToday('2018-03-12')).toBe(-1);
    expect(getDifferenceInWeeksToToday('2018-03-22')).toBe(-2);
    expect(getDifferenceInWeeksToToday('2018-05-24')).toBe(-11);
    expect(getDifferenceInWeeksToToday('2018-02-24')).toBe(1);
    expect(getDifferenceInWeeksToToday(new Date())).toBe(0);
  });

  test('toUnix', () => {
    expect(fixeDate).toBe(toUnix(new Date()));
  });
  test('toUnix', () => {
    expect(fixeDate).toBe(toUnix(new Date()));
  });
});
