import React, { Component } from "react";
import { connect } from "react-redux";
import { createStaff } from "../../store/actions/staffsAction";
import camera from "../../img/camera.png";
import "..//../style/createstaff.css";
import uploader from "../../img/upload.png";

class CreateStaff extends Component {
  state = {
    name: "",
    phone: "",
    email: "",
    nickname: "",
    desc: "",
    color: "#bbc1e8",
    image: "",
    url: null,
    error: {
      name: false,
      phone: false,
      nickname: false
    }
  };
  handleChange = e => {
    if (e.target.id == "phone") {
      if (isNaN(e.target.value)) {
        this.setState(prevState => ({
          error: {
            ...prevState.error,
            phone: true
          }
        }));
      } else {
        this.setState(prevState => ({
          error: {
            ...prevState.error,
            phone: false
          }
        }));
      }
    }
    if (e.target.id == "name") {
      this.setState(prevState => ({
        error: {
          ...prevState.error,
          name: false
        }
      }));
    }

    if (e.target.id == "nickname") {
      this.setState(prevState => ({
        error: {
          ...prevState.error,
          nickname: false
        }
      }));
    }
    this.setState({
      [e.target.id]: e.target.value
    });
  };

  cancelForm = e => {
    e.preventDefault();
    this.props.history.push("/staff");
  };

  handleColorChange = color => {
    this.setState({
      color: color
    });
  };
  handleImgChange = e => {
    if (e.target.files[0]) {
      const image = e.target.files[0];
      if (image.size > 2000000) {
        alert("檔案請勿超過2MB");
        return;
      }
      const reader = new FileReader();

      reader.onloadend = () => {
        this.setState({
          image: image,
          url: reader.result
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

  handleSubmit = e => {
    e.preventDefault();

    if (this.state.name.length < 1) {
      this.setState(prevState => ({
        error: {
          ...prevState.error,
          name: true
        }
      }));
    }

    if (this.state.phone.length < 1) {
      this.setState(prevState => ({
        error: {
          ...prevState.error,
          phone: true
        }
      }));
    }

    if (this.state.nickname.length < 1) {
      this.setState(prevState => ({
        error: {
          ...prevState.error,
          nickname: true
        }
      }));
    }

    if (
      this.state.name.length > 0 &&
      this.state.nickname.length > 0 &&
      this.state.phone.length > 0 &&
      !isNaN(this.state.phone)
    ) {
      console.log("submit", this.state);
      this.props.createStaff(this.state, this.props.auth.uid);
      this.props.history.push("/staff");
    }
  };

  render() {
    const colors = ["#bbc1e8", "#a5dff8", "#ffbf69", "#ff9cbb", "#a6e5bd"];
    const showPic = this.state.url ? this.state.url : uploader;
    return (
      <div className="createstaff-wrapper">
        <div className="createstaff-header">
          <h1>新增工作人員</h1>
        </div>
        <form
          onSubmit={this.handleSubmit}
          autoComplete="off"
          className="staff-form"
        >
          <div className="input-wrapper">
            <div className="form-section">
              <div className="form-item">
                <label className="required" htmlFor="name">
                  姓名
                  {this.state.error.name && (
                    <span className="alert-msg">名稱請填寫完整</span>
                  )}
                </label>

                <input
                  placeholder="e.g. 王大明"
                  id="name"
                  onChange={this.handleChange}
                ></input>
              </div>
              <div className="form-item">
                <label className="required" htmlFor="nickname">
                  暱稱 (顯示在預訂網站上的名稱)
                  {this.state.error.nickname && (
                    <span className="alert-msg">請填入暱稱</span>
                  )}
                </label>

                <input
                  placeholder="e.g. 小明"
                  id="nickname"
                  onChange={this.handleChange}
                ></input>
              </div>
              <div className="form-item">
                <label className="required" htmlFor="phone">
                  聯絡電話
                  {this.state.error.phone && (
                    <span className="alert-msg">請填入完整聯絡電話</span>
                  )}
                </label>

                <input
                  placeholder="e.g. 0900123456"
                  id="phone"
                  onChange={this.handleChange}
                ></input>
              </div>
              <div className="form-item">
                <label htmlFor="email">信箱</label>
                <input
                  placeholder="e.g. ming@gmail.com"
                  id="email"
                  onChange={this.handleChange}
                ></input>
              </div>

              <div className="form-item">
                <label htmlFor="email">預約顯示顏色</label>
                <div className="color-area">
                  {colors.map((color, i) => {
                    let addClass = "";
                    if (this.state.color == color) {
                      addClass = "selected";
                    }
                    return (
                      <div
                        key={i}
                        style={{ backgroundColor: color }}
                        onClick={() => {
                          this.handleColorChange(color);
                        }}
                        className={`color ${addClass}`}
                      ></div>
                    );
                  })}
                </div>
              </div>
            </div>
            <div className="form-section">
              <div className="form-item logo-wrapper">
                <label htmlFor="pic">
                  大頭貼照
                  <div className="staff-pic-circle">
                    <img className="staff-pic" src={showPic} alt="" />
                    <div className="img-description">
                      <img src={camera} />
                      新增
                    </div>
                  </div>
                  <p>建議尺寸 180 x 180</p>
                  <input
                    onChange={this.handleImgChange}
                    type="file"
                    name="pic"
                    id="pic"
                    accept="image/*"
                    style={{ display: "none" }}
                  />
                </label>
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
          <div className="form-button-wrapper">
            <button onClick={this.cancelForm} className="cancel-staff-button">
              取消
            </button>
            <button type="submit" className="create-staff-button">
              新增
            </button>
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
    createStaff: (staff, id) => dispatch(createStaff(staff, id))
  };
};
export default connect(mapStateToProps, mapDispatchToProps)(CreateStaff);
