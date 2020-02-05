import React from "react";
import { Link } from "react-router-dom";
import SignInLinks from "./SignedinLinks";
import SignedOutLinks from "./SignedOutLinks";
import "../../style/navbar.css";
import { connect } from "react-redux";

const Navbar = props => {
  const { auth, profile } = props;
  const links = auth.uid ? (
    <SignInLinks profile={profile} />
  ) : (
    <SignedOutLinks />
  );
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
        <div className="right-container">{links}</div>
      </header>
    </React.Fragment>
  );
};

const mapStateToProps = state => {
  return {
    auth: state.firebase.auth,
    profile: state.firebase.profile
  };
};
export default connect(mapStateToProps)(Navbar);
