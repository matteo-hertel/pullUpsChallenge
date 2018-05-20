const dayjs = require("dayjs");

function getDifferenceInWeeksToToday(date) {
  return dayjs().diff(dayjs(date), "weeks");
}
module.exports = { getDifferenceInWeeksToToday };
