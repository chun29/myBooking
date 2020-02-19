import React, { Component } from "react";
import { compose } from "redux";
import { connect } from "react-redux";
import { onlineSetup } from "../../store/actions/onlineAction";
import "..//../style/createstaff.css";
import storelogo from "../../img/store-logo.png";
import storeBanner from "../../img/store-banner.png";
import Checkbox from "@material-ui/core/Checkbox";

class BookingWebSetup extends Component {
  state = {
    storeName: "",
    storeAddress: "",
    storePhone: "",
    bookOpenDay: "365",
    bookCloseDay: "0",
    storeDesc: "",
    bookingNote: "",
    bookingIsOpen: true,
    logoImage: null,
    logoSrc: storelogo,
    bannerImage: null,
    bannerSrc: storeBanner,
    error: {
      storePhone: false,
      storeName: false,
      storeAddress: false,
      logoImage: false,
      bannerImage: false,
      storeDesc: false
    }
  };

  handleChange = e => {
    if (e.target.id == "storePhone") {
      if (isNaN(e.target.value)) {
        this.setState(prevState => ({
          error: {
            // object that we want to update
            ...prevState.error, // keep all other key-value pairs
            storePhone: true // update the value of specific key
          }
        }));
      } else {
        this.setState(prevState => ({
          error: {
            // object that we want to update
            ...prevState.error, // keep all other key-value pairs
            storePhone: false // update the value of specific key
          }
        }));
      }
    }
    if (e.target.id == "storeName") {
      this.setState(prevState => ({
        error: {
          // object that we want to update
          ...prevState.error, // keep all other key-value pairs
          storeName: false // update the value of specific key
        }
      }));
    }
    if (e.target.id == "storeAddress") {
      this.setState(prevState => ({
        error: {
          // object that we want to update
          ...prevState.error, // keep all other key-value pairs
          storeAddress: false // update the value of specific key
        }
      }));
    }
    if (e.target.id == "storeDesc") {
      this.setState(prevState => ({
        error: {
          // object that we want to update
          ...prevState.error, // keep all other key-value pairs
          storeDesc: false // update the value of specific key
        }
      }));
    }
    this.setState({
      [e.target.id]: e.target.value
    });
  };

  handleLogoChange = e => {
    if (e.target.files[0]) {
      const image = e.target.files[0];
      const reader = new FileReader();

      reader.onloadend = () => {
        this.setState({
          logoImage: image,
          logoSrc: reader.result
        });
      };
      reader.readAsDataURL(image);
      this.setState(prevState => ({
        error: {
          // object that we want to update
          ...prevState.error, // keep all other key-value pairs
          logoImage: false // update the value of specific key
        }
      }));
    }
  };
  handleBannerChange = e => {
    if (e.target.files[0]) {
      const image = e.target.files[0];
      const reader = new FileReader();

      reader.onloadend = () => {
        this.setState({
          bannerImage: image,
          bannerSrc: reader.result
        });
      };

      reader.readAsDataURL(image);

      this.setState(prevState => ({
        error: {
          // object that we want to update
          ...prevState.error, // keep all other key-value pairs
          bannerImage: false // update the value of specific key
        }
      }));
    }
  };
  handleClick = e => {
    this.setState({
      bookingIsOpen: !this.state.bookingIsOpen
    });
  };

