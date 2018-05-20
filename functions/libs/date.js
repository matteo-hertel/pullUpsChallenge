const dayjs = require("dayjs");

function getDifferenceInWeeksToToday(date) {
  return dayjs(date).diff(dayjs(), "weeks");
}
module.exports = { getDifferenceInWeeksToToday };
