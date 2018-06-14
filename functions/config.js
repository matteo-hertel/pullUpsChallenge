const functions = require("firebase-functions");
const { getDifferenceInWeeksToToday } = require("./libs/date");

const {
  base_amount,
  end_hour,
  env,
  lower_treshold,
  start_date,
  start_hour,
  todoist: { token },
  todoist_project,
  upper_treshold
} = functions.config().pulluptracking;

const TRESHOLD_INCREASE = 0.5;
const TOTAL_INCREASE = 2;
const weekDifference = getDifferenceInWeeksToToday(start_date);
const passedWeeks = weekDifference > 0 ? weekDifference : 0;
const int = i => parseInt(i, 10);

module.exports = {
  endHour: int(end_hour),
  env,
  lowerTreshold:
    int(lower_treshold) + Math.floor(TRESHOLD_INCREASE * passedWeeks),
  passedWeeks,
  todoistAPIKey: token,
  todoistProject: todoist_project,
  totalAmount: int(base_amount) + TOTAL_INCREASE * (passedWeeks || 1),
  upperTreshold:
    int(upper_treshold) + Math.floor(TRESHOLD_INCREASE * passedWeeks),
  startHour: int(start_hour)
};
