import React from "react";
import { Logo } from "../layout/Layout";
import { withRouter } from "react-router";

const ConfirmEmail = props => {
  return (
    <div className="confirm-email-container">
      <Logo className="logo" />
      <div>
        在登入前，我們需要驗證您的電子郵件，請先至收件夾確認您的驗證信，謝謝
      </div>

      <div className="button-wrapper">
        <button onClick={() => (window.location = "/")} className="green-btn">
          回頁首
        </button>

        <button
          onClick={() => (window.location = "/signin")}
          className="blue-btn"
        >
          我要登入
        </button>
      </div>
    </div>
  );
};

export default withRouter(ConfirmEmail);
