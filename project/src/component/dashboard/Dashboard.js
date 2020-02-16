import React, { Component } from "react";
import { Notifications, TodayBookings } from "./Notifications";

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
    const { auth, profile, notifications } = this.props;
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
          <div className="dashboard-right-container">
            <div className="dashboard-item-container dashboard-item1">
              <Notifications notifications={notifications} />
            </div>

            <div className="dashboard-item-container  dashboard-item2">
              <TodayBookings />
              {/* <Link to="/createbooking">
                <button>新增預約</button>
              </Link>
              <Link to="/createstaff">
                <button>新增工作人員</button>
              </Link> */}
            </div>
          </div>
        </div>
      </div>
    );
  }
}

const mapStateToProps = state => {
  return {
    auth: state.firebase.auth,
    profile: state.firebase.profile,
    notifications: state.firestore.ordered.notifications
  };
};

export default compose(
  connect(mapStateToProps),
  firestoreConnect([
    { collection: "notifications", limit: 5, orderBy: ["time", "desc"] }
  ])
)(Dashboard);
