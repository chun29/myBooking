import React from "react";
import { NavLink, Link } from "react-router-dom";
import "../../style/Layout.css";

export const Logo = () => {
  return (
    <div>
      <Link className="logo-container" to="/">
        <div className="nav-logo"></div>
        <h1>MyBooking</h1>
      </Link>
    </div>
  );
};

export const UserAvatar = userName => {
  return (
    <NavLink to="/online">
      <div className="home-user-avatar">{userName.userName}</div>
      {/* <div className="dropdown">TEST</div> */}
    </NavLink>
  );
};
