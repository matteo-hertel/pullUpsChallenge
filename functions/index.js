const admin = require('firebase-admin');

admin.initializeApp();
const settings = { timestampsInSnapshots: true };
admin.firestore().settings(settings);

const { addSet, addSetPeek } = require('./handlers/addSet');
const bustCache = require('./handlers/bustCache');
const cacheAll = require('./handlers/cacheAll.js');
const cacheData = require('./handlers/cacheData');
const createTodoist = require('./handlers/createTodoist');
const todoistWebhook = require('./handlers/todoistWebhook');

exports.addSet = addSet(admin);
exports.addSetPeek = addSetPeek();
exports.bustCache = bustCache(admin);
exports.cacheAll = cacheAll(admin);
exports.cacheData = cacheData(admin);
exports.createTodoist = createTodoist(admin);
exports.todoistWebhook = todoistWebhook(admin);
