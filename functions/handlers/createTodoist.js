const functions = require("firebase-functions");

const { unary } = require("lodash");
const config = require("./../config");
const { createPullupsTask } = require("./../libs/todoist");

function createTodoist(admin) {
  return functions.firestore
    .document(`pullupTracking/${config.env}/pullups/{uuid}`)
    .onCreate((snap, context) => {
      const data = snap.data();

      return createPullupsTask(data.amount).then(task => {
        const taskId = task.data.id;
        return snap.ref.set(
          {
            todoistID: taskId
          },
          { merge: true }
        );
      });
    });
}
module.exports = createTodoist;
