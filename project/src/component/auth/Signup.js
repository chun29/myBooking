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
    this.props.signUp(this.state);
  };
  render() {
    const { auth } = this.props;
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
                  placeholder="密碼"
                  type="password"
                  id="password"
                  onChange={this.handleChange}
                  autoComplete="off"
                ></input>
                <button className="signin-btn">免費註冊</button>
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
    auth: state.firebase.auth
  };
};

const mapDispatchToProps = dispatch => {
  return {
    signUp: newUser => dispatch(signUp(newUser))
  };
};
export default connect(mapStateToProps, mapDispatchToProps)(Signup);
