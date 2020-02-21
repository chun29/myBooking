import React, { Component } from "react";
import Navbar from "../layout/Navbar";
import "../../style/home.css";
import Footer from "../layout/Footer.js";
import { Link } from "react-router-dom";
import desc1 from "../../img/desc1.png";
import desc2 from "../../img/desc2.png";
import desc3 from "../../img/desc-1.png";

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
              <Link to="/signup">
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
                <h3>節省人力、24小時隨時預約</h3>
                <p>用線上系統取代人力，更省時間、更省成本、更多訂單！</p>
              </div>
            </div>
            <div className="main-desc">
              <div className="desc-image-wrapper">
                <img className="desc-image" src={desc1} />
              </div>
              <div className="desc-text">
                <h3>節省人力、24小時隨時預約</h3>
                <p>用線上系統取代人力，更省時間、更省成本、更多訂單！</p>
              </div>
            </div>
            <div className="main-desc">
              <div className="desc-image-wrapper">
                <img className="desc-image" src={desc2} />
              </div>
              <div className="desc-text">
                <h3>節省人力、24小時隨時預約</h3>
                <p>用線上系統取代人力，更省時間、更省成本、更多訂單！</p>
              </div>
            </div>
          </div>
        </div>
        <footer>
          <Footer />
        </footer>
      </React.Fragment>
    );
  }
}
