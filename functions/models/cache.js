const { omit, differenceWith, merge } = require("lodash");

const POSSIBLE_STATUS = ["completed", "rejected"];

const taskCacheModel = {
  completed: 0,
  rejected: 0
};

const appCacheModel = merge({}, taskCacheModel, {
  weeks: {}
});

function makeCache(base) {
  return function extendBaseModel(extensionObject = {}, baseModel = base) {
    const cleanObject = omit(
      extensionObject,
      differenceWith(Object.keys(extensionObject), Object.keys(taskCacheModel))
    );
    return merge({}, baseModel, cleanObject);
  };
}
const makeTaskCache = makeCache(taskCacheModel);
const makeAppCache = makeCache(appCacheModel);

module.exports = {
  appCacheModel,
  makeAppCache,
  taskCacheModel,
  makeTaskCache,
  POSSIBLE_STATUS
};
