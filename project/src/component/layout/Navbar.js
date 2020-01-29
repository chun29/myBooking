import React from "react";
import { Link } from "react-router-dom";
import SignInLinks from "./SignedinLinks";
import SignedOutLinks from "./SignedOutLinks";
import "../../style/navbar.css";
import { connect } from "react-redux";

const Navbar = props => {
  const { auth } = props;
  console.log(auth);
  const links = auth.uid ? <SignInLinks /> : <SignedOutLinks />;
  return (
    <React.Fragment>
      <header className="nav-container">
        <div className="left-container">
          <Link to="/">
            <h1>MyBooking</h1>
          </Link>
          <nav>
            <ul>
              <Link to="/">
                <li>首頁</li>
              </Link>
              <li>功能介紹</li>
              <li>範例</li>
              <li>關於我們</li>
            </ul>
          </nav>
        </div>
        <div className="right-container">
          {links}
          {/* <Link to="signin">
            <button className="login-btn">登入</button>
          </Link>
          <Link to="signup">
            <button className="signup-btn">註冊</button>
          </Link> */}
        </div>
      </header>
    </React.Fragment>
  );
};

const mapStateToProps = state => {
  console.log(state);
  return {
    auth: state.firebase.auth
  };
};
export default connect(mapStateToProps)(Navbar);
