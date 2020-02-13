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
    desc: "",
    color: "#bbc1e8",
    image: null,
    url: ""
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
    console.log(e.target.files[0]);
    if (e.target.files[0]) {
      const image = e.target.files[0];
      this.setState(() => ({ image }));
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
              <div className="form-item staff-avatar-wrapper">
                <label htmlFor="photo">圖片</label>
                <input type="file" onChange={this.handleImgChange} />
              </div>
              <div className="form-item">
                <label htmlFor="email">行事曆上預約顯示顏色</label>
                <div className="color-area">
                  {colors.map(color => {
                    let addClass = "";
                    if (this.state.color == color) {
                      addClass = "selected";
                    }
                    return (
                      <div
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
