import React from "react";
import ServiceList from "../shops/ServiceList";
import StaffList from "../shops/StaffList";
import { Link } from "react-router-dom";
import { compose } from "redux";
import { connect } from "react-redux";
import { firestoreConnect } from "react-redux-firebase";
import NoData from "./NoData";
import Loading from "../layout/loading";

const StaffService = props => {
  let staffLayout = {
    h1: "服務人員",
    button: "新建服務人員",
    link: "/createstaff"
  };
  let serviceLayout = {
    h1: "服務項目",
    button: "新建服務項目",
    link: "/createservice"
  };
  let layoutData;
  let component;
  if (props.type === "staff") {
    if (props.staffs && props.staffs.length < 1) {
      layoutData = false;
      component = <NoData type={"staff"} />;
    } else {
      layoutData = staffLayout;
      component = <StaffList staffs={props.staffs} storeId={props.auth.uid} />;
    }
  } else {
    if (props.services && props.services.length < 1) {
      layoutData = false;
      component = <NoData type={"service"} />;
    } else {
      layoutData = serviceLayout;
      component = (
        <ServiceList services={props.services} storeId={props.auth.uid} />
      );
    }
  }

  if (props.services == undefined) {
    return <Loading />;
  }
  if (layoutData == false) {
    return component;
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
const mapStateToProps = state => {
  return {
    services: state.firestore.ordered.services,
    staffs: state.firestore.ordered.staff,
    auth: state.firebase.auth
  };
};

export default compose(
  connect(mapStateToProps),
  firestoreConnect(props => {
    return [
      {
        collection: "store",
        doc: props.auth.uid,
        subcollections: [{ collection: "service" }],
        storeAs: "services"
      },
      {
        collection: "store",
        doc: props.auth.uid,
        subcollections: [{ collection: "staff" }],
        storeAs: "staffs"
      }
    ];
  })
)(StaffService);
