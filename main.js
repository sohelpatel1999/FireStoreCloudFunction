/**
 * Import function triggers from their respective submodules:
 *
 * const {onCall} = require("firebase-functions/v2/https");
 * const {onDocumentWritten} = require("firebase-functions/v2/firestore");
 *
 * See a full list of supported triggers at https://firebase.google.com/docs/functions
 */

// const {onRequest} = require("firebase-functions/v2/https");
// const logger = require("firebase-functions/logger");
// console.log("sohel patel")
const functions = require("firebase-functions");
const { user } = require("firebase-functions/v1/auth");
const { snapshotConstructor } = require("firebase-functions/v1/firestore");

// Create and deploy your first functions
// https://firebase.google.com/docs/functions/get-started

// exports.helloWorld = onRequest((request, response) => {
//   logger.info("Hello logs!", {structuredData: true});
//   response.send("Hello from Firebase!");
// });
exports.helloWorld = functions.https.onRequest((req, res) => {
  res.send("Hello the function has started");
});

exports.api = functions.https.onRequest((req, res) => {
  switch (req.method) {
    case "GET":
      res.send("It was a Get request");
      break;
    case "POST":
      const body = req.body;
      res.send(body);
      break;
    case "DELETE":
      res.send("It was a DELETE request");
      break;
    default:
      res.send("It was a default request");
      break;
  }
});

exports.userAdded = functions.auth.user().onCreate((user) => {
  console.log(user.displayName + user.email);
  return Promise.resolve();
});

exports.userDeleted = functions.auth.user().onDelete((user) => {
  console.log(`User is Deleted ${user.displayName}`);
  return Promise.resolve();
});

exports.documentCreated = functions.firestore
  .document("/sample/{docid}")
  .onCreate((snapshot, context) => {
    console.log(snapshot.data());
    // return Promise.resolve();
  });

exports.documentdelete = functions.firestore
  .document("/sample/{docid}")
  .onDelete((snapshot, context) => {
    console.log(snapshot.data(), " deleted");
    return Promise.resolve();
  });

exports.documentUpdate = functions.firestore
  .document("/sample/{docid}")
  .onUpdate((snapshot, context) => {
    console.log("before data ", snapshot.before.data());
    console.log("after data ", snapshot.after.data());

    return Promise.resolve();
  });
