import moment from "moment";

function validateEmail(email) {
  let re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
  return re.test(String(email).toLowerCase());
}

// 20200101
function getStoreFormatYMD(date) {
  const mm = date.getMonth() + 1;
  const dd = date.getDate();

  return [
    date.getFullYear(),
    (mm > 9 ? "" : "0") + mm,
    (dd > 9 ? "" : "0") + dd
  ].join("");
}
const today = new Date();
const todayStoreFormat = getStoreFormatYMD(today);

// 2020-01-01
function getFormatYMD(date) {
  return moment(date).format("YYYY-MM-DD");
}
const todayFormat = getFormatYMD(today);

// 12:30 PM
function getFormatTime(time) {
  if (time == 12) {
    return "12:00 PM";
  } else if (time == 12.5) {
    return "12:30 PM";
  } else {
    let hh = Math.floor(time);
    let mm = (time * 60) % 60;
    let ap = ["AM", "PM"];
    return (
      ("0" + (hh % 12)).slice(-2) +
      ":" +
      ("0" + mm).slice(-2) +
      " " +
      ap[Math.floor(hh / 12)]
    );
  }
}

function validation(type, value) {
  if (type === "price" || type === "phone" || type === "storePhone") {
    if (isNaN(value)) {
      return true;
    } else {
      return false;
    }
  }
}

export {
  validateEmail,
  getStoreFormatYMD,
  todayStoreFormat,
  getFormatYMD,
  todayFormat,
  getFormatTime,
  validation
};
