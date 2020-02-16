import React, { Component } from "react";
import { connect } from "react-redux";
import { createService } from "../../store/actions/serviceAction";
import { Redirect } from "react-router-dom";
import "..//../style/createstaff.css";
import staffAvatar from "../../img/staff-avatar-2.png";

class CreateService extends Component {
  state = {
    item: "",
    duration: "30",
    price: "",
    desc: "",
    image: null,
    imageSrc: staffAvatar,
    error: {
      item: false,
      price: false,
      image: false
    }
  };
  handleChange = e => {
    if (e.target.id == "price") {
      if (isNaN(e.target.value)) {
        console.log("111");
        this.setState(prevState => ({
          error: {
            ...prevState.error,
            price: true
          }
        }));
      } else {
        this.setState(prevState => ({
          error: {
            // object that we want to update
            ...prevState.error, // keep all other key-value pairs
            phone: false // update the value of specific key
          }
        }));
      }
    }
    if (e.target.id == "item") {
      this.setState(prevState => ({
        error: {
          // object that we want to update
          ...prevState.error, // keep all other key-value pairs
          item: false // update the value of specific key
        }
      }));
    }
    this.setState({
      [e.target.id]: e.target.value
    });
  };

  handleImgChange = e => {
    if (e.target.files[0]) {
      const image = e.target.files[0];
      const reader = new FileReader();

      reader.onloadend = () => {
        this.setState({
          image: image,
          imageSrc: reader.result
        });
      };
      reader.readAsDataURL(image);
      this.setState(prevState => ({
        error: {
          ...prevState.error,
          image: false
        }
      }));
    }
  };
  cancelForm = e => {
    e.preventDefault();
    this.props.history.push("/service");
  };
  handleSubmit = e => {
    e.preventDefault();

    if (this.state.item.length < 1) {
      this.setState(prevState => ({
        error: {
          ...prevState.error,
          item: true
        }
      }));
    }

    if (this.state.price.length < 1 || isNaN(this.state.price)) {
      this.setState(prevState => ({
        error: {
          ...prevState.error,
          price: true
        }
      }));
      return;
    }

    if (this.state.image == null) {
      this.setState(prevState => ({
        error: {
          ...prevState.error,
          image: true
        }
      }));
    }

    if (
      this.state.item.length > 0 &&
      this.state.price.length > 0 &&
      this.state.image !== null
    ) {
      console.log("submit", this.state);
      this.props.createService(this.state, this.props.auth.uid);
      this.props.history.push("/service");
    }
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
          autoComplete="off"
          className="staff-form"
          onSubmit={this.handleSubmit}
        >
          <div className="input-wrapper">
            <div className="form-section">
              <div className="form-item">
                <label className="required" htmlFor="name">
                  服務名稱
                  {this.state.error.item && (
                    <span className="alert-msg">請填入服務名稱</span>
                  )}
                </label>
                <input
                  placeholder="e.g. 剪髮"
                  id="item"
                  onChange={this.handleChange}
                ></input>
              </div>
              <div className="form-item">
                <label className="required" htmlFor="time">
                  服務所需時間
                </label>
                <select
                  className="all-select"
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
                  <option value="210">3.5 小時</option>
                  <option value="240">4 小時</option>
                  <option value="270">4.5 小時</option>
                  <option value="300">5 小時</option>
                  <option value="330">5.5 小時</option>
                  <option value="360">6 小時</option>
                </select>
              </div>
              <div className="form-item">
                <label className="required" htmlFor="price">
                  價格
                  {this.state.error.price && (
                    <span className="alert-msg">請檢查填入價格</span>
                  )}
                </label>
                <span className="currencyinput">
                  <span className="dollarsign">$</span>
                  <input id="price" onChange={this.handleChange}></input>
                </span>
              </div>
              <div className="form-item logo-wrapper">
                <label className="required" htmlFor="desc">
                  服務項目照片
                  {this.state.error.image && (
                    <span className="alert-msg">請上傳服務項目照片</span>
                  )}
                </label>
                <div className="logo-circle">
                  <img
                    className="store-logo"
                    src={this.state.imageSrc}
                    alt="home"
                  />
                </div>
                <p>建議尺寸 180 x 180</p>
                <input
                  onChange={this.handleImgChange}
                  type="file"
                  name="pic"
                  accept="image/*"
                />
              </div>
            </div>
            <div className="form-section">
              <div className="form-item">
                <label htmlFor="desc">服務說明</label>
                <textarea
                  rows="11"
                  id="desc"
                  onChange={this.handleChange}
                  placeholder="e.g. 剪髮..."
                ></textarea>
              </div>
            </div>
          </div>
          <div className="form-button-wrapper">
            <button onClick={this.cancelForm} className="cancel-staff-button">
              取消
            </button>
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
