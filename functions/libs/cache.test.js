const { processCacheUpdate } = require("./cache");

describe("Cache functions", () => {
  it("should process cache properly", () => {
    const cache = {
      completed: 0,
      rejected: 0,
      weeks: {
        0: {
          completed: 0,
          rejected: 0
        },
        1: {
          completed: 0,
          rejected: 0
        }
      }
    };
    const task1 = {
      amount: 10,
      completed: true,
      rejected: false,
      weekNumber: 1
    };
    const task2 = {
      amount: 10,
      completed: false,
      rejected: true,
      weekNumber: 1
    };
    const task3 = {
      amount: 10,
      completed: true,
      rejected: false,
      weekNumber: 2
    };
    const task4 = {
      amount: 10,
      completed: false,
      rejected: true,
      weekNumber: 2
    };
    const task5 = {
      amount: 100,
      completed: true,
      weekNumber: 8
    };
    const task6 = {
      amount: 100,
      rejected: true,
      weekNumber: 8
    };
    expect(
      processCacheUpdate(
        processCacheUpdate(
          processCacheUpdate(
            processCacheUpdate(
              processCacheUpdate(processCacheUpdate(cache, task6), task5),
              task1
            ),
            task2
          ),
          task3
        ),
        task4
      )
    ).toMatchSnapshot();
  });
});
