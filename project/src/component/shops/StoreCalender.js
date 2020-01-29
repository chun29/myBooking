import React from "react";

const StoreCalender = ({ staffs }) => {
  return (
    <div>
      <p>Owners List</p>
      <h1>工作人員：</h1>
      {staffs &&
        staffs.map((staff, i) => {
          return <h1 key={i}>{staff.name}</h1>;
        })}
    </div>
  );
};

export default StoreCalender;
