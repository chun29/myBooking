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
    const bookingID = context.params.bookingID;
    const mailOptions = {
      from: `mybookingtw@gmail.com`,
      to: snap.data().email,
      subject: "MyBooking 預約系統平台通知",
      html: `<h1>預約成功</h1>
              <p>親愛的 ${snap.data().name} 先生/小姐 您好：<p>
              <p>您的預約已經成功，以下是您的預約資料，感謝您的光臨。</p>
              <p><b>預約代碼：</b>${bookingID} </p>
              <p><b>預約商家：</b></p>
              <p><b>預約時段：</b></p>
              <p><b>服務：</b></p>
              <p><b>服務人員：</b></p>
              <p><b>電子郵件: </b>${snap.data().email} </p>
              <p><b>備註: </b>${snap.data().desc} </p>
              <p>如有任何問題請聯繫 MyBooking 訂位服務平台，謝謝。</p>
           `
    };
    return transporter.sendMail(mailOptions, (error, data) => {
      if (error) {
        console.log(error);
        return;
      }
      console.log("Sent!");
    });
  });
