import React from "react";
import "../../style/dashboardheader.css";
import { Logo, UserAvatar } from "../layout/Layout";
import { connect } from "react-redux";
import { Link } from "react-router-dom";
import { compose } from "redux";
import { firestoreConnect } from "react-redux-firebase";
import weblink from "../../img/link.png";
import Guide from "../../component/layout/Guide";

const DashboardHeader = ({ auth, profile, store, staff, service }) => {
  let user = "";
  if (profile.name) {
    user = profile.name.charAt(0).toUpperCase();
  }
  const userName = auth.uid ? user : "";

  let onlineSetup = false;
  if (store && store[0] && store[0].online) {
    if (
      store[0].online.bookingIsOpen == false ||
      (store && store[0] && store[0].workday === undefined) ||
      (staff && staff.length < 1) ||
      (service && service.length < 1)
    ) {
      onlineSetup = false;
    } else if (
      store[0].online.bookingIsOpen == true &&
      store[0].workday !== null &&
      staff &&
      staff.length > 0 &&
      service &&
      service.length > 0
    ) {
      onlineSetup = true;
    }
  }
  const link = "/booking/" + auth.uid;
  const newClass = onlineSetup ? "blue" : "red";
  const text = onlineSetup ? "已上線" : "關閉中";
  const weblinkimg = onlineSetup ? (
    <Link to={link}>
      <img className="weblinkimg" src={weblink} alt=""></img>
    </Link>
  ) : (
    ""
  );

  return (
    <React.Fragment>
      <div className="dashboard-header">
        <Logo />
        <div className="right-container">
          <div className="online-container">
            <div className={`color-sign ${newClass}`}></div>
            <div className="online-info">
              <p>線上預約網站</p>
              <p className="online-setup">{text}</p>
            </div>
            {weblinkimg}
          </div>

          <UserAvatar userName={userName} />
        </div>
      </div>
      <Guide />
    </React.Fragment>
  );
};

const mapStateToProps = state => {
  return {
    auth: state.firebase.auth,
    profile: state.firebase.profile,
    store: state.firestore.ordered.store,
    staff: state.firestore.ordered.staff,
    service: state.firestore.ordered.service
  };
};

export default compose(
  connect(mapStateToProps),
  firestoreConnect(props => {
    return [
      {
        collection: "store",
        doc: props.auth.uid
      },
      {
        collection: "store",
        doc: props.auth.uid,
        subcollections: [{ collection: "staff" }],
        storeAs: "staff"
      },
      {
        collection: "store",
        doc: props.auth.uid,
        subcollections: [{ collection: "service" }],
        storeAs: "service"
      }
    ];
  })
)(DashboardHeader);
