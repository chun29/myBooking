import React from "react";
import { Link } from "react-router-dom";
import SignInLinks from "./SignedinLinks";
import SignedOutLinks from "./SignedOutLinks";
import "../../style/navbar.css";
import { connect } from "react-redux";
import { Logo } from "../layout/Layout";
import hamburger from "../../img/hamburger.png";
import { signOut } from "../../store/actions/authAction";

class Navbar extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      showMenu: false
    };
  }
  render() {
    const { auth, profile } = this.props;
    this.showMenu = () => {
      this.setState(prevState => ({
        ...prevState.showMenu,
        showMenu: !prevState.showMenu
      }));
    };
    const links =
      auth.uid && auth.emailVerified ? (
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
                <Link to="/booking/2j5bTxHyhRPj7YP92tWJCdoxbdq2">
                  <li>預約網站範例</li>
                </Link>
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
            {auth.uid && auth.emailVerified ? (
              <React.Fragment>
                <ul className="s-menu-one">
                  <Link to="/dashboard">
                    <li>前往管理介面</li>
                  </Link>
                  <Link to="/booking/2j5bTxHyhRPj7YP92tWJCdoxbdq2">
                    <li>預約網站範例</li>
                  </Link>
                </ul>
                <div>
                  <div className="s-menu-login-btn-wrapper">
                    <div className="exit-img"></div>
                    <div onClick={this.props.signOut}>登出</div>
                  </div>
                </div>
              </React.Fragment>
            ) : (
              <ul>
                <li className="ul-btn-wrapper">
                  <Link to="/signin">
                    <span className="ul-login blue-btn">登入</span>
                  </Link>

                  <Link to="/signup">
                    <span className="ul-login green-btn">註冊</span>
                  </Link>
                </li>
                <Link to="/booking/2j5bTxHyhRPj7YP92tWJCdoxbdq2">
                  <li>預約網站範例</li>
                </Link>
              </ul>
            )}
          </div>
        )}
      </React.Fragment>
    );
  }
}
const mapDispatchToProps = dispatch => {
  return {
    signOut: () => dispatch(signOut())
  };
};

const mapStateToProps = state => {
  return {
    auth: state.firebase.auth,
    profile: state.firebase.profile
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Navbar);
