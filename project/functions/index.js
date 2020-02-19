const functions = require("firebase-functions");
const nodemailer = require("nodemailer");
const cors = require("cors")({ origin: true });

const admin = require("firebase-admin");
admin.initializeApp(functions.config().firebase);

// booking created
const createNotification = (notification, id) => {
  return admin
    .firestore()
    .collection("store")
    .doc(id)
    .collection("notifications")
    .add({
      ...notification,
      createdAt: new Date()
    })
    .then(doc => console.log("NOTIFICATION ADDED", doc));
};

//user created
exports.userCreated = functions.firestore
  .document("owners/{ownerID}")
  .onCreate((snap, context) => {
    const newValue = snap.data();
    const ownerID = context.params.ownerID;
    const notification = {
      type: "系統通知",
      content: `Hi ${newValue.name}，歡迎使用 MyBooking 預約管理系統。請先去做商店基本設定。`
    };
    return createNotification(notification, ownerID);
  });

exports.bookingCreated = functions.firestore
  .document("store/{storeID}/booking/{bookingID}")
  .onCreate((snap, context) => {
    const newValue = snap.data();
    const storeID = context.params.storeID;
    const notification = {
      type: "新預約",
      name: newValue.name,
      selectedDate: newValue.selectedDate,
      timeText: newValue.timeText,
      serviceItem: newValue.serviceItem,
      staffName: newValue.staffName
    };
    return createNotification(notification, storeID);
  });

// booking created send email
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
              <p><b>預約商家：</b>${snap.data().storeName}</p>
              <p><b>預約日期：</b>${snap.data().bookedDay}</p>
              <p><b>預約時段：</b>${snap.data().timeText}</p>
              <p><b>服務：</b>${snap.data().serviceItem}</p>
              <p><b>服務人員：</b>${snap.data().staffName}</p>
              <p><b>電子郵件:</b> </b>${snap.data().email} </p>
              <p><b>備註:</b>${snap.data().desc} </p>
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

// delete booking

exports.bookingDelete = functions.firestore
  .document("store/{storeID}/booking/{bookingID}")
  .onDelete((snap, context) => {
    const newValue = snap.data();
    const storeID = context.params.storeID;
    const notification = {
      type: "預約取消",
      selectedDate: newValue.selectedDate,
      startTime: newValue.startTime,
      serviceItem: newValue.serviceItem,
      staffName: newValue.staffName
    };
    return createNotification(notification, storeID);
  });
