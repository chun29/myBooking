import React from "react";

export const Notifications = props => {
  return (
    <div className="notification-wrapper">
      <h1 className="today-info">今日預約</h1>
      <div className="notification-section">
        <div className="today-sum">
          <div className="sum-item sum-item-1">
            <div>預約數</div>
            <div>5</div>
          </div>
          <div className="sum-item">
            <div>營業額</div>
            <div>$1100</div>
          </div>
        </div>
        <ul>
          <li className="today-booking-info-wrapper">
            <div className="today-booking-date">15</div>
            <div className="today-booking-info">
              <span className="today-booking-time">Sat, 15 Feb 2020 18:00</span>
              <span className="today-booking-service">洗髮</span>
              <span className="today-booking-staff"> June</span>
            </div>
            <div className="today-booking-price">$1000</div>
          </li>
          <li className="today-booking-info-wrapper">
            <div className="today-booking-date">15</div>
            <div className="today-booking-info">
              <span className="today-booking-time">Sat, 15 Feb 2020 18:00</span>
              <span className="today-booking-service">洗髮</span>
              <span className="today-booking-staff"> June</span>
            </div>
            <div className="today-booking-price">$1000</div>
          </li>
          <li className="today-booking-info-wrapper">
            <div className="today-booking-date">15</div>
            <div className="today-booking-info">
              <span className="today-booking-time">Sat, 15 Feb 2020 18:00</span>
              <span className="today-booking-service">洗髮</span>
              <span className="today-booking-staff"> June</span>
            </div>
            <div className="today-booking-price">$1000</div>
          </li>
          <li className="today-booking-info-wrapper">
            <div className="today-booking-date">15</div>
            <div className="today-booking-info">
              <span className="today-booking-time">Sat, 15 Feb 2020 18:00</span>
              <span className="today-booking-service">洗髮</span>
              <span className="today-booking-staff"> June</span>
            </div>
            <div className="today-booking-price">$1000</div>
          </li>
        </ul>
        <div className="view-all">查看全部預約 ></div>
      </div>
    </div>
  );
};

export const TodayBookings = props => {
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
