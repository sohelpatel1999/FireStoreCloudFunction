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
const admin = require("firebase-admin");
const { error } = require("firebase-functions/logger");
admin.initializeApp();
// const { user } = require("firebase-functions/v1/auth");
// const { snapshotConstructor } = require("firebase-functions/v1/firestore");

// Create and deploy your first functions
// https://firebase.google.com/docs/functions/get-started

// exports.helloWorld = onRequest((request, response) => {
//   logger.info("Hello logs!", {structuredData: true});
//   response.send("Hello from Firebase!");
// });
// exports.helloWorld = functions.https.onRequest((req, res) => {
//   res.send("Hello the function has started");
// });

// exports.api = functions.https.onRequest((req, res) => {
//   switch (req.method) {
//     case "GET":
//       res.send("It was a Get request");
//       break;
//     case "POST":
//       const body = req.body;
//       res.send(body);
//       break;
//     case "DELETE":
//       res.send("It was a DELETE request");
//       break;
//     default:
//       res.send("It was a default request");
//       break;
//   }
// });

// exports.userAdded = functions.auth.user().onCreate((user) => {
//   console.log(user.displayName + user.email);
//   return Promise.resolve();
// });

// exports.userDeleted = functions.auth.user().onDelete((user) => {
//   console.log(`User is Deleted ${user.displayName}`);
//   return Promise.resolve();
// });

// exports.documentCreated = functions.firestore
//   .document("/sample/{docid}")
//   .onCreate((snapshot, context) => {
//     console.log(snapshot.data());
//     return Promise.resolve();
//   });

// exports.documentdelete = functions.firestore
//   .document("/sample/{docid}")
//   .onDelete((snapshot, context) => {
//     console.log(snapshot.data(), " deleted");
//     return Promise.resolve();
//   });

// exports.documentUpdate = functions.firestore
//   .document("/sample/{docid}")
//   .onUpdate((snapshot, context) => {
//     console.log("before data ", snapshot.before.data());
//     console.log("after data ", snapshot.after.data());

//     return Promise.resolve();
//   });

exports.documentCreatedInsert = functions.firestore
  .document("/sample/{docid}")
  .onCreate((snapshot, context) => {
    const data = snapshot.data();
    console.log(data);

    const keytocopy = ["id", "name", "age"];

    const datatocopy = {};

    for (const field of keytocopy) {
      if (data[field] !== undefined) {
        console.log(
          field + " " + data[field] + "before adding to data" + datatocopy
        );
        datatocopy[field] = data[field]; //
        console.log(
          field + " " + data[field] + "after adding to data" + datatocopy
        );
      }
    }
    console.log(datatocopy);

    const newdata = admin.firestore().collection("newsample");

    const docid = context.params.docid;
    console.log(docid);

    return newdata
      .doc(docid)
      .set(datatocopy)
      .then(() => {
        console.log(`Document copied successfully`);
      })
      .catch((error) => {
        console.error("Error copying document:", error);
        throw new Error("Copy operation failed");
      });
  });

exports.insert = functions.firestore
  .document("/sample/{docid}")
  .onCreate((snapshot, context) => {
    const data = snapshot.data();

    const field = ["id", "name", "age"];

    const updatedatacopy = {};

    for (const iterator of field) {
      if (data[iterator] !== undefined) {
        updatedatacopy[iterator] = data[iterator];
      }
    }
    const newdata = admin.firestore().collection("newsample");

    const docid = context.params.docid;

    return newdata
      .doc(docid)
      .set(updatedatacopy)
      .then(() => {
        console.log("data sucessfully added");
      })
      .catch((error)=>{
        console.log("unable to copy data in collection", error)
        throw new Error("Copy operation failed")
      })
  });

exports.documentUpdateInsert = functions.firestore
  .document("/sample/{docid}")
  .onUpdate((change, context) => {
    const data = change.after.data();
    console.log(data);

    const keytocopy = ["id", "name", "age"];

    const datatocopy = {};

    for (const field of keytocopy) {
      if (data[field] !== undefined) {
        console.log(
          field + " " + data[field] + "before adding to data" + datatocopy
        );
        datatocopy[field] = data[field]; //
        console.log(
          field + " " + data[field] + "after adding to data" + datatocopy
        );
      }
    }
    console.log(datatocopy);

    const newdata = admin.firestore().collection("newsample");

    const docid = context.params.docid;
    console.log(docid);

    return newdata
      .doc(docid)
      .set(datatocopy)
      .then(() => {
        console.log(`Document Update successfully`);
      })
      .catch((error) => {
        console.error("Error Updating document:", error);
        throw new Error("Update operation failed");
      });
  });

exports.documentDelete = functions.firestore
  .document("/sample/{docid}")
  .onDelete((snapshot, context) => {
    const newdata = admin.firestore().collection("newsample");

    const docid = context.params.docid;
    console.log(docid);

    return newdata
      .doc(docid)
      .delete()
      .then(() => {
        console.log(`Document Deleted successfully`);
      })
      .catch((error) => {
        console.error("Error Deleteing document:", error);
        throw new Error("Delete operation failed");
      });
  });
