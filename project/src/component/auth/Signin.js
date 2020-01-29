import React, { Component } from "react";
import "../../style/login.css";
import { connect } from "react-redux";
import { signIn } from "../../store/actions/authAction";
import { Redirect } from "react-router-dom";

class SignIn extends Component {
  state = {
    email: "",
    password: ""
  };
  handleChange = e => {
    this.setState({
      [e.target.id]: e.target.value
    });
  };
  handleSubmit = e => {
    e.preventDefault();
    console.log(this.state);
    this.props.signIn(this.state);
  };
  render() {
    const { authError, auth } = this.props;
    if (auth.uid) return <Redirect to="dashboard" />;
    return (
      <div>
        <div className="signin-header">
          <h1>MyBooking</h1>
          <button className="signup-btn">註冊</button>
        </div>
        <div className="signin-container">
          <h1>預約管理系統</h1>
          <p>
            第一次使用嗎？<span>註冊</span>
          </p>
          <form onSubmit={this.handleSubmit} className="signin-input">
            <input
              placeholder="Email"
              id="email"
              onChange={this.handleChange}
            />
            <input
              placeholder="Password"
              type="password"
              id="password"
              autoComplete="on"
              onChange={this.handleChange}
            />
            <button className="signin-btn">登入</button>
            <div>{authError ? <p>{authError}</p> : null}</div>
          </form>
        </div>
      </div>
    );
  }
}
const mapStateToProps = state => {
  return {
    authError: state.auth.authError,
    auth: state.firebase.auth
  };
};

const mapDispatchToProps = dispatch => {
  return {
    signIn: creds => dispatch(signIn(creds))
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(SignIn);
