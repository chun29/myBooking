import React, { Component } from "react";
import Navbar from "../layout/Navbar";
import "../../style/home.css";
import Footer from "../layout/Footer.js";
import { Link } from "react-router-dom";
import desc1 from "../../img/desc1.png";
import desc2 from "../../img/desc2.png";
import desc3 from "../../img/desc-1.png";
import flow from "../../img/flow.png";

export default class home extends Component {
  render() {
    return (
      <React.Fragment>
        <Navbar />

        <div className="main-container">
          <div className="main-content">
            <div className="desc">
              <h2>店家大小事就交給</h2>
              <h2>MyBooking</h2>
              <p>專為店家設計的線上管理系統解決預約問題</p>
              <Link to="/signup">
                <button className="blue-btn">立即體驗</button>
              </Link>
              <Link to="/booking/EPosWGQJCMMgaY6lCB6sG0fV8ZA2">
                <button className="green-btn">了解更多</button>
              </Link>
            </div>
            <div className="main-image-wrapper">
              <div className="main-image"></div>
            </div>
          </div>
        </div>
        <div className="main-desc-section">
          <h2>為什麼選擇使用 MyBooking？</h2>

          <div className="container">
            <div className="main-desc">
              <div className="desc-image-wrapper">
                <img className="desc-image" src={desc3} />
              </div>
              <div className="desc-text">
                <h3>節省人力與管理成本</h3>
                <p>
                  用線上系統取代人力，系統自動完成預約，不再浪費時間接電話。把省下的時間與成本，拿來接更多訂單
                </p>
              </div>
            </div>
            <div className="main-desc">
              <div className="desc-image-wrapper">
                <img className="desc-image" src={desc1} />
              </div>
              <div className="desc-text">
                <h3>預約行事曆隨時隨地帶著走</h3>
                <p>
                  不管人在哪裡，您可以 24
                  小時隨時查看可預約時段，並迅速建立新預約、彈性取消預約
                </p>
              </div>
            </div>
            <div className="main-desc">
              <div className="desc-image-wrapper">
                <img className="desc-image" src={desc2} />
              </div>
              <div className="desc-text">
                <h3>整合各大平台的專屬預約網站</h3>
                <p>
                  與Facebook 粉絲頁、Line
                  官方帳號等平台整合的專屬預約網頁，讓顧客不論用什麼平台，都能輕鬆完成預約
                </p>
              </div>
            </div>
          </div>
        </div>
        <div className="main-desc-section-2">
          <div className="main-desc-section-2-container">
            <h2>直覺化預約管理</h2>
            <p>
              輕鬆新增服務項目與服務人員。日期、金額、備註說明皆在彈指間秒速新增
            </p>
            <p></p>
            <Link to="/booking/EPosWGQJCMMgaY6lCB6sG0fV8ZA2">
              <button className="main-desc-section-2-btn blue-btn">
                了解預約管理系統
              </button>
            </Link>

            <img src={flow} />
          </div>
        </div>

        <footer>
          <Footer />
        </footer>
      </React.Fragment>
    );
  }
}
