import moment from "moment";

function add(n1, n2) {
  return Number(n1) + Number(n2);
}
function avg(data) {
  let total = data.reduce((total, item) => {
    return total + item.price;
  }, 0);
  return total / data.length;
}

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

export {
  add,
  avg,
  validateEmail,
  getStoreFormatYMD,
  todayStoreFormat,
  getFormatYMD,
  todayFormat,
  getFormatTime
};
