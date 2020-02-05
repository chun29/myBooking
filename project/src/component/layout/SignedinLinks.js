import React, { Component } from "react";
import { NavLink } from "react-router-dom";
import { connect } from "react-redux";
import { firestoreConnect } from "react-redux-firebase";
import { compose } from "redux";
import { signOut } from "../../store/actions/authAction";
import "../../style/signedinLink.css";

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
              <button className="login-btn">前往管理系統</button>
            </NavLink>
          </li>
          <li>
            <a onClick={this.props.signOut}>
              <button className="login-btn">登出</button>
            </a>
          </li>
          <li>
            <NavLink to="/">
              <div className="user-avatar">{user}</div>
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
