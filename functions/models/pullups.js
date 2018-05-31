const { omit, differenceWith, merge } = require("lodash");
const { getWeekNumer } = require("./../libs/date");

const pullupModel = {
  amount: 0,
  cached: false,
  completed: false,
  date: Date.now(),
  rejected: false,
  todoistID: "",
  weekNumber: getWeekNumer(new Date()),
  year: new Date().getFullYear()
};

function makePullup(extensionObject, baseModel = pullupModel) {
  const cleanObject = omit(
    extensionObject,
    differenceWith(Object.keys(extensionObject), Object.keys(pullupModel))
  );
  return merge({}, baseModel, cleanObject);
}

module.exports = {
  pullupModel,
  makePullup
};
