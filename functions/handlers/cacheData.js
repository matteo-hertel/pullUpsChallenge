const uuidv4 = require("uuid/v4");
const functions = require("firebase-functions");

const config = require("./../config");

function cacheData(admin) {
  const pushToDb = model => {
    return admin
      .firestore()
      .collection(`pullupTracking`)
      .doc(config.env)
      .collection("pullups")
      .doc("cache")
      .set(model);
  };
  const getUncachedTasks = () => {
    const pullupsRef = admin
      .firestore()
      .collection(`pullupTracking`)
      .doc(config.env)
      .collection("pullups");
    //Add uncached to all the moddels
    return pullupsRef.where("uncached", "==", true);
  };
  function handle(req, res) {
    const sets = getUncachedTasks()
      .get()
      .then(getCollectionDocs)
      .then(i => console.log(i.data()));
    return Promise.resolve()
      .then(snapshots => {
        return res.status(200).send();
      })
      .catch(() => {
        return res.status(500).send();
      });
  }
  return functions.https.onRequest(handle);
  function getCollectionDocs(snapshot) {
    if (!snapshot.size) {
      throw new Error("Document does not exists");
    }
    const documents = [];
    snapshot.forEach(doc => {
      documents.push(doc);
    });
    return documents;
  }
}
module.exports = cacheData;
