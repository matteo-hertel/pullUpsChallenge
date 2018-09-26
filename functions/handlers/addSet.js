const uuidv4 = require("uuid/v4");
const functions = require("firebase-functions");

const { unary } = require("lodash");
const config = require("./../config");
const { createSet } = require("./../libs/pullups");
const { makePullup } = require("./../models/pullups");
const { upperTreshold, lowerTreshold, totalAmount } = config;

const extractAmount = amount => {
  return { amount };
};

const resolveEmptyOnCondition = (cond, emptyValue) => fn => {
  return cond ? emptyValue : fn();
};

function addSetPeek() {
  return functions.https.onRequest(handle);

  function handle(req, res) {
    const sets = makeSet();

    return Promise.resolve()
      .then(snapshots => {
        return res.status(200).send(sets);
      })
      .catch(() => {
        return res.status(500).send();
      });
  }
}
function addSet(admin) {
  const pushToDb = model => {
    return admin
      .firestore()
      .collection(`pullupTracking`)
      .doc(config.env)
      .collection("pullups")
      .doc(uuidv4())
      .set(model);
  };
  const storeSet = () =>
    createSet(totalAmount, upperTreshold, lowerTreshold)
      .map(extractAmount)
      .map(unary(makePullup))
      .map(pushToDb);

  function handle(req, res) {
    const noWorkoutOnSunday = resolveEmptyOnCondition(!new Date().getDay(), []);

    const sets = noWorkoutOnSunday(storeSet);

    return Promise.all([])
      .then(snapshots => {
        return res.status(200).send();
      })
      .catch(() => {
        return res.status(500).send();
      });
  }
  return functions.https.onRequest(handle);
}
module.exports = addSet;
