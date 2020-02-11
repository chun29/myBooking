import React, { Component } from "react";
import { compose } from "redux";
import { connect } from "react-redux";
import { onlineSetup } from "../../store/actions/onlineAction";
import "..//../style/createstaff.css";
import storelogo from "../../img/store-logo.png";

class BookingWebSetup extends Component {
  state = {
    storeName: "",
    storeAddress: "",
    storePhone: "",
    openBookingTime: "0",
    closeBookingTime: "0",
    storeDesc: "",
    bookingNote: "",
    storeIsClose: false,
    image: null
  };

  handleChange = e => {
    this.setState({
      [e.target.id]: e.target.value
    });
  };
  handleImgChange = e => {
    if (e.target.files[0]) {
      const image = e.target.files[0];
      this.setState(() => ({ image }));
    }
  };
  handleSubmit = e => {
    e.preventDefault();
    this.props.onlineSetup(this.state, this.props.auth.uid);
    this.props.history.push("/dashboard");
  };

  render() {
    return (
      <div className="createstaff-wrapper">
        <div className="createstaff-header">
          <h1>線上預約網站設定</h1>
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
              <div className="form-item logo-wrapper">
                <label htmlFor="desc">公司標誌</label>
                <div className="logo-circle">
                  <img className="store-logo" src={storelogo} alt="home" />
                </div>
                <p>建議尺寸 180 x 180</p>
                <input
                  type="file"
                  name="pic"
                  accept="image/*"
                  onChange={this.handleImgChange}
                />
              </div>
              <div className="form-item logo-wrapper">
                <label htmlFor="desc">公司主視覺</label>
                <div className="logo-circle">
                  <img className="store-logo" src={storelogo} alt="home" />
                </div>
                <p>建議尺寸 1920 x 140</p>
                <input
                  type="file"
                  name="pic"
                  accept="image/*"
                  onChange={this.handleImgChange}
                />
              </div>
              <div className="form-item">
                <label htmlFor="desc">
                  最早預約時間 (例如:兩個月前開放預約)
                </label>
                <select
                  id="openBookingTime"
                  value={this.state.openBookingTime}
                  onChange={this.handleChange}
                >
                  <option value="0">不限制</option>
                  <option value="7">1週</option>
                  <option value="14">2週</option>
                  <option value="21">3週</option>
                  <option value="28">4週</option>
                  <option value="35">5週</option>
                  <option value="42">6週</option>
                  <option value="49">7週</option>
                  <option value="56">8週</option>
                  <option value="63">9週</option>
                  <option value="70">10週</option>
                  <option value="77">11週</option>
                  <option value="84">12週</option>
                </select>
              </div>
              <div className="form-item">
                <label htmlFor="desc">
                  最晚預約時間 (例如:最晚須於一天之前預約)
                </label>
                <select
                  value={this.state.closeBookingTime}
                  onChange={this.handleChange}
                  id="closeBookingTime"
                >
                  <option value="0">不限制</option>
                  <option value="1">1天</option>
                  <option value="2">2天</option>
                  <option value="3">3天</option>
                  <option value="4">4天</option>
                  <option value="5">5天</option>
                  <option value="6">6天</option>
                  <option value="7">1週</option>
                  <option value="14">2週</option>
                  <option value="21">3週</option>
                  <option value="28">4週</option>
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
                <label htmlFor="desc">暫時關閉線上預約</label>
                <label class="switch">
                  <input type="checkbox" />
                  <span class="slider round"></span>
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
