import React, { Component } from "react";
import { connect } from "react-redux";
import staffAvatar from "../../img/staff-avatar.png";
import edit from "../../img/edit.png";
import deleteImg from "../../img/delete.png";
import { deleteStaff, editStaff } from "../../store/actions/staffsAction";
import StaffForm from "../shops/StaffForm";

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
  editStaffShow = (staff, boolean) => {
    this.setState({
      edit: boolean,
      staff
    });
  };

  deleteStaff = (storeId, staffId) => {
    const r = confirm("是否確認要刪除？");
    if (r == true) {
      this.props.deleteStaff(storeId, staffId);
    }
  };

  render() {
    const { staffs, storeId } = this.props;
    if (this.state.edit === true) {
      return (
        <StaffForm
          staffInfo={this.state.staff}
          storeId={this.props.storeId}
          handleEditMode={this.editStaffShow}
        />
      );
    }

    return (
      <div className="table-container">
        <table className="table-wrapper">
          <thead>
            <tr>
              <th colSpan="2">服務人員</th>
              <th className="desc-width">描述</th>
              <th>電話</th>
              <th>信箱</th>
              <th className="icon-width">編輯</th>
              <th className="icon-width">刪除</th>
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
                    <th className="staff-avatar staff-img">
                      <img className="staff-avatar-img" src={url} />
                    </th>
                    <td className="title">{staff.name}</td>
                    <td datatitle="描述">{staff.desc}</td>
                    <td datatitle="電話">{staff.phone}</td>
                    <td datatitle="信箱">{staff.email}</td>

                    <td datatitle="編輯" className="icon-edit">
                      <img
                        onClick={() => {
                          this.editStaffShow(staff, true);
                        }}
                        className="edit-img"
                        src={edit}
                      />
                    </td>
                    <td datatitle="刪除" className="icon-edit">
                      <img
                        onClick={() => {
                          this.deleteStaff(storeId, staff.id);
                        }}
                        className="edit-img"
                        src={deleteImg}
                      />
                    </td>
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
    deleteStaff: (storeId, staffId) => dispatch(deleteStaff(storeId, staffId))
  };
};

export default connect(null, mapDispatchToProps)(StaffList);
