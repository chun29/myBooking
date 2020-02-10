import React, { Component } from "react";
import { connect } from "react-redux";
import { createService } from "../../store/actions/serviceAction";
import { Redirect } from "react-router-dom";
import "..//../style/createstaff.css";

class CreateService extends Component {
  state = {
    item: "",
    duration: "30",
    price: "",
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
    this.props.createService(this.state, this.props.auth.uid);
    this.props.history.push("/service");
  };

  render() {
    const { auth } = this.props;
    if (!auth.uid) return <Redirect to="signin" />;
    return (
      <div className="createstaff-wrapper">
        <div className="createstaff-header">
          <h1>新增服務項目</h1>
        </div>
        <form
          autocomplete="off"
          className="staff-form"
          onSubmit={this.handleSubmit}
        >
          <div className="input-wrapper">
            <div className="form-section">
              <div className="form-item">
                <label htmlFor="name">項目</label>
                <input
                  placeholder="e.g. 剪髮"
                  id="item"
                  onChange={this.handleChange}
                ></input>
              </div>
              <div className="form-item">
                <label htmlFor="time">服務所需時間</label>
                <select
                  value={this.state.time}
                  onChange={this.handleChange}
                  id="duration"
                >
                  <option value="30">30 分鐘</option>
                  <option value="60">1 小時</option>
                  <option value="90">1.5 小時</option>
                  <option value="120">2 小時</option>
                  <option value="150">2.5 小時</option>
                  <option value="180">3 小時</option>
                </select>
              </div>
              <div className="form-item">
                <label htmlFor="price">價格</label>
                <input
                  placeholder="e.g. 2000元"
                  id="price"
                  onChange={this.handleChange}
                ></input>
              </div>
            </div>
            <div className="form-section">
              <div className="form-item">
                <label htmlFor="desc">說明</label>
                <textarea
                  rows="11"
                  id="desc"
                  onChange={this.handleChange}
                  placeholder="e.g. 剪髮..."
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
  return {
    auth: state.firebase.auth
  };
};

const mapDispatchToProps = dispatch => {
  return {
    createService: (service, id) => dispatch(createService(service, id))
  };
};
export default connect(mapStateToProps, mapDispatchToProps)(CreateService);
