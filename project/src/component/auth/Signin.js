import React from "react";
import "../../style/login.css";
import { connect } from "react-redux";
import { signIn, authMsg } from "../../store/actions/authAction";
import { Redirect } from "react-router-dom";
import { Logo } from "../layout/Layout";
import { validateEmail } from "../../lib";

class SignIn extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
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
    if (validate === false) {
      this.props.authMsg("請輸入有效的信箱格式");
      return;
    }
    if (this.state.password.length < 6) {
      this.props.authMsg("輸入的密碼需超過 6 位數");
      return;
    }
    this.props.signIn(this.state);
    this.props.authMsg("登入中");
  };
  render() {
    const { authError, auth } = this.props;

    if (auth.uid && auth.emailVerified) {
      return <Redirect to="dashboard" />;
    }

    return (
      <div className="signin-wrapper">
        <div className="signin-header">
          <Logo />

          <div className="signup-btn-wrapper">
            <div className="plus-img"></div>
            <button
              onClick={() => (window.location = "/signup")}
              className="signup-btn"
            >
              註冊
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
                第一次使用嗎？
                <span
                  onClick={() => (window.location = "/signup")}
                  className="signin-text"
                >
                  註冊
                </span>
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
                  onChange={this.handleChange}
                  autoComplete="off"
                />
                <div className="test-account">
                  <p>測試信箱：testmybookingtw@gmail.com</p>
                  <p>密碼：123456</p>
                </div>
                <div className="sign-alert">
                  <p>{authError}</p>
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
    signIn: creds => dispatch(signIn(creds)),
    authMsg: msg => dispatch(authMsg(msg))
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(SignIn);
