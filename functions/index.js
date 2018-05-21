const functions = require("firebase-functions");
const admin = require("firebase-admin");
admin.initializeApp();

const addSet = require("./handlers/addSet");
const createTodoist = require("./handlers/createTodoist");
exports.addSet = addSet(admin);
exports.createTodoist = createTodoist(admin);
