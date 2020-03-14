import React from "react";
import { NavLink } from "react-router-dom";

const SignedOutLinks = () => {
  return (
    <React.Fragment>
      <ul>
        <li>
          <NavLink to="/signin">
            <div className="login-btn-wrapper">
              <div className="lock-img"></div>
              <button className="nav-login-btn">登入</button>
            </div>
          </NavLink>
        </li>
        <li>
          <NavLink to="/signup">
            <button className="nav-signup-btn">註冊</button>
          </NavLink>
        </li>
      </ul>
    </React.Fragment>
  );
};
export default SignedOutLinks;
