const dayjs = require("dayjs");

function toUnix(date) {
  return dayjs(date).valueOf();
}
function getDifferenceInWeeksToToday(date) {
  return dayjs().diff(dayjs(date), "weeks");
}
module.exports = { toUnix, getDifferenceInWeeksToToday };
