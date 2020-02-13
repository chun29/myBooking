import React from "react";
import staffAvatar from "../../img/staff-avatar.png";
import edit from "../../img/edit.png";

const StaffList = ({ staffs }) => {
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
};

export default StaffList;
