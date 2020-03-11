import React from "react";
import notFound from "../../img/notfound.png";
import { Logo } from "../layout/Layout";
const NoMatchPage = () => {
  return (
    <div>
      <div className="notfound-container confirm-email-container">
        <Logo className="logo" />
        <h5>很抱歉，此頁面並不存在</h5>

        <img className="notfound" src={notFound} />
        <div className="button-wrapper">
          <button onClick={() => (window.location = "/")} className="green-btn">
            回頁首
          </button>
        </div>
        <div className="help-msg">
          需要協助嗎？ 聯絡 MyBooking 尋求支援與服務
          <b>
            <span> mybookingtw@gmail.com</span>
          </b>
        </div>
      </div>
    </div>
  );
};

export default NoMatchPage;
