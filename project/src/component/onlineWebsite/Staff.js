import React from "react";
import storePhoto from "../../img/banner.jpg";

const Staff = ({ staff, selectStaff, selectedStaff }) => {
  let style;

  if (staff.id == selectedStaff) {
    style = {
      border: "2px solid rgba(81, 203, 238, 1)",
      boxShadow: "0 0 5px rgba(81, 203, 238, 1)"
    };
  }

  return (
    <div className="service" style={style}>
      <img src={storePhoto} />
      <div className="service-desc">
        <h3>{staff.nickname}</h3>
        <p>{staff.desc}</p>

        <button
          onClick={() => {
            selectStaff(staff.name, staff.id);
          }}
        >
          選擇
        </button>
      </div>
    </div>
  );
};

export default Staff;
