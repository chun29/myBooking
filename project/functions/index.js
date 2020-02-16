const functions = require("firebase-functions");
const nodemailer = require("nodemailer");
const cors = require("cors")({ origin: true });
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

let transporter = nodemailer.createTransport({
  service: "gmail",
  auth: {
    user: "mybookingtw@gmail.com",
    pass: "mybooking123"
  }
});

exports.sendEmail = functions.firestore
  .document("store/{storeID}/booking/{bookingID}")
  .onCreate((snap, context) => {
    const mailOptions = {
      from: `mybookingtw@gmail.com`,
      to: snap.data().email,
      subject: "contact form message",
      html: `<h1>Order Confirmation</h1>
           <p> <b>Email: </b>${snap.data().email} </p>`
    };
    return transporter.sendMail(mailOptions, (error, data) => {
      if (error) {
        console.log(error);
        return;
      }
      console.log("Sent!");
    });
  });
