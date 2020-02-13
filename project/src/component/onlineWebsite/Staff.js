import React from "react";
import staffAvatar from "../../img/staff-avatar.png";
import Button from "@material-ui/core/Button";

const Staff = ({ staff, selectStaff, selectedStaff }) => {
  let style;

  if (staff.id == selectedStaff.id) {
    style = {
      border: "2px solid rgba(81, 203, 238, 1)",
      boxShadow: "0 0 5px rgba(81, 203, 238, 1)"
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
      <img className="service-img" src={url} />
      <div className="service-row-1 service-desc">
        <p>{staff.nickname}</p>
        <p>{staff.desc}</p>
      </div>
      <div className="service-row-2"> </div>
      <div className="service-row-3 extra-info">
        <p>閱讀更多</p>
        <Button
          variant="outlined"
          color="primary"
          onClick={() => {
            selectStaff(staff.name, staff.id);
          }}
        >
          選擇
        </Button>
      </div>
    </div>
  );
};

export default Staff;
