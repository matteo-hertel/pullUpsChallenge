const admin = require("firebase-admin");
admin.initializeApp();

const { processCacheUpdate } = require("./libs/cache");
const ENV = "development";
const getCache = () => {
  return admin
    .firestore()
    .collection(`pullupTracking`)
    .doc(ENV)
    .collection("cache")
    .doc("appCache")
    .get();
};
const pushToDb = model => {
  return admin
    .firestore()
    .collection(`pullupTracking`)
    .doc(ENV)
    .collection("cache")
    .doc("appCache")
    .set(model);
};
const promiseSerial = funcs =>
  funcs.reduce(
    (promise, func) =>
      promise.then(result => func().then(Array.prototype.concat.bind(result))),
    Promise.resolve([])
  );
const sleep = data =>
  new Promise(resolve => {
    setTimeout(() => {
      resolve(data);
    }, 1000);
  });
function main() {
  const pullups = admin
    .firestore()
    .collection(`pullupTracking`)
    .doc(ENV)
    .collection("pullups")
    .get();

  return (
    pullups
      .then(snap => {
        const docs = [];
        snap.forEach(doc => {
          docs.push(doc);
        });

        return docs;
      })
      // .then(docs => {
      //   //return promiseSerial(
      //   return docs.map(change => {
      //     const cacheTask = change.ref.set({ cached: false }, { merge: true });
      //     return;
      //     const data = change.data();
      //     if (data.cached) return () => Promise.resolve();
      //     return () =>
      //       getCache()
      //         .then(cache => {
      //           const newCache = processCacheUpdate(cache.data(), data);
      //           console.log(newCache);
      //           return pushToDb(newCache);
      //         })
      //         .then(sleep);
      //   });
      //);
      //})
      .then(console.log)
  );
}

module.exports = main;
