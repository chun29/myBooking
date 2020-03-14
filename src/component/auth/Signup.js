import React from "react";
import { Redirect } from "react-router-dom";
import { connect } from "react-redux";
import { Logo } from "../layout/Layout";
import ConfirmEmail from "./ConfirmEmail";
import { signUp, authMsg } from "../../store/actions/authAction";
import { validateEmail } from "../../lib";
import "../../style/login.css";

class Signup extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      name: "",
      email: "",
      password: ""
    };
  }

  handleChange = e => {
    this.setState({
      [e.target.id]: e.target.value
    });
    this.props.authMsg("");
  };
  handleSubmit = e => {
    e.preventDefault();

    const validate = validateEmail(this.state.email);
    if (this.state.name.length < 1) {
      this.props.authMsg("請檢查輸入的姓名");
      return;
    }
    if (validate === false) {
      this.props.authMsg("請輸入有效的信箱格式");
      return;
    }
    if (this.state.password.length < 6) {
      this.props.authMsg("輸入的密碼需超過 6 位數");
      return;
    }
    this.props.authMsg("註冊中");
    this.props.signUp(this.state);
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

          <div className="signup-btn-wrapper">
            <div className="left-arrow-img"></div>
            <button
              onClick={() => (window.location = "/signin")}
              className="signup-btn"
            >
              登入
            </button>
          </div>
        </div>
        <div className="signin-down">
          <div className="signin-left"></div>
          <div className="signin-right">
            <div className="signin-container">
              <div className="signin-logo"></div>
              <h1>預約管理系統</h1>
              <p>
                我已經有帳號
                <span onClick={() => (window.location = "/signin")}> 登入</span>
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
    signUp: newUser => dispatch(signUp(newUser)),
    authMsg: msg => dispatch(authMsg(msg))
  };
};
export default connect(mapStateToProps, mapDispatchToProps)(Signup);
