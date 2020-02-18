import React, { Component } from "react";
import { Notifications, TodayBookings } from "./Notifications";
import { connect } from "react-redux";
import { firestoreConnect } from "react-redux-firebase";
import { compose } from "redux";
import DashboardNav from "./DashboardNav";
import DashboardHeader from "./DashboardHeader";
import { Redirect } from "react-router-dom";
import "../../style/dashboard.css";

class Dashboard extends Component {
  render() {
    const { auth, profile, notifications, bookings } = this.props;

    Date.prototype.yyyymmdd = function() {
      var mm = this.getMonth() + 1;
      var dd = this.getDate();

      return [
        this.getFullYear(),
        (mm > 9 ? "" : "0") + mm,
        (dd > 9 ? "" : "0") + dd
      ].join("");
    };

    var date = new Date();
    const today = date.yyyymmdd();
    let todayBookings = [];
    if (bookings) {
      bookings.map(booking => {
        if (booking.bookedDay === today) {
          todayBookings.push(booking);
        }
      });
    }

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
              <TodayBookings
                todayBookings={todayBookings}
                staffs={this.props.staff}
                services={this.props.service}
              />
            </div>

            <div className="dashboard-item-container  dashboard-item2">
              <Notifications notifications={notifications} />
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
    notifications: state.firestore.ordered.notifications,
    bookings: state.firestore.ordered.booking,
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
        doc: props.auth.uid,
        subcollections: [{ collection: "notifications" }],
        storeAs: "notifications"
      },
      {
        collection: "store",
        doc: props.auth.uid,
        subcollections: [{ collection: "booking" }],
        storeAs: "booking"
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
)(Dashboard);
