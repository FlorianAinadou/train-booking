var admin = require("firebase-admin");

var serviceAccount = require("./bookingtrain-a8f8c-firebase-adminsdk-fdhn5-edc596f7e3.json");

admin.initializeApp({
    credential: admin.credential.cert(serviceAccount)
});

module.exports.admin = admin;
