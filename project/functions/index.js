const functions = require("firebase-functions");

// // Create and Deploy Your First Cloud Functions
// // https://firebase.google.com/docs/functions/write-firebase-functions

const admin = require("firebase-admin");
admin.initializeApp(functions.config().firebase);

const createNotification = notification => {
  return admin
    .firestore()
    .collection("notifications")
    .add(notification)
    .then(doc => console.log("NOTIFICATION ADDED", doc));
};

exports.bookingCreated = functions.firestore
  .document("store/{storeID}/booking/{bookingID}")
  .onCreate((snap, context) => {
    const newValue = snap.data();
    const storeID = context.params.storeID;
    const bookingID = context.params.bookingID;
    const notification = {
      content: newValue.desc,
      storeID,
      bookingID
    };
    return createNotification(notification);
  });
