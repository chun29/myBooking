import React from "react";
import { compose } from "redux";
import { connect } from "react-redux";
import { firestoreConnect } from "react-redux-firebase";
import { Notifications, TodayBookings } from "./Notifications";
import DashboardNav from "./DashboardNav";
import DashboardHeader from "./DashboardHeader";
import { todayStoreFormat } from "../../lib";
import "../../style/dashboard.css";

function Dashboard({ notifications, bookings, service, staff }) {
  function getTodayBookings(allBookings) {
    let todayBookings = [];
    if (allBookings) {
      allBookings.map(booking => {
        if (booking.bookedDay === todayStoreFormat) {
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
                staffs={staff}
                services={service}
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
