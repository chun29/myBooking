import React, { Component } from "react";
import { connect } from "react-redux";
import staffAvatar from "../../img/staff-avatar.png";
import edit from "../../img/edit.png";
import deleteImg from "../../img/delete.png";
import { deleteStaff } from "../../store/actions/staffsAction";

class StaffList extends Component {
  deleteStaff = (storeId, staffId) => {
    this.props.deleteStaff(storeId, staffId);
  };
  render() {
    const { staffs, storeId } = this.props;
    return (
      <React.Fragment>
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
                  <img className="edit-img" src={edit}></img>
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
      </React.Fragment>
    );
  }
}

const mapDispatchToProps = dispatch => {
  return {
    deleteStaff: (storeId, staffId) => dispatch(deleteStaff(storeId, staffId))
  };
};

export default connect(null, mapDispatchToProps)(StaffList);
