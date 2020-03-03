import React, { Component } from "react";
import { Notifications, TodayBookings } from "./Notifications";
import { connect } from "react-redux";
import { firestoreConnect } from "react-redux-firebase";
import { compose } from "redux";
import DashboardNav from "./DashboardNav";
import DashboardHeader from "./DashboardHeader";
import "../../style/dashboard.css";

class Dashboard extends Component {
  constructor(props) {
    super(props);
    this.state = {
      guideOpen: false
    };
  }
  render() {
    const { notifications, bookings } = this.props;
    function bookedDay() {
      const date = new Date();
      const mm = date.getMonth() + 1;
      const dd = date.getDate();

      return [
        date.getFullYear(),
        (mm > 9 ? "" : "0") + mm,
        (dd > 9 ? "" : "0") + dd
      ].join("");
    }

    function getTodayBookings(allBookings) {
      let todayBookings = [];
      if (allBookings) {
        allBookings.map(booking => {
          if (booking.bookedDay === bookedDay()) {
            todayBookings.push(booking);
          }
        });
      }
      return todayBookings;
    }
    const todayBookings = getTodayBookings(bookings);

    return (
      <div className="layout">
        <div className="left">
          <DashboardNav index={0} />
        </div>
        <div className="right">
          <div className="header">
            <DashboardHeader />
          </div>
          <div className="main">
            <div className="main-wrapper">
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
      </div>
    );
  }
}

const mapStateToProps = state => {
  return {
    auth: state.firebase.auth,
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
        collection: "owners",
        doc: props.auth.uid
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
