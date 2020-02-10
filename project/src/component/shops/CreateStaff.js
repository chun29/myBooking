import React, { Component } from "react";
import { connect } from "react-redux";
import { createStaff } from "../../store/actions/staffsAction";
import { Redirect } from "react-router-dom";
import "..//../style/createstaff.css";

class CreateStaff extends Component {
  state = {
    name: "",
    phone: "",
    email: "",
    nickname: "",
    desc: ""
  };
  handleChange = e => {
    this.setState({
      [e.target.id]: e.target.value
    });
  };
  handleSubmit = e => {
    e.preventDefault();
    console.log("submit", this.state);
    this.props.createStaff(this.state, this.props.auth.uid);
    this.props.history.push("/staff");
  };

  // fileSelectHandler = event => {
  //   this.setState({
  //     avatar: event.target.files[0]
  //   });
  // };
  render() {
    const { auth } = this.props;
    if (!auth.uid) return <Redirect to="signin" />;
    return (
      <div className="createstaff-wrapper">
        <div className="createstaff-header">
          <h1>新增工作人員</h1>
        </div>
        <form
          autocomplete="off"
          className="staff-form"
          onSubmit={this.handleSubmit}
        >
          <div className="input-wrapper">
            <div className="form-section">
              <div className="form-item">
                <label htmlFor="name">姓名</label>
                <input
                  placeholder="e.g. 王大明"
                  id="name"
                  onChange={this.handleChange}
                ></input>
              </div>
              <div className="form-item">
                <label htmlFor="phone">手機</label>
                <input
                  placeholder="e.g. 0900123456"
                  id="phone"
                  onChange={this.handleChange}
                ></input>
              </div>
              <div className="form-item">
                <label htmlFor="email">Email</label>
                <input
                  placeholder="e.g. ming@gmail.com"
                  id="email"
                  onChange={this.handleChange}
                ></input>
              </div>
              <div className="form-item staff-avatar">
                <label htmlFor="photo">圖片</label>
                <input
                  type="file"
                  // onChange={this.fileSelectHandler}
                />
              </div>
            </div>
            <div className="form-section">
              <div className="form-item">
                <label htmlFor="nickname">暱稱 (顯示在預訂網站上的名稱)</label>
                <input
                  placeholder="e.g. 小明"
                  id="nickname"
                  onChange={this.handleChange}
                ></input>
              </div>

              <div className="form-item">
                <label htmlFor="desc">說明</label>
                <textarea
                  rows="11"
                  id="desc"
                  onChange={this.handleChange}
                  placeholder="e.g. 服務熱心、業績第一名"
                ></textarea>
              </div>
            </div>
          </div>
          <div className="button-wrapper">
            <button className="cancel-staff-button">取消</button>
            <button className="create-staff-button">新增</button>
          </div>
        </form>
      </div>
    );
  }
}

const mapStateToProps = state => {
  console.log(state);
  return {
    auth: state.firebase.auth
  };
};

const mapDispatchToProps = dispatch => {
  return {
    createStaff: (staff, id) => dispatch(createStaff(staff, id))
  };
};
export default connect(mapStateToProps, mapDispatchToProps)(CreateStaff);
