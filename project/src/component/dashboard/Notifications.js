import React from "react";
import { Link } from "react-router-dom";
import notFound from "../../img/notfound.png";
import { todayFormat, getFormatYMD, getFormatTime } from "../../lib";

function TodayBookings({ todayBookings, staffs, services }) {
  const bookingNum = todayBookings.length;
  if (bookingNum < 1) {
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
    const sortBookingList = todayBookings.sort(function(a, b) {
      return a.startTime - b.startTime;
    });

    const bookingList =
      todayBookings &&
      staffs &&
      services &&
      sortBookingList.map(booking => {
        const time = getFormatTime(booking.startTime);
        const staff = staffs.filter(
          staff => staff.id === booking.selectedStaff
        );
        const service = services.filter(
          service => service.id === booking.selectedService
        );

        return {
          time,
          staff: staff[0] && staff[0].name,
          service: service[0] && service[0].item,
          staffColor: staff[0] && staff[0].color,
          price: service[0] && service[0].price
        };
      });
    let allPrice = 0;
    if (bookingList) {
      for (let i = 0; i < bookingNum; i++) {
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
                      <span className="today-booking-time">{todayFormat}</span>
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
}

function Notifications({ notifications }) {
  const sortNotificationsList =
    notifications &&
    notifications.sort(function(a, b) {
      return b.createdAt.seconds - a.createdAt.seconds;
    });
  notifications =
    sortNotificationsList &&
    sortNotificationsList.map(notification => {
      const notificationFormatDate = getFormatYMD(
        notification.createdAt.seconds * 1000
      );
      const formatTime = getFormatTime(notification.startTime);

      if (notification.type === "系統通知") {
        return {
          type: notification.type,
          createdAt: notificationFormatDate,
          content: notification.content
        };
      }

      const bookingDateFormat = getFormatYMD(
        notification.selectedDate.seconds * 1000
      );

      if (notification.type === "預約取消") {
        return {
          type: notification.type,
          createdAt: notificationFormatDate,
          content: `${bookingDateFormat} ${formatTime} 一筆 ${notification.staffName}  ${notification.serviceItem}預約 已取消`
        };
      }
      return {
        type: notification.type,
        createdAt: notificationFormatDate,
        content: `${notification.name} 預約了 ${bookingDateFormat} ${formatTime} ${notification.staffName}  ${notification.serviceItem}`
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
}

export { TodayBookings, Notifications };
