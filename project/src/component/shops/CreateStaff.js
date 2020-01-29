import React, { Component } from "react";
import { connect } from "react-redux";
import { createStaff } from "../../store/actions/staffsAction";
import { Redirect } from "react-router-dom";

class CreateStaff extends Component {
  state = {
    name: "",
    content: ""
  };
  handleChange = e => {
    this.setState({
      [e.target.id]: e.target.value
    });
  };
  handleSubmit = e => {
    e.preventDefault();
    this.props.createStaff(this.state);
    console.log(this.state);
  };
  render() {
    const { auth } = this.props;
    if (!auth.uid) return <Redirect to="signin" />;
    return (
      <div>
        <div className="signin-header">
          <h1>MyBooking</h1>
          <button className="signup-btn">登入</button>
        </div>
        <div className="signin-container">
          <h1>新增工作人員</h1>

          <form className="signin-input" onSubmit={this.handleSubmit}>
            <div>
              <label htmlFor="name">姓名</label>
              <input
                placeholder="姓名"
                id="name"
                onChange={this.handleChange}
              ></input>
            </div>

            <div>
              <label htmlFor="content">說明</label>
              <textarea id="content" onChange={this.handleChange}></textarea>
            </div>

            <button className="signin-btn">新增</button>
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
    createStaff: staff => dispatch(createStaff(staff))
  };
};
export default connect(mapStateToProps, mapDispatchToProps)(CreateStaff);
