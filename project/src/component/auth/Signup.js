import React, { Component } from "react";
import "../../style/login.css";
import { Redirect } from "react-router-dom";
import { connect } from "react-redux";
import { signUp } from "../../store/actions/authAction";
import { Link } from "react-router-dom";
import { Logo } from "../layout/Layout";

class Signup extends Component {
  state = {
    name: "",
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
    if (this.state.name.length < 1 || this.state.email.length < 1) {
      this.setState({
        error: "請檢查輸入內容"
      });
      return;
    } else {
      if (this.state.password.length < 6) {
        this.setState({
          error: "密碼至少六位數"
        });
        return;
      } else {
        this.props.signUp(this.state);
      }
    }
  };

  componentDidUpdate(prevProps) {
    if (this.props.authError !== prevProps.authError) {
      this.setState({
        error: this.props.authError
      });
    }
  }
  render() {
    const { authError, auth } = this.props;
    const errorMsg = this.state.error;
    if (auth.uid) return <Redirect to="dashboard" />;
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
                  placeholder="密碼 ( 至少六位數 )"
                  type="password"
                  id="password"
                  onChange={this.handleChange}
                  autoComplete="off"
                ></input>
                <div className="sign-alert">
                  <p>{errorMsg}</p>
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
    authError: state.auth.authError
  };
};

const mapDispatchToProps = dispatch => {
  return {
    signUp: newUser => dispatch(signUp(newUser))
  };
};
export default connect(mapStateToProps, mapDispatchToProps)(Signup);
