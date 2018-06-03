const {
  taskCacheModel,
  makeTaskCache,
  makeAppCache,
  appCacheModel
} = require("./cache");

const getDiffentKeys = keys => {
  return function(key) {
    return keys.indexOf(key) === -1 ? true : false;
  };
};
describe("Cache model", () => {
  it("should not contain extraneous keys in taskCacheModel", () => {
    const unsanitisedObject = {
      rejected: 50,
      completed: 50,
      foo: "bar",
      bar: "foo"
    };

    const cache = makeTaskCache(unsanitisedObject);

    expect(
      Object.keys(cache).filter(getDiffentKeys(Object.keys(taskCacheModel)))
    ).toHaveLength(0);
  });

  it("should be able to update as many time as neded", () => {
    const finalForm = {
      completed: 50,
      rejected: 0
    };

    const cache = makeTaskCache({});
    const update1 = makeTaskCache({ rejected: 100 }, cache);
    const update2 = makeTaskCache({ completed: finalForm.completed }, update1);

    const finalUpdate = makeTaskCache({ rejected: 0 }, update2);
    Object.keys(finalForm).map(k =>
      expect(finalUpdate[k]).toEqual(finalForm[k])
    );
  });
  it("should be able to make a cache without extension object", () => {
    expect(makeTaskCache()).toEqual(taskCacheModel);
  });
  it("should match snapshot", () => {
    expect(taskCacheModel).toMatchSnapshot();
  });
  it("should not contain extraneous keys in appCacheModel", () => {
    const unsanitisedObject = {
      rejected: 50,
      completed: 50,
      foo: "bar",
      bar: "foo",
      weeks: {}
    };

    const cache = makeAppCache(unsanitisedObject);

    expect(
      Object.keys(cache).filter(getDiffentKeys(Object.keys(appCacheModel)))
    ).toHaveLength(0);
  });

  it("should be able to update as many time as neded", () => {
    const finalForm = {
      completed: 50,
      rejected: 0,
      weeks: {}
    };

    const cache = makeAppCache({});
    const update1 = makeAppCache({ completed: finalForm.completed }, cache);
    const update2 = makeAppCache({ weeks: {} }, update1);

    const finalUpdate = makeAppCache({ rejected: 0 }, update2);
    Object.keys(finalForm).map(k =>
      expect(finalUpdate[k]).toEqual(finalForm[k])
    );
  });
  it("should be able to make a cache without extension object", () => {
    expect(makeAppCache()).toEqual(appCacheModel);
  });
  it("should match snapshot", () => {
    expect(appCacheModel).toMatchSnapshot();
  });
});
