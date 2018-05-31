const { getDifferenceInWeeksToToday, toUnix, getWeekNumer } = require("./date");

const MockDate = require("mockdate");
const fixeDate = 1520208000000;
beforeAll(() => {
  MockDate.set(fixeDate);
});

describe("Date functions", () => {
  test("getDifferenceInWeeksToToday", () => {
    expect(getDifferenceInWeeksToToday("2018-03-12")).toBe(-1);
    expect(getDifferenceInWeeksToToday("2018-03-22")).toBe(-2);
    expect(getDifferenceInWeeksToToday("2018-05-24")).toBe(-11);
    expect(getDifferenceInWeeksToToday("2018-02-24")).toBe(1);
    expect(getDifferenceInWeeksToToday(new Date())).toBe(0);
  });
  test("getWeekNumer", () => {
    expect(getWeekNumer(new Date())).toBe(10);
  });
  test("toUnix", () => {
    expect(fixeDate).toBe(toUnix(new Date()));
  });
});
