const { createSet } = require("./pullups.js");

describe("Pullups functions", () => {
  test("createSet", () => {
    const set = createSet(20, 8, 4);
    expect(set.length).toBeDefined();
    expect(set.length).toBeGreaterThan(0);
  });
});
