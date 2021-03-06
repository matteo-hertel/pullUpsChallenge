const functions = require('firebase-functions');

const config = require('./../config');
const { processCacheUpdate } = require('./../libs/cache');

function cacheData(admin) {
  const getCache = () =>
    admin
      .firestore()
      .collection(`pullupTracking`)
      .doc(config.env)
      .collection('cache')
      .doc('appCache')
      .get();
  const emptyPromise = Promise.resolve(null);
  return functions.firestore
    .document(`pullupTracking/${config.env}/pullups/{uuid}`)
    .onUpdate(change => {
      const previousData = change.before.data();
      const data = change.after.data();

      if (!previousData.todoistID) return emptyPromise;
      if (previousData.cached || data.cached) return emptyPromise;

      change.after.ref.set({ cached: true }, { merge: true });

      return getCache()
        .then(cache => {
          const newCache = processCacheUpdate(cache.data(), data);
          return cache.ref.set(newCache, { merge: true });
        })
        .catch(console.error);
    });
}
module.exports = cacheData;
