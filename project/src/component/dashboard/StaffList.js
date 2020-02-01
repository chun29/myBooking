import React from "react";

const StaffList = ({ staffs }) => {
  return (
    <div>
      <h1>員工列表</h1>
      {staffs &&
        staffs.map((staff, i) => {
          return (
            <p key={i}>
              姓名：{staff.name} 敘述:
              {staff.content}
            </p>
          );
        })}
    </div>
  );
};

export default StaffList;
