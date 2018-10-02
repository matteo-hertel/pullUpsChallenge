const config = require('./../config');
const TodoistAPI = require('todoist-js').default;
const { todoistAPIKey, todoistProject, startHour, endHour } = config;
const todoist = new TodoistAPI(todoistAPIKey);
const getTodoistProjectId = getProjectId(todoistProject);

function createPullupsTask(amount) {
  return todoist
    .sync()
    .then(api => {
      const { projects } = api;
      return getTodoistProjectId(projects);
    })
    .then(addTask(`Do ${amount} pullups`))
    .then(addReminder)
    .then(commit);
}

function generateRandomInteger(min, max) {
  return Math.floor(min + Math.random() * (max + 1 - min));
}
function commit(task) {
  const taskTempId = task.data.temp_id;
  const commit = todoist.commit();
  return commit.then(commitData => {
    return commitData.temp_id_mapping[taskTempId];
  });
}
function addTask(name) {
  return function addNewTask(projectId) {
    return todoist.items.add(name, projectId, {
      date_string: 'Today',
    });
  };
}
function addReminder(task) {
  todoist.reminders.add(task.data.id, {
    date_string: generateDeadline(),
    service: 'push',
  });
  return task;
}
function generateDeadline() {
  return `Today at ${generateRandomInteger(startHour, endHour)}:${padTime(
    generateRandomInteger(0, 59),
  )} pm`;
}
function padTime(time) {
  if (time < 10) {
    return `0${time}`;
  }
  return `${time}`;
}
function getProjectId(name) {
  return function getProjectByName(projects) {
    const [{ id }] = projects.filter(project => project.name === name);
    return id;
  };
}
module.exports = {
  createPullupsTask,
  __test__: {
    generateRandomInteger,
    generateDeadline,
    getProjectId,
    padTime,
  },
};
