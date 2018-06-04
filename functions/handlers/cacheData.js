const functions = require("firebase-functions");

const config = require("./../config");
const { processCacheUpdate } = require("./../libs/cache");

function cacheData(admin) {
  const getCache = () => {
    return admin
      .firestore()
      .collection(`pullupTracking`)
      .doc(config.env)
      .collection("cache")
      .doc("appCache")
      .get();
  };
  const pushToDb = model => {
    return admin
      .firestore()
      .collection(`pullupTracking`)
      .doc(config.env)
      .collection("cache")
      .doc("appCache")
      .set(model);
  };
  return functions.firestore
    .document(`pullupTracking/${config.env}/pullups/{uuid}`)
    .onUpdate((change, context) => {
      const data = change.after.data();
      if (data.cached) return;

      const cacheTask = change.after.ref.set({ cached: true }, { merge: true });

      return getCache().then(cache => {
        const newCache = processCacheUpdate(cache.data(), data);
        return pushToDb(newCache);
      });
    });
}
module.exports = cacheData;
