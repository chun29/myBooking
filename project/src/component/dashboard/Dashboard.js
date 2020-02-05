import React, { Component } from "react";
import Notifications from "./Notifications";
import StoreCalender from "../shops/StoreCalender";
import { Link } from "react-router-dom";
import { connect } from "react-redux";
import { firestoreConnect } from "react-redux-firebase";
import { compose } from "redux";
import DashboardNav from "./DashboardNav";
import DashboardHeader from "./DashboardHeader";
import { Redirect } from "react-router-dom";
import "../../style/dashboard.css";

class Dashboard extends Component {
  render() {
    const { auth, profile } = this.props;
    let user = "";
    if (profile.name) {
      user = profile.name.charAt(0).toUpperCase();
    }
    const userName = auth.uid ? user : "";

    if (!auth.uid) return <Redirect to="/signIn" />;
    return (
      <div className="dashboard">
        <div className="top">
          <DashboardHeader userName={userName} />
        </div>
        <div className="down">
          <div className="left-container">
            <DashboardNav />
          </div>
          <div className="right-container">
            <div className="dashboard-item-container">
              <Notifications />
            </div>
            <div className="dashboard-item-container">
              <StoreCalender />
            </div>
            <div className="dashboard-item-container">
              <Link to="/createbooking">
                <button>新增預約</button>
              </Link>
            </div>
            <div className="dashboard-item-container">
              <Link to="/createstaff">
                <button>新增工作人員</button>
              </Link>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

const mapStateToProps = state => {
  return {
    staffs: state.staff.staffs,
    bookings: state.firestore.ordered.booking,
    auth: state.firebase.auth,
    profile: state.firebase.profile
  };
};

export default compose(
  connect(mapStateToProps),
  firestoreConnect(props => {
    return [
      {
        collection: "store",
        doc: props.auth.uid,
        subcollections: [{ collection: "booking" }],
        storeAs: "booking"
      }
    ];
  })
)(Dashboard);
