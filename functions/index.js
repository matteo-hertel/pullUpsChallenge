const functions = require("firebase-functions");
const admin = require("firebase-admin");
admin.initializeApp();

const addSet = require("./handlers/addSet");
const createTodoist = require("./handlers/createTodoist");
const todoistWebhook = require("./handlers/todoistWebhook");
const bustCache = require("./handlers/bustCache");
const cacheData = require("./handlers/cacheData");

exports.addSet = addSet(admin);
exports.createTodoist = createTodoist(admin);
exports.todoistWebhook = todoistWebhook(admin);
exports.cacheData = cacheData(admin);
exports.bustCache = bustCache(admin);
