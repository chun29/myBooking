import React, { Component } from "react";
import "../../style/login.css";
import { Redirect } from "react-router-dom";
import { connect } from "react-redux";
import { signUp } from "../../store/actions/authAction";
import { Link } from "react-router-dom";

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
      <div>
        <div className="signin-header">
          <Link to="/">
            <h1>MyBooking</h1>
          </Link>
          <button className="signup-btn">登入</button>
        </div>
        <div className="signin-container">
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
            ></input>
            <input
              placeholder="Email"
              id="email"
              onChange={this.handleChange}
            ></input>
            <input
              placeholder="Password"
              id="password"
              onChange={this.handleChange}
            ></input>
            <button className="signin-btn">免費註冊</button>
          </form>
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
