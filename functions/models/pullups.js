const { omit, differenceWith, merge } = require("lodash");

const pullupModel = {
  amount: 0,
  todoistID: "",
  completed: false,
  rejected: false,
  date: new Date().toString()
};

function makePullup(extensionObject, baseModel = pullupModel) {
  const cleanObject = omit(
    extensionObject,
    differenceWith(Object.keys(extensionObject), Object.keys(baseModel))
  );
  return merge({}, baseModel, cleanObject);
}

module.exports = {
  pullupModel,
  makePullup
};
