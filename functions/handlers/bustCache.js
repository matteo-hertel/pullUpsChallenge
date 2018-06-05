const functions = require("firebase-functions");

const config = require("./../config");

function bustCache(admin) {
  const getTasks = () => {
    return admin
      .firestore()
      .collection(`pullupTracking`)
      .doc(config.env)
      .collection("pullups");
  };
  const deleteCacheDocument = () => {
    return admin
      .firestore()
      .collection(`pullupTracking`)
      .doc(config.env)
      .collection("cache")
      .doc("appCache")
      .delete();
  };
  function handle(req, res) {
    return getTasks()
      .get()
      .then(getCollectionDocs)
      .then(docs => {
        return docs.map(doc => doc.ref.set({ cached: false }, { merge: true }));
      })
      .then(() => {
        return deleteCacheDocument();
      })
      .then(doc => {
        return res.status(200).send();
      })
      .catch(exc => {
        console.error(exc);
        return res.status(500).send();
      });
  }
  return functions.https.onRequest(handle);
}

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

module.exports = bustCache;
