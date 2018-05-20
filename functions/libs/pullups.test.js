const { createSet } = require("./pullups.js");

describe("Pullups functions", () => {
  test("createSet", () => {
    const set1 = createSet();
    expect(set1.length).toBeDefined();
    expect(set1.length).toBeGreaterThan(0);
  });
});
