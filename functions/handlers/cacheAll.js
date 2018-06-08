const functions = require("firebase-functions");
const { processCacheUpdate } = require("./../libs/cache");

const config = require("./../config");

function cacheAll(admin) {
  const baseCollection = admin
    .firestore()
    .collection(`pullupTracking`)
    .doc(config.env);
  const cacheCollection = baseCollection.collection("cache").doc("appCache");
  const getCacheRef = () => cacheCollection.get();

  const getUncachedTasksRef = () =>
    baseCollection
      .collection("pullups")
      .where("cached", "==", false)
      .get()
      .then(getCollectionDocs);

  const mergeWithDb = model => cacheCollection.set(model, { merge: true });

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

  function getCacheData() {
    return getCacheRef().then(cache => cache.data());
  }

  function cacheTask(ref) {
    ref.ref.set({ cached: true }, { merge: true });
  }

  function reduceTasksToCache([cache, tasks]) {
    const newCache = tasks.reduce((cache, task) => {
      cacheTask(task);
      return processCacheUpdate(cache, task.data());
    }, cache);
    return newCache;
  }
  function handle(req, res) {
    return Promise.all([getCacheData(), getUncachedTasksRef()])
      .then(reduceTasksToCache)
      .then(mergeWithDb)
      .then(doc => {
        return res.status(200).send();
      })
      .catch(exc => {
        console.error("Unnecessary Call to Cache All", exc);
        return res.status(200).send();
      });
  }
  return functions.https.onRequest(handle);
}

module.exports = cacheAll;
