const functions = require('firebase-functions');

const {
  base_amount,
  end_hour,
  env,
  lower_treshold,
  start_date,
  start_hour,
  todoist: { token },
  todoist_project,
  upper_treshold,
} = functions.config().pulluptracking;

const int = i => parseInt(i, 10);

module.exports = {
  endHour: int(end_hour),
  env,
  lowerTreshold: lower_treshold,
  todoistAPIKey: token,
  todoistProject: todoist_project,
  totalAmount: base_amount,
  upperTreshold: upper_treshold,
  startHour: int(start_hour),
};
