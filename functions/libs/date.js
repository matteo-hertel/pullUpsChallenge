const moment = require("moment");

function getDataWithFormat(format, date = false) {
  return moment(date ? date : new Date()).format(format);
}

function getDifferenceInWeeksToToday(date) {
  return moment().diff(moment(date), "weeks");
}

function getWeekNumer(date) {
  return moment(date).isoWeek();
}

function toUnix(date) {
  return moment(date).valueOf();
}
module.exports = {
  getDataWithFormat,
  getDifferenceInWeeksToToday,
  getWeekNumer,
  toUnix
};
