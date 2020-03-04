import React from "react";
import DashboardNav from "./DashboardNav";
import DashboardHeader from "./DashboardHeader";
import addstaff from "../../img/addstaff.png";
import addservice from "../../img/addservice.png";
import { Link } from "react-router-dom";
const staffLayout = {
  index: 4,
  h1: "服務人員",
  h3: "沒有服務人員",
  img: addstaff,
  p: "還沒有服務人員，請先新增",
  button: "新建服務人員",
  link: "/createstaff"
};
const serviceLayout = {
  index: 3,
  h1: "服務項目",
  h3: "沒有服務項目",
  img: addservice,
  p: "還沒有服務項目，請先新增",
  button: "新建服務項目",
  link: "/createservice"
};
export const NoData = props => {
  let layoutData;
  if (props.type === "staff") {
    layoutData = staffLayout;
  } else {
    layoutData = serviceLayout;
  }
  return (
    <div className="layout">
      <div className="left">
        <DashboardNav index={layoutData.index} />
      </div>
      <div className="right">
        <div className="header">
          <DashboardHeader />
        </div>
        <div className="main">
          <div className="main-wrapper">
            <div className="all-right-container-service">
              <div className="staff-wrapper">
                <div className="staff-header">
                  <h1>{layoutData.h1}</h1>
                </div>
                <div className="staff-main-wrapper">
                  <div className="empty-wrapper">
                    <img src={layoutData.img} className="addservice" />
                    <h3>{layoutData.h3}</h3>
                    <p>{layoutData.p}</p>
                    <div className="button-wrapper">
                      <Link to={layoutData.link}>
                        <button className="green-btn add-staff">
                          {layoutData.button}
                        </button>
                      </Link>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
