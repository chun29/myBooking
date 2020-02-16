import React, { Component } from "react";
import { connect } from "react-redux";
import { createStaff } from "../../store/actions/staffsAction";
import { Redirect } from "react-router-dom";
import "..//../style/createstaff.css";
import staffAvatar from "../../img/staff-avatar-2.png";

class CreateStaff extends Component {
  state = {
    name: "",
    phone: "",
    email: "",
    nickname: "",
    desc: "",
    color: "#bbc1e8",
    image: null,
    imageSrc: staffAvatar,
    url: "",
    error: {
      name: false,
      phone: false,
      image: false,
      nickname: false
    }
  };
  handleChange = e => {
    if (e.target.id == "phone") {
      if (isNaN(e.target.value)) {
        console.log("111");
        this.setState(prevState => ({
          error: {
            // object that we want to update
            ...prevState.error, // keep all other key-value pairs
            phone: true // update the value of specific key
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
    if (e.target.id == "name") {
      this.setState(prevState => ({
        error: {
          // object that we want to update
          ...prevState.error, // keep all other key-value pairs
          name: false // update the value of specific key
        }
      }));
    }

    if (e.target.id == "nickname") {
      this.setState(prevState => ({
        error: {
          // object that we want to update
          ...prevState.error, // keep all other key-value pairs
          nickname: false // update the value of specific key
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
          // object that we want to update
          ...prevState.error, // keep all other key-value pairs
          image: false // update the value of specific key
        }
      }));
    }
  };

  // handleImgChange = e => {
  //   console.log(e.target.files[0]);
  //   if (e.target.files[0]) {
  //     const image = e.target.files[0];
  //     this.setState(() => ({ image }));
  //   }
  // };
  handleSubmit = e => {
    e.preventDefault();

    if (this.state.name.length < 1) {
      this.setState(prevState => ({
        error: {
          // object that we want to update
          ...prevState.error, // keep all other key-value pairs
          name: true // update the value of specific key
        }
      }));
    }

    if (this.state.phone.length < 1) {
      this.setState(prevState => ({
        error: {
          // object that we want to update
          ...prevState.error, // keep all other key-value pairs
          phone: true // update the value of specific key
        }
      }));
    }

    if (this.state.image == null) {
      this.setState(prevState => ({
        error: {
          // object that we want to update
          ...prevState.error, // keep all other key-value pairs
          image: true // update the value of specific key
        }
      }));
    }

    if (this.state.nickname.length < 1) {
      this.setState(prevState => ({
        error: {
          // object that we want to update
          ...prevState.error, // keep all other key-value pairs
          nickname: true // update the value of specific key
        }
      }));
    }

    if (
      this.state.name.length > 0 &&
      this.state.nickname.length > 0 &&
      this.state.phone.length > 0 &&
      this.state.image !== null
    ) {
      console.log("submit", this.state);
      this.props.createStaff(this.state, this.props.auth.uid);
      this.props.history.push("/staff");
    }
  };

  render() {
    const { auth } = this.props;
    if (!auth.uid) return <Redirect to="signin" />;
    const colors = ["#bbc1e8", "#a5dff8", "#ffbf69", "#ff9cbb", "#a6e5bd"];

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
                  姓名{" "}
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
                <label className="required" htmlFor="phone">
                  聯絡電話{" "}
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

              <div className="form-item logo-wrapper">
                <label className="required" htmlFor="desc">
                  大頭貼照{" "}
                  {this.state.error.image && (
                    <span className="alert-msg">請上傳大頭貼照</span>
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

              <div className="form-item staff-avatar-wrapper">
                <label htmlFor="photo">圖片</label>
                <input type="file" onChange={this.handleImgChange} />
              </div>
              <div className="form-item">
                <label htmlFor="email">行事曆上預約顯示顏色</label>
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
              <div className="form-item">
                <label className="required" htmlFor="nickname">
                  暱稱 (顯示在預訂網站上的名稱){" "}
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
