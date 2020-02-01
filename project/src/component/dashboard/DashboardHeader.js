import React, { Component } from "react";
import { Link } from "react-router-dom";
import "../../style/dashboardheader.css";

const DashboardHeader = () => {
  return (
    <React.Fragment>
      <div className="dashboard-header">
        <Link to="/">
          <h1>MyBooking</h1>
        </Link>
        <div className="right-container">
          <div className="online-container">
            <div className="color-sign"></div>
            <div className="online-info">
              <p>線上預約網站</p>
              <p className="online-setup">尚未設定</p>
            </div>
          </div>
          <div className="bell-img"></div>
          <div className="user-avatar">J</div>
        </div>
      </div>
    </React.Fragment>
  );
};

export default DashboardHeader;
