import React from "react";
import ServiceList from "../shops/ServiceList";
import StaffList from "../shops/StaffList";
import { Link } from "react-router-dom";

const staffLayout = {
  h1: "服務人員",
  button: "新建服務人員",
  link: "/createstaff"
};
const serviceLayout = {
  h1: "服務項目",
  button: "新建服務項目",
  link: "/createservice"
};

export const StaffService = props => {
  console.log(props);
  let layoutData;
  let component;
  if (props.type === "staff") {
    layoutData = staffLayout;
    component = <StaffList staffs={props.staff} storeId={props.storeId} />;
  } else {
    layoutData = serviceLayout;
  }
  return (
    <div className="staff-wrapper">
      <div className="staff-header">
        <h1>{layoutData.h1}</h1>
      </div>
      <div className="staff-main-wrapper">
        <div className="button-wrapper">
          <Link to={layoutData.link}>
            <button className="add-staff green-btn">{layoutData.button}</button>
          </Link>
        </div>
        {component}
      </div>
    </div>
  );
};
