import React, { Component } from "react";
import "../../style/dashboardnav.css";
import nav from "../../img/nav.png";
import home from "../../img/home.png";
import calendar from "../../img/calendar.png";
import time from "../../img/time.png";
import service from "../../img/service.png";
import staff from "../../img/staff.png";
import online from "../../img/online.png";
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
            <Link to="/calendar">
              <li>
                <img src={calendar} alt="calender" />
                行事曆
              </li>
            </Link>
            <Link to="/openinghours">
              <li>
                <img src={time} alt="time" />
                營業時間
              </li>
            </Link>
            <Link to="/service">
              <li>
                <img src={service} alt="service" />
                服務項目
              </li>
            </Link>
            <Link to="/staff">
              <li>
                <img src={staff} alt="staff" />
                服務人員
              </li>
            </Link>
            <Link to="/online">
              <li>
                <img src={online} alt="online website" />
                打造專屬預約網站
              </li>
            </Link>
          </ul>
        </div>
      </main>
    </React.Fragment>
  );
};

export default DashboardNav;
