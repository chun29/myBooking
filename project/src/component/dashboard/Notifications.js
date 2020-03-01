import React from "react";
import moment from "moment";
import { Link } from "react-router-dom";
import notFound from "../../img/notfound.png";

export const TodayBookings = props => {
  const { todayBookings } = props;

  if (todayBookings.length < 1) {
    return (
      <div className="notification-wrapper">
        <h1 className="today-info">今日預約</h1>
        <div className="today-info-no">尚無預約</div>
        <div className="not-found">
          <img className="notfound-img" src={notFound} />
        </div>
        <Link to="/calendar">
          <div className="view-all">查看全部預約 ></div>
        </Link>
      </div>
    );
  } else {
    const newBookingList = todayBookings.sort(function(a, b) {
      return a.startTime - b.startTime;
    });
    const bookingNum = todayBookings.length;
    const d = new Date();
    const c = moment(d).format("YYYY-MM-DD");
    const staffInfo = props.staffs;
    const serviceInfo = props.services;

    const bookingList =
      todayBookings &&
      staffInfo &&
      serviceInfo &&
      newBookingList.map(booking => {
        let time = "";
        if (booking.startTime == 12) {
          time = "12:00 PM";
        } else if (booking.startTime == 12.5) {
          time = "12:30 PM";
        } else {
          let hh = Math.floor(booking.startTime);
          let mm = (booking.startTime * 60) % 60;
          let ap = ["AM", "PM"]; // AM-PM
          time =
            ("0" + (hh % 12)).slice(-2) +
            ":" +
            ("0" + mm).slice(-2) +
            " " +
            ap[Math.floor(hh / 12)];
        }

        const staff =
          staffInfo &&
          staffInfo.filter(staff => staff.id === booking.selectedStaff);

        const staffName = staff[0] && staff[0].name;
        const staffColor = staff[0] && staff[0].color;

        const service =
          serviceInfo &&
          serviceInfo.filter(service => service.id === booking.selectedService);
        const serviceName = service && service[0] && service[0].item;
        const servicePrice = service && service[0] && service[0].price;

        return {
          time: time,
          staff: staffName,
          service: serviceName,
          staffColor: staffColor,
          price: servicePrice
        };
      });
    let allPrice = 0;
    if (bookingList) {
      for (let i = 0; i < bookingList.length; i++) {
        allPrice = Number(allPrice) + Number(bookingList[i].price);
      }
    }
    return (
      <div className="notification-wrapper">
        <h1 className="today-info">今日預約</h1>
        <div className="notification-section">
          <div className="today-sum">
            <div className="sum-item sum-item-1">
              <div>預約數</div>
              <div>{bookingNum}</div>
            </div>
            <div className="sum-item">
              <div>營業額</div>
              <div>$ {allPrice}</div>
            </div>
          </div>
          <ul>
            {bookingList &&
              bookingList.map((booking, i) => {
                return (
                  <li key={i} className="today-booking-info-wrapper">
                    <div className="today-booking-date">{booking.time}</div>
                    <div className="today-booking-info">
                      <span className="today-booking-time">{c}</span>
                      <span className="today-booking-service">
                        {booking.service}
                      </span>
                      <span
                        className="today-booking-staff"
                        style={{ color: booking.staffColor }}
                      >
                        {booking.staff}
                      </span>
                    </div>
                    <div className="today-booking-price">$ {booking.price}</div>
                  </li>
                );
              })}
          </ul>

          <Link to="/calendar">
            <div className="view-all">查看全部預約 ></div>
          </Link>
        </div>
      </div>
    );
  }
};

export const Notifications = props => {
  if (props.notifications === null) {
    return <div>Loading</div>;
  }

  const newNotificationsList =
    props.notifications &&
    props.notifications.sort(function(a, b) {
      return b.createdAt.seconds - a.createdAt.seconds;
    });
  const notifications =
    newNotificationsList &&
    newNotificationsList.map(data => {
      const t = moment(data.createdAt.seconds * 1000).format("YYYY-MM-DD");

      if (data.type === "系統通知") {
        return {
          type: data.type,
          createdAt: t,
          content: data.content
        };
      }

      const date = data.selectedDate.seconds * 1000;
      const tt = moment(date).format("YYYY-MM-DD");

      let time = "";

      if (data.startTime == 12) {
        time = "12:00 PM";
      } else if (data.startTime == 12.5) {
        time = "12:30 PM";
      } else {
        let hh = Math.floor(data.startTime);
        let mm = (data.startTime * 60) % 60;
        let ap = ["AM", "PM"]; // AM-PM
        time =
          ("0" + (hh % 12)).slice(-2) +
          ":" +
          ("0" + mm).slice(-2) +
          " " +
          ap[Math.floor(hh / 12)];
      }

      if (data.type === "預約取消") {
        return {
          type: data.type,
          createdAt: t,
          content: `${tt} ${time} 一筆 ${data.staffName}  ${data.serviceItem}預約 已取消`
        };
      }
      return {
        type: data.type,
        createdAt: t,
        content: `${data.name} 預約了 ${tt} ${time} ${data.staffName}  ${data.serviceItem}`
      };
    });

  return (
    <div className="notification-wrapper notification-wrapper-2">
      <h1 className="new-info">最新訊息</h1>
      <div className="notification-section-2">
        {notifications &&
          notifications.map((notification, i) => {
            return (
              <div key={i} className="change-box">
                <div className="date">{notification.createdAt}</div>
                <h3>{notification.type}</h3>
                <p>{notification.content}</p>
              </div>
            );
          })}
      </div>
      <Link to="/createbooking">
        <div className="view-all-2">新增預約 ></div>
      </Link>
    </div>
  );
};
