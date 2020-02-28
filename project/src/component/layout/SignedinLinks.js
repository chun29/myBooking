import React, { Component } from "react";
import { NavLink } from "react-router-dom";
import { connect } from "react-redux";
import { firestoreConnect } from "react-redux-firebase";
import { compose } from "redux";
import { signOut } from "../../store/actions/authAction";

class SignedInLinks extends Component {
  render() {
    const { profile } = this.props;
    let user = "";

    if (profile.name) {
      user = profile.name.charAt(0).toUpperCase();
    }

    return (
      <React.Fragment>
        <ul>
          <li>
            <NavLink to="/dashboard">
              <button className="nav-signup-btn">前往管理系統</button>
            </NavLink>
          </li>
          <li>
            <a onClick={this.props.signOut}>
              <div className="login-btn-wrapper">
                <div className="exit-img"></div>
                <button className="nav-login-btn">登出</button>
              </div>
            </a>
          </li>
          <li>
            <NavLink to="/online">
              <div className="home-user-avatar">{user}</div>
            </NavLink>
          </li>
        </ul>
      </React.Fragment>
    );
  }
}

const mapDispatchToProps = dispatch => {
  return {
    signOut: () => dispatch(signOut())
  };
};

export default compose(
  connect(null, mapDispatchToProps),
  firestoreConnect([
    {
      collection: "owners"
    }
  ])
)(SignedInLinks);
