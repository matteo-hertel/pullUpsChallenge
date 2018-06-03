const {
  taskCacheModel,
  makeTaskCache,
  makeAppCache,
  appCacheModel,
  POSSIBLE_STATUS
} = require("./../models/cache");

function reduceStatusesFromTask(task) {
  return function reduceStatuses(acc, status) {
    if (task[status]) {
      acc[status] += task.amount;
    }
    return acc;
  };
}
function processCacheUpdate(cache, task) {
  const cacheUpdate = POSSIBLE_STATUS.reduce(
    reduceStatusesFromTask(task),
    cache
  );
  const newCache = makeAppCache(cacheUpdate);
  newCache.weeks = getWeekCacheUpdate(cache.weeks, task);
  return newCache;
}

function getWeekCacheUpdate(weekCache, task) {
  if (!weekCache.hasOwnProperty(task.weekNumber)) {
    weekCache[task.weekNumber] = makeTaskCache();
  }
  const taskUpdate = POSSIBLE_STATUS.reduce(
    reduceStatusesFromTask(task),
    weekCache[task.weekNumber]
  );

  weekCache[task.weekNumber] = makeTaskCache(
    taskUpdate,
    weekCache[task.weekNumber]
  );
  return weekCache;
}
module.exports = { processCacheUpdate };
