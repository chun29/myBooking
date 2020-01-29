import React from "react";
import { NavLink } from "react-router-dom";
import { connect } from "react-redux";
import { signOut } from "../../store/actions/authAction";

const SignedInLinks = props => {
  return (
    <React.Fragment>
      <ul>
        <li>
          <NavLink to="/dashboard">
            <button className="login-btn">前往管理系統</button>
          </NavLink>
        </li>
        <li>
          <a onClick={props.signOut}>
            <button className="login-btn">登出</button>
          </a>
        </li>
        <li>
          <NavLink to="/" className="user-avatar">
            大頭貼
          </NavLink>
        </li>
      </ul>
    </React.Fragment>
  );
};

const mapDispatchToProps = dispatch => {
  return {
    signOut: () => dispatch(signOut())
  };
};

export default connect(null, mapDispatchToProps)(SignedInLinks);
