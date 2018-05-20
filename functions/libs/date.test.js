const { getDifferenceInWeeksToToday } = require("./date");
const dayjs = require("dayjs");
const MockDate = require("mockdate");

beforeAll(() => {
  MockDate.set(1520208000000);
});

describe("Date functions", () => {
  test("getDifferenceInWeeksToToday", () => {
    expect(getDifferenceInWeeksToToday("2018-03-12")).toBe(-1);
    expect(getDifferenceInWeeksToToday("2018-03-22")).toBe(-2);
    expect(getDifferenceInWeeksToToday("2018-05-24")).toBe(-11);
    expect(getDifferenceInWeeksToToday("2018-02-24")).toBe(1);
    expect(getDifferenceInWeeksToToday(new Date())).toBe(0);
  });
});
