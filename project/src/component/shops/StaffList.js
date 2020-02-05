import React from "react";

const StaffList = ({ staffs }) => {
  return (
    <React.Fragment>
      {staffs &&
        staffs.map(staff => {
          return (
            <tr key={staff.id}>
              <td className="icon-edit">✍︎</td>
              <td className="staff-avatar">👩‍🦰</td>
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
