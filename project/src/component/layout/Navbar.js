import React, { Component } from "react";
import { Link } from "react-router-dom";
import SignInLinks from "./SignedinLinks";
import SignedOutLinks from "./SignedOutLinks";
import "../../style/navbar.css";
import { connect } from "react-redux";
import { Logo } from "../layout/Layout";
import hamburger from "../../img/hamburger.png";

class Navbar extends Component {
  constructor(props) {
    super(props);
    this.state = {
      showMenu: false
    };
  }
  render() {
    const { auth, profile } = this.props;
    this.showMenu = () => {
      console.log("click");
      this.setState({
        showMenu: !this.state.showMenu
      });
    };
    const links = auth.uid ? (
      <SignInLinks profile={profile} />
    ) : (
      <SignedOutLinks />
    );
    return (
      <React.Fragment>
        <header className="nav-container">
          <div className="left-container">
            <Logo />

            <nav>
              <ul>
                <li>功能介紹</li>
                <li>範例</li>
              </ul>
            </nav>
          </div>
          <div className="right-container">
            {links}
            <div>
              <img
                onClick={this.showMenu}
                className="hamburger"
                src={hamburger}
              />
            </div>
          </div>
        </header>
        {this.state.showMenu && (
          <div className="s-menu">
            <ul>
              {auth.uid ? (
                <Link to="/dashboard">
                  <li>前往管理介面</li>
                </Link>
              ) : (
                <li className="ul-btn-wrapper">
                  <Link to="/signin">
                    <span className="ul-login">登入</span>
                  </Link>

                  <Link to="/signup">
                    <span className="ul-login">註冊</span>
                  </Link>
                </li>
              )}
              <li>範例</li>
              <li>功能介紹</li>
            </ul>
          </div>
        )}
      </React.Fragment>
    );
  }
}

const mapStateToProps = state => {
  return {
    auth: state.firebase.auth,
    profile: state.firebase.profile
  };
};

export default connect(mapStateToProps)(Navbar);
