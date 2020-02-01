import React, { Component } from "react";
import "../../style/dashboardnav.css";
import nav from "../../img/nav.png";
import home from "../../img/home.png";
import calendar from "../../img/calendar.png";
import time from "../../img/time.png";
import service from "../../img/service.png";
import staff from "../../img/staff.png";
import { Link } from "react-router-dom";

const DashboardNav = () => {
  return (
    <React.Fragment>
      <main>
        <div className="left-container">
          <ul>
            <li>
              <img src={nav} alt="nav" />
            </li>
            <Link to="/dashboard">
              <li className="home">
                <img src={home} alt="home" />
                管理介面首頁
              </li>
            </Link>
            <li>
              <img src={calendar} alt="calender" />
              行事曆
            </li>
            <Link to="/openinghours">
              <li>
                <img src={time} alt="time" />
                營業時間
              </li>
            </Link>
            <li>
              <img src={service} alt="service" />
              服務項目
            </li>
            <li>
              <img src={staff} alt="staff" />
              服務人員
            </li>
          </ul>
        </div>
        {/* <div className="right-container">
          <div className="home-info today-booking">
            <h1>今日預約</h1>
          </div>
          <div className="home-info upcoming-booking">
            <h1>本週預約</h1>
          </div>
          <div className="home-info today-booking">
            <h1>近期新增預約</h1>
          </div>
          <div className="home-info today-booking">
            <h1>服務統計</h1>
          </div>
        </div> */}
      </main>
    </React.Fragment>
  );
};

export default DashboardNav;
