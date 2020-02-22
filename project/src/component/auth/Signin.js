import React, { Component } from "react";
import "../../style/login.css";
import { connect } from "react-redux";
import { signIn } from "../../store/actions/authAction";
import { Redirect } from "react-router-dom";
import { Link } from "react-router-dom";
import { Logo } from "../layout/Layout";

class SignIn extends Component {
  state = {
    email: "",
    password: "",
    error: ""
  };
  handleChange = e => {
    this.setState({
      [e.target.id]: e.target.value,
      error: ""
    });
  };
  handleSubmit = e => {
    e.preventDefault();
    if (this.state.email.length < 1 || this.state.password.length < 6) {
      this.setState({
        error: "請檢查輸入的信箱或密碼"
      });
      return;
    }
    this.props.signIn(this.state);
    this.setState({
      error: "登入中"
    });
  };
  render() {
    const { authError, auth } = this.props;

    const errorMsg = this.state.error;
    if (auth.uid) return <Redirect to="dashboard" />;
    return (
      <div className="signin-wrapper">
        <div className="signin-header">
          <Logo />
          <Link to="/signup">
            <div className="signup-btn-wrapper">
              <div className="plus-img"></div>
              <button className="signup-btn">註冊</button>
            </div>
          </Link>
        </div>
        <div className="signin-down">
          <div className="signin-left"></div>
          <div className="signin-right">
            <div className="signin-container">
              <div className="signin-logo"></div>
              <h1>預約管理系統</h1>
              <p>
                第一次使用嗎？
                <Link to="/signup">
                  <span className="signin-text">註冊</span>
                </Link>
              </p>
              <form onSubmit={this.handleSubmit} className="signin-input">
                <input
                  placeholder="信箱"
                  id="email"
                  onChange={this.handleChange}
                  autoComplete="off"
                />
                <input
                  placeholder="密碼"
                  type="password"
                  id="password"
                  autoComplete="on"
                  onChange={this.handleChange}
                  autoComplete="off"
                />
                <div className="sign-alert">
                  {authError ? <p>{authError}</p> : <p>{errorMsg}</p>}
                </div>
                <button
                  className="signin-btn blue-btn"
                  variant="contained"
                  color="primary"
                >
                  登入
                </button>
              </form>
            </div>
          </div>
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
