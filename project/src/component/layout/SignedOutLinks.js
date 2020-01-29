import React from "react";
import { NavLink } from "react-router-dom";

const SignedOutLinks = () => {
  return (
    <React.Fragment>
      <ul>
        <li>
          <NavLink to="/signin">
            <button className="login-btn">登入</button>
          </NavLink>
          <NavLink to="/signup">
            <button className="signup-btn">註冊</button>
          </NavLink>
        </li>
      </ul>
    </React.Fragment>
  );
};
export default SignedOutLinks;
