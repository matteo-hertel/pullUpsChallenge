const MockDate = require("mockdate");
const fixeDate = 1520208000000;

MockDate.set(fixeDate);

const { pullupModel, makePullup } = require("./pullups.js");

const getDiffentKeys = keys => {
  return function(key) {
    return keys.indexOf(key) === -1 ? true : false;
  };
};
describe("Pullups model", () => {
  it("should not contain extraneous keys", () => {
    const unsanitisedObject = {
      amount: 50,
      foo: "bar",
      bar: "foo"
    };

    const set = makePullup(unsanitisedObject);

    expect(
      Object.keys(set).filter(getDiffentKeys(Object.keys(pullupModel)))
    ).toHaveLength(0);
  });

  it("should be able to update as many time as neded", () => {
    const finalForm = {
      amount: 50,
      completed: true,
      todoistID: "todoistID"
    };

    const set = makePullup({});
    const update1 = makePullup({ amount: finalForm.amount }, set);
    const update2 = makePullup({ completed: finalForm.completed }, update1);

    const finalUpdate = makePullup({ todoistID: finalForm.todoistID }, update2);
    Object.keys(finalForm).map(k =>
      expect(finalUpdate[k]).toEqual(finalForm[k])
    );
  });
  it("should be able to make an set without extension object", () => {
    expect(makePullup()).toEqual(pullupModel);
  });
  it("should match snapshot", () => {
    expect(pullupModel).toMatchSnapshot();
  });
});
