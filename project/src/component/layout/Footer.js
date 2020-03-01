import React from "react";
import "../../style/footer.css";
import fb from "../../img/facebook.png";
import linkedin from "../../img/linkedin.png";
import instagram from "../../img/instagram.png";

export default function Footer() {
  return (
    <div className="footer">
      <div className="main-footer">
        <div className="footer-section">
          <h6>MyBooking</h6>
          <ul>
            <li>關於我們</li>
            <li>聯繫我們</li>
            <li>加入我們</li>
            <li>隱私政策</li>
            <li>服務條款</li>
          </ul>
        </div>
        <div className="footer-section">
          <h6>獲得幫助</h6>
          <ul>
            <li>常見問題</li>
            <li>企業合作</li>
            <li>訂閱電子報</li>
          </ul>
        </div>
        <div className="footer-section">
          <h6>MyBooking 客服</h6>
          <ul>
            <li>客服信箱 mybookingtw@gmail.com</li>
            <li>週一至週日 10:00 - 21:00</li>
          </ul>
        </div>
        <div className="footer-section">
          <h6>追蹤我們</h6>
          <ul>
            <li>在社群媒體上追蹤我們</li>
            <li className="social-media">
              <img src={fb} />
              <img src={instagram} />
              <img src={linkedin} />
            </li>
          </ul>
        </div>
      </div>
      <div className="copyright">© 2020 MyBooking All rights reserved.</div>
    </div>
  );
}
