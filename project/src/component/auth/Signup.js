import React, { Component } from "react";
import "../../style/login.css";
import { Redirect } from "react-router-dom";
import { connect } from "react-redux";
import { signUp, authMsg } from "../../store/actions/authAction";
import { Link } from "react-router-dom";
import { Logo } from "../layout/Layout";
import ConfirmEmail from "./ConfirmEmail";

class Signup extends Component {
  state = {
    name: "",
    email: "",
    password: ""
  };
  handleChange = e => {
    this.setState({
      [e.target.id]: e.target.value
    });
    this.props.authMsg("");
  };
  handleSubmit = e => {
    e.preventDefault();

    const validateEmail = email => {
      var re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
      return re.test(String(email).toLowerCase());
    };
    const email = this.state.email;
    const validate = validateEmail(email);
    if (this.state.name.length < 1) {
      this.props.authMsg("請檢查輸入的姓名");
      return;
    }
    if (validate === false) {
      this.props.authMsg("請檢查輸入的信箱");
      return;
    }
    if (this.state.password.length < 6) {
      this.props.authMsg("請檢查輸入的密碼");
      return;
    }
    this.props.authMsg("註冊中");
    this.props.signUp(this.state, () => this.props.history.push("/signIn"));
  };

  render() {
    const { authError, auth, sendEmail } = this.props;

    if (auth.uid && auth.emailVerified) {
      return <Redirect to="dashboard" />;
    }
    if (sendEmail === true) {
      return <ConfirmEmail />;
    }
    return (
      <div className="signin-wrapper">
        <div className="signin-header">
          <Logo />
          <Link to="/signin">
            <div className="signup-btn-wrapper">
              <div className="left-arrow-img"></div>
              <button className="signup-btn">登入</button>
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
                我已經有帳號
                <Link to="/signin">
                  <span> 登入</span>
                </Link>
              </p>
              <form className="signin-input" onSubmit={this.handleSubmit}>
                <input
                  placeholder="姓名"
                  id="name"
                  onChange={this.handleChange}
                  autoComplete="off"
                ></input>
                <input
                  placeholder="信箱"
                  id="email"
                  onChange={this.handleChange}
                  autoComplete="off"
                ></input>
                <input
                  placeholder="密碼"
                  type="password"
                  id="password"
                  onChange={this.handleChange}
                  autoComplete="off"
                ></input>
                <div className="sign-alert">
                  <p>{authError}</p>
                </div>
                <button className="signin-btn blue-btn">免費註冊</button>
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
    auth: state.firebase.auth,
    authError: state.auth.authError,
    sendEmail: state.auth.sendEmail
  };
};

const mapDispatchToProps = dispatch => {
  return {
    signUp: (newUser, callback) => dispatch(signUp(newUser, callback)),
    authMsg: msg => dispatch(authMsg(msg))
  };
};
export default connect(mapStateToProps, mapDispatchToProps)(Signup);
