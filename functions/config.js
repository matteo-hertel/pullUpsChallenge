const functions = require("firebase-functions");

const { getDifferenceInWeeksToToday } = require("./libs/date");
const startDate = process.env.START_DATE || "2018-05-20";
const weekDifference = getDifferenceInWeeksToToday(startDate);
const passedWeeks = weekDifference > 0 ? 0 : weekDifference;
const baseAmount = parseInt(process.env.BASE_AMOUNT) || 30;
const upperTreshold = parseInt(process.env.UPPER_TRESHOLD) || 8;
const lowerTreshold = parseInt(process.env.LOWER_TRESHOLD) || 4;

let env, todoistAPIKey;
if (process.env.NODE_ENV === "development") {
  env = process.env.NODE_ENV;
  todoistAPIKey = process.env.TODOIST_TOKEN;
} else {
  env = "production";
  todoistAPIKey = functions.config().pulluptracking.todoist.token;
}

module.exports = {
  env,
  todoistAPIKey,
  todoistProject: "PullUps",
  startHour: 6,
  endHour: 9,
  passedWeeks,
  totalAmount: baseAmount * (passedWeeks || 1),
  upperTreshold: upperTreshold + passedWeeks,
  lowerTreshold: lowerTreshold + passedWeeks
};
