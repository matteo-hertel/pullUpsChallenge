const uuidv4 = require("uuid/v4");
const functions = require("firebase-functions");
const admin = require("firebase-admin");
admin.initializeApp();

const { unary } = require("lodash");
const config = require("./../config");
const { createSet } = require("./../libs/pullups");
const { makePullup } = require("./../models/pullups");

const makeAmount = amount => {
  return { amount };
};

const pushToDb = model => {
  return admin
    .firestore()
    .collection(`pullupTracking`)
    .doc(process.env.NODE_ENV)
    .collection("pullups")
    .doc(uuidv4())
    .set(model);
};

function handle(req, res) {
  return Promise.all(
    createSet()
      .map(makeAmount)
      .map(unary(makePullup))
      .map(pushToDb)
  )
    .then(snapshots => {
      return res.status(200).send();
    })
    .catch(() => {
      return res.status(500).send();
    });
}
module.exports = functions.https.onRequest(handle);
