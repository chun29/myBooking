import React from "react";
import staffAvatar from "../../img/staff-avatar.png";

const Staff = ({ staff, selectStaff, selectedStaff }) => {
  let style;

  if (staff.id == selectedStaff.id) {
    style = {
      border: "2px solid #3d5afe",
      boxShadow: "0 0 5px #3d5afe"
    };
  }

  let url;
  if (staff.url == null) {
    url = staffAvatar;
  } else {
    url = staff.url;
  }

  return (
    <div className="service" style={style}>
      <div className="online-staff-bg">
        <img className="staff-img" src={url} />
      </div>

      <div className="service-row-1 service-desc">
        <p className="service-header">{staff.nickname}</p>
        <p className="service-text">{staff.desc}</p>
      </div>
      <div className="service-row-2"> </div>

      <button
        className="blue-btn"
        onClick={() => {
          selectStaff(staff.name, staff.id, staff.nickname);
        }}
      >
        選擇
      </button>
    </div>
  );
};

export default Staff;
