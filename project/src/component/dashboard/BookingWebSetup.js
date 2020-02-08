import React, { Component } from "react";
import { compose } from "redux";
import { connect } from "react-redux";
import { onlineSetup } from "../../store/actions/onlineAction";
import "..//../style/createstaff.css";

class BookingWebSetup extends Component {
  state = {
    storeName: "",
    storeAddress: "",
    storePhone: "",
    startDay: "",
    closeDay: "",
    storeDesc: "",
    bookingDesc: "",
    storeIsClose: false
  };

  handleChange = e => {
    this.setState({
      [e.target.id]: e.target.value
    });
  };
  handleSubmit = e => {
    e.preventDefault();
    this.props.onlineSetup(this.state, this.props.auth.uid);
    this.props.history.push("/calendar");
  };

  render() {
    return (
      <div className="createstaff-wrapper">
        <div className="createstaff-header">
          <h1>線上預約設定</h1>
        </div>
        <form className="staff-form" onSubmit={this.handleSubmit}>
          <div className="input-wrapper">
            <div className="form-section">
              <div className="form-item">
                <label htmlFor="name">店家名稱</label>
                <input
                  placeholder="e.g. AppWorks School"
                  id="storeName"
                  onChange={this.handleChange}
                ></input>
              </div>
              <div className="form-item">
                <label htmlFor="date">店家住址</label>
                <input
                  placeholder="請填入完整地址"
                  id="storeAddress"
                  onChange={this.handleChange}
                ></input>
              </div>
              <div className="form-item">
                <label htmlFor="time">聯絡電話</label>
                <input
                  placeholder="e.g. AppWorks School"
                  id="storeName"
                  onChange={this.handleChange}
                ></input>
              </div>
              <div className="form-item">
                <label htmlFor="desc">最早可在服務前多久預約</label>
                <select>
                  <option>1週</option>
                  <option>2週</option>
                  <option>3週</option>
                  <option>4週</option>
                  <option>5週</option>
                  <option>6週</option>
                  <option>7週</option>
                  <option>8週</option>
                  <option>9週</option>
                  <option>10週</option>
                  <option>11週</option>
                  <option>12週</option>
                </select>
              </div>
              <div className="form-item">
                <label htmlFor="desc">最晚可在服務前多久預約</label>
                <select>
                  <option>1天</option>
                  <option>2天</option>
                  <option>3天</option>
                  <option>4天</option>
                  <option>5天</option>
                  <option>6天</option>
                  <option>1週</option>
                  <option>2週</option>
                  <option>3週</option>
                  <option>4週</option>
                </select>
              </div>
            </div>
            <div className="form-section">
              <div className="form-item">
                <label htmlFor="desc">店家描述</label>
                <textarea
                  rows="11"
                  id="desc"
                  onChange={this.handleChange}
                ></textarea>
              </div>
              <div className="form-item">
                <label htmlFor="desc">預約須知</label>
                <textarea
                  rows="11"
                  id="desc"
                  onChange={this.handleChange}
                ></textarea>
              </div>

              <div className="form-item">
                <label htmlFor="desc">
                  暫時關閉線上預約 <span>□</span>
                </label>
              </div>
            </div>
          </div>

          <div className="button-wrapper">
            <button className="cancel-staff-button">取消</button>
            <button className="create-staff-button">儲存</button>
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
    onlineSetup: (online, id) => dispatch(onlineSetup(online, id))
  };
};

export default compose(connect(mapStateToProps, mapDispatchToProps))(
  BookingWebSetup
);
