const moment = require("moment");

function getDifferenceInWeeksToToday(date) {
  return moment().diff(moment(date), "weeks");
}

function getWeekNumer(date) {
  return moment(date).isoWeek();
}

function toUnix(date) {
  return moment(date).valueOf();
}
module.exports = { getDifferenceInWeeksToToday, getWeekNumer, toUnix };
