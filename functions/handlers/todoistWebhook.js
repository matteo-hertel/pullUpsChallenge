const functions = require('firebase-functions');

const { unary } = require('lodash');
const config = require('./../config');
const { createSet } = require('./../libs/pullups');
const { makePullup } = require('./../models/pullups');

function todoistWebhook(admin) {
  const getTask = id => {
    const pullupsRef = admin
      .firestore()
      .collection(`pullupTracking`)
      .doc(config.env)
      .collection('pullups');
    return pullupsRef.where('todoistID', '==', id);
  };
  function handle(req, res) {
    const {
      event_name,
      event_data: { id },
    } = req.body;

    return getTask(id)
      .get()
      .then(getCollectionDocs)
      .then(getFirst)
      .then(doc => {
        return doc.ref.set(setAppropriateKey(event_name), { merge: true });
      })
      .then(doc => {
        return res.status(200).send();
      })
      .catch(exc => {
        console.error(exc, { event_name, id });
        //return 200 for the webhooks
        return res.status(200).send();
      });
  }
  return functions.https.onRequest(handle);
}

function getFirst(arr) {
  return arr[0];
}
function getCollectionDocs(snapshot) {
  if (!snapshot.size) {
    throw new Error('Document does not exists');
  }
  const documents = [];
  snapshot.forEach(doc => {
    documents.push(doc);
  });
  return documents;
}
function setAppropriateKey(action) {
  if (action === 'item:completed') {
    return {
      completed: true,
    };
  }
  if (action === 'item:deleted') {
    return {
      rejected: true,
    };
  }
  return {
    invalidKey: action,
  };
}
module.exports = todoistWebhook;
