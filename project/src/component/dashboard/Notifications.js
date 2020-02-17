import React from "react";
import moment, { months } from "moment";
import { Link } from "react-router-dom";
import notFound from "../../img/notfound.png";

export const TodayBookings = props => {
  const { todayBookings } = props;
  let view;
  if (todayBookings.length < 1) {
    view = (
      <div className="not-found">
        <img className="notfound-img" src={notFound} />
      </div>
    );
  } else {
    const bookingNum = todayBookings.length;
    const d = new Date();
    const c = moment(d).format("YYYY-MM-DD");
    const staffInfo = props.staffs;
    const serviceInfo = props.services;
    const bookingList =
      todayBookings &&
      staffInfo &&
      serviceInfo &&
      todayBookings.map(booking => {
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
        console.log(staffName);

        const service =
          serviceInfo &&
          serviceInfo.filter(service => service.id === booking.selectedService);
        const serviceName = service && service[0] && service[0].item;
        if (service) {
          console.log(service);
        }
        const servicePrice = service && service[0] && service[0].price;
        // let date = new Date(booking.selectedDate.seconds * 1000);
        // const bookingMonth = date.getMonth() + 1;
        // const bookingDate = date.getDate();
        // const bookingHours = date.getHours();
        // const { name, phone, email, desc, duration } = booking;
        // const id = booking.id;

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
    view = (
      <div className="notification-wrapper">
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

  return (
    <div className="notification-wrapper">
      <h1 className="today-info">今日預約</h1>
      {view}
      {/* <div className="notification-section">
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
      </div>*/}
    </div>
  );
};

export const Notifications = props => {
  return (
    <div className="notification-wrapper notification-wrapper-2">
      <h1 className="new-info">最新訊息</h1>
      <div className="notification-section-2">
        <div className="change-box">
          <div className="date">September 18, 2019</div>
          <h3>新預約</h3>
          <p>
            Minor branding re-design to the dashboard to reflect new website.
          </p>
        </div>
        <div className="change-box">
          <div className="date">September 18, 2019</div>
          <h3>新預約</h3>
          <p>
            Minor branding re-design to the dashboard to reflect new website.
          </p>
        </div>
        <div className="change-box">
          <div className="date">September 18, 2019</div>
          <h3>新預約</h3>
          <p>
            Minor branding re-design to the dashboard to reflect new website.
          </p>
        </div>
        <div className="change-box">
          <div className="date">September 18, 2019</div>
          <h3>新預約</h3>
          <p>
            Minor branding re-design to the dashboard to reflect new website.
          </p>
        </div>
      </div>
      <div className="view-all-2">查看全部訊息 ></div>
    </div>
  );
};