  handleSubmit = e => {
    e.preventDefault();
    if (this.state.storeName.length < 1) {
      this.setState(prevState => ({
        error: {
          // object that we want to update
          ...prevState.error, // keep all other key-value pairs
          storeName: true // update the value of specific key
        }
      }));
    }
    if (this.state.storeAddress.length < 1) {
      this.setState(prevState => ({
        error: {
          // object that we want to update
          ...prevState.error, // keep all other key-value pairs
          storeAddress: true // update the value of specific key
        }
      }));
    }
    if (this.state.storePhone.length < 1) {
      this.setState(prevState => ({
        error: {
          // object that we want to update
          ...prevState.error, // keep all other key-value pairs
          storePhone: true // update the value of specific key
        }
      }));
    }
    if (this.state.storeDesc.length < 1) {
      this.setState(prevState => ({
        error: {
          // object that we want to update
          ...prevState.error, // keep all other key-value pairs
          storeDesc: true // update the value of specific key
        }
      }));
    }
    if (this.state.logoImage == null) {
      this.setState(prevState => ({
        error: {
          // object that we want to update
          ...prevState.error, // keep all other key-value pairs
          logoImage: true // update the value of specific key
        }
      }));
    }
    if (this.state.bannerImage == null) {
      this.setState(prevState => ({
        error: {
          // object that we want to update
          ...prevState.error, // keep all other key-value pairs
          bannerImage: true // update the value of specific key
        }
      }));
    }

    if (
      this.state.storeName.length > 0 &&
      this.state.storeAddress.length > 0 &&
      this.state.storePhone.length > 0 &&
      this.state.logoImage !== null &&
      this.state.bannerImage !== null &&
      this.state.storeDesc.length > 0
    ) {
      this.props.onlineSetup(this.state, this.props.auth.uid);
      this.props.history.push("/dashboard");
    }
  };
  handleCancel = e => {
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
                <label className="required" htmlFor="name">
                  店家名稱
                  {this.state.error.storeName && (
                    <span className="alert-msg">名稱請填寫完整</span>
                  )}
                </label>
                <input
                  placeholder="e.g. AppWorks School"
                  id="storeName"
                  onChange={this.handleChange}
                ></input>
              </div>
              <div className="form-item">
                <label className="required" htmlFor="date">
                  店家住址
                  {this.state.error.storeAddress && (
                    <span className="alert-msg">地址請填寫完整</span>
                  )}
                </label>
                <input
                  placeholder="請填入完整地址"
                  id="storeAddress"
                  onChange={this.handleChange}
                ></input>
              </div>
              <div className="form-item">
                <label className="required" htmlFor="time">
                  聯絡電話
                  {this.state.error.storePhone && (
                    <span className="alert-msg">請填入完整電話</span>
                  )}
                </label>
                <input
                  placeholder="e.g. 02555888"
                  id="storePhone"
                  onChange={this.handleChange}
                ></input>
              </div>
              <div className="form-item logo-wrapper">
                <label className="required" htmlFor="desc">
                  公司標誌
                  {this.state.error.logoImage && (
                    <span className="alert-msg">請上傳公司標誌</span>
                  )}
                </label>
                <div className="logo-circle">
                  <img
                    className="store-logo"
                    src={this.state.logoSrc}
                    alt="home"
                  />
                </div>
                <p>建議尺寸 180 x 180</p>
                <input
                  type="file"
                  name="pic"
                  accept="image/*"
                  onChange={this.handleLogoChange}
                />
              </div>
              <div className="form-item logo-wrapper">
                <label className="required" htmlFor="desc">
                  公司主視覺圖片
                  {this.state.error.bannerImage && (
                    <span className="alert-msg">請上傳公司圖片</span>
                  )}
                </label>
                <div className="banner-wrapper">
                  <img
                    className="store-banner"
                    src={this.state.bannerSrc}
                    alt="home"
                  />
                </div>
                <p>建議尺寸 1920 x 140</p>
                <input
                  type="file"
                  name="pic"
                  accept="image/*"
                  onChange={this.handleBannerChange}
                />
              </div>
            </div>
            <div className="form-section">
              <div className="form-item">
                <label htmlFor="desc">
                  最早預約時間 (例如:兩個月前開放預約)
                </label>
                <select
                  className="all-select"
                  id="bookOpenDay"
                  value={this.state.startDay}
                  onChange={this.handleChange}
                >
                  <option value="365">不限制</option>
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
                  className="all-select"
                  value={this.state.closeDay}
                  onChange={this.handleChange}
                  id="bookCloseDay"
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

              <div className="form-item">
                <label className="required" htmlFor="storeDesc">
                  店家描述
                  {this.state.error.storeDesc && (
                    <span className="alert-msg">請填入店家描述</span>
                  )}
                </label>
                <textarea
                  rows="11"
                  id="storeDesc"
                  onChange={this.handleChange}
                ></textarea>
              </div>
              <div className="form-item">
                <label htmlFor="bookingNote">預約須知</label>
                <textarea
                  rows="11"
                  id="bookingNote"
                  onChange={this.handleChange}
                ></textarea>
              </div>

              <div className="form-item">
                <label htmlFor="desc">
                  開放線上預約
                  <Checkbox
                    checked={this.state.bookingIsOpen}
                    onChange={this.handleClick}
                    color="primary"
                    value="secondary"
                    inputProps={{ "aria-label": "secondary checkbox" }}
                  />
                </label>
              </div>
            </div>
          </div>

          <div className="form-button-wrapper">
            <button onClick={this.handleCancel} className="cancel-staff-button">
              取消
            </button>
            <button className="create-staff-button">儲存</button>
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
    onlineSetup: (online, id) => dispatch(onlineSetup(online, id))
  };
};

export default compose(connect(mapStateToProps, mapDispatchToProps))(
  BookingWebSetup
);
