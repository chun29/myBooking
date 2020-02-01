import React, { Component } from "react";
import Navbar from "../layout/Navbar";
import "../../style/home.css";

export default class home extends Component {
  render() {
    return (
      <React.Fragment>
        <Navbar />
        <div className="main-container">
          <div className="main-content">
            <div className="desc">
              <h2>店家大小事就交給 MyBooking</h2>
              <p>專為店家設計的線上管理系統解決預約問題</p>
              <button>立即體驗</button>
            </div>
            <div className="main-image"></div>
          </div>
        </div>
        <div className="main-desc-section">
          <h2>為什麼選擇使用MyBooking？</h2>
          <div className="container">
            <div className="main-desc">
              <div className="desc-image"></div>
              <h3>節省人力、24小時隨時預約</h3>
              <p>用線上系統取代人力，更省時間、更省成本、更多訂單！</p>
            </div>
            <div className="main-desc">
              <div className="desc-image"></div>
              <h3>節省人力、24小時隨時預約</h3>
              <p>用線上系統取代人力，更省時間、更省成本、更多訂單！</p>
            </div>
            <div className="main-desc">
              <div className="desc-image"></div>
              <h3>節省人力、24小時隨時預約</h3>
              <p>用線上系統取代人力，更省時間、更省成本、更多訂單！</p>
            </div>
          </div>
        </div>
      </React.Fragment>
    );
  }
}
