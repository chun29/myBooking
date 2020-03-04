import React, { Component } from "react";
import { connect } from "react-redux";
import staffAvatar from "../../img/staff-avatar.png";
import edit from "../../img/edit.png";
import deleteImg from "../../img/delete.png";
import { deleteStaff, editStaff } from "../../store/actions/staffsAction";
import uploader from "../../img/upload.png";
import camera from "../../img/camera.png";

class StaffList extends Component {
  constructor(props) {
    super(props);
    this.state = {
      edit: false,
      error: {
        name: false,
        phone: false,
        nickname: false
      }
    };
  }
  editStaffShow = staff => {
    this.setState({
      edit: true,
      staff
    });
  };
  cancelForm = e => {
    this.setState({
      edit: false
    });
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
      staff: {
        ...this.state.staff,
        [e.target.id]: e.target.value
      }
    });
  };
  handleColorChange = color => {
    this.setState({
      staff: {
        ...this.state.staff,
        color: color
      }
    });
  };
  handleImgChange = e => {
    if (e.target.files[0]) {
      const image = e.target.files[0];
      const reader = new FileReader();

      reader.onloadend = () => {
        this.setState({
          staff: {
            ...this.state.staff,
            url: reader.result,
            image
          }
        });
      };
      reader.readAsDataURL(image);
    }
  };

  handleSubmit = e => {
    e.preventDefault();
    const staffInfo = this.state.staff;

    if (staffInfo.name.length < 1) {
      this.setState(prevState => ({
        error: {
          ...prevState.error,
          name: true
        }
      }));
    }

    if (staffInfo.phone.length < 1) {
      this.setState(prevState => ({
        error: {
          ...prevState.error,
          phone: true
        }
      }));
    }

    if (staffInfo.nickname.length < 1) {
      this.setState(prevState => ({
        error: {
          ...prevState.error,
          nickname: true
        }
      }));
    }

    if (
      staffInfo.name.length > 0 &&
      staffInfo.nickname.length > 0 &&
      staffInfo.phone.length > 0
    ) {
      this.props.editStaff(this.props.storeId, staffInfo.id, staffInfo);
      this.setState({
        edit: false
      });
    }
  };

  deleteStaff = (storeId, staffId) => {
    const r = confirm("是否確認要刪除？");
    if (r == true) {
      this.props.deleteStaff(storeId, staffId);
    }
  };
  render() {
    const { staffs, storeId } = this.props;
    const colors = ["#bbc1e8", "#a5dff8", "#ffbf69", "#ff9cbb", "#a6e5bd"];
    if (this.state.edit === true) {
      const staffInfo = this.state.staff;
      return (
        <div className="edit-staff-wrapper">
          <div className="createstaff-header">
            <h1>編輯工作人員</h1>
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
                    id="name"
                    onChange={this.handleChange}
                    value={staffInfo.name}
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
                    id="nickname"
                    onChange={this.handleChange}
                    value={staffInfo.nickname}
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
                    value={staffInfo.phone}
                    id="phone"
                    onChange={this.handleChange}
                  ></input>
                </div>
                <div className="form-item">
                  <label htmlFor="email">信箱</label>
                  <input
                    value={staffInfo.email}
                    id="email"
                    onChange={this.handleChange}
                  ></input>
                </div>

                <div className="form-item">
                  <label htmlFor="email">預約顯示顏色</label>
                  <div className="color-area">
                    {colors.map((color, i) => {
                      let addClass = "";
                      if (staffInfo.color == color) {
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
                  <div className="form-item-title">大頭貼照</div>
                  <div className="staff-pic-circle">
                    <label htmlFor="avatar">
                      <img
                        className="staff-pic"
                        src={staffInfo.url ? staffInfo.url : uploader}
                        alt=""
                      />
                      <div className="img-description">
                        {" "}
                        <img src={camera} />
                        新增
                      </div>
                    </label>
                  </div>
                  <input
                    onChange={this.handleImgChange}
                    type="file"
                    name="pic"
                    accept="image/*"
                    id="avatar"
                    style={{ display: "none" }}
                  />
                  <p>建議尺寸 180 x 180</p>
                </div>

                <div className="form-item">
                  <label htmlFor="desc">說明</label>
                  <textarea
                    rows="11"
                    id="desc"
                    onChange={this.handleChange}
                    placeholder="e.g. 服務熱心、業績第一名"
                    value={staffInfo.desc}
                  ></textarea>
                </div>
              </div>
            </div>
            <div className="form-button-wrapper">
              <button onClick={this.cancelForm} className="cancel-staff-button">
                取消
              </button>
              <button type="submit" className="create-staff-button">
                儲存
              </button>
            </div>
          </form>
        </div>
      );
    }

    return (
      <div className="staff-table-container">
        <table className="staff-table-wrapper">
          <thead>
            <tr>
              <th className="icon-width">刪除</th>
              <th className="staff-img-th icon-width">編輯</th>
              <th>照片</th>
              <th>姓名</th>
              <th>電話</th>
              <th>Email</th>
              <th className="desc-width">描述</th>
            </tr>
          </thead>
          <tbody>
            {staffs &&
              staffs.map(staff => {
                let url;
                if (staff.url == null) {
                  url = staffAvatar;
                } else {
                  url = staff.url;
                }

                return (
                  <tr key={staff.id}>
                    <td className="icon-edit">
                      <img
                        onClick={() => {
                          this.deleteStaff(storeId, staff.id);
                        }}
                        className="edit-img"
                        src={deleteImg}
                      ></img>
                    </td>
                    <td className="icon-edit">
                      <img
                        onClick={() => {
                          this.editStaffShow(staff);
                        }}
                        className="edit-img"
                        src={edit}
                      ></img>
                    </td>
                    <td className="staff-avatar">
                      <img className="staff-avatar-img" src={url} />
                    </td>
                    <td className="staff-name">{staff.name}</td>
                    <td className="staff-phone">{staff.phone}</td>
                    <td className="staff-email">{staff.email}</td>
                    <td className="staff-desc">{staff.desc}</td>
                  </tr>
                );
              })}
          </tbody>
        </table>
      </div>
    );
  }
}

const mapDispatchToProps = dispatch => {
  return {
    deleteStaff: (storeId, staffId) => dispatch(deleteStaff(storeId, staffId)),
    editStaff: (storeId, staffId, staffInfo) =>
      dispatch(editStaff(storeId, staffId, staffInfo))
  };
};

export default connect(null, mapDispatchToProps)(StaffList);
