const functions = require('firebase-functions');

const config = require('./../config');
const { createPullupsTask } = require('./../libs/todoist');

function createTodoist() {
  return functions.firestore
    .document(`pullupTracking/${config.env}/pullups/{uuid}`)
    .onCreate(snap => {
      const data = snap.data();

      return createPullupsTask(data.amount).then(taskId =>
        snap.ref.set(
          {
            todoistID: taskId,
          },
          { merge: true }
        )
      );
    });
}
module.exports = createTodoist;
