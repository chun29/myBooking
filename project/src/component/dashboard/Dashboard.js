import React, { Component } from "react";
import Notifications from "./Notifications";
import StoreCalender from "../shops/StoreCalender";
import StaffList from "../dashboard/StaffList";
import BookingList from "../shops/BookingList";
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
    const { staffs, auth, bookings } = this.props;
    if (!auth.uid) return <Redirect to="/signIn" />;
    return (
      <div className="dashboard">
        <div className="top">
          <DashboardHeader />
        </div>
        <div className="down">
          <div className="left-container">
            <DashboardNav />
          </div>
          <div className="right-container">
            <Notifications />
            <br />
            <StoreCalender />
            <br />
            <BookingList bookings={bookings} />
            <Link to="/createbooking">
              <button>新增預約</button>
            </Link>
            <br />
            <div>
              <StaffList staffs={staffs} />
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
    owners: state.firestore.ordered.owners,
    auth: state.firebase.auth
  };
};

export default compose(
  connect(mapStateToProps),
  firestoreConnect([
    {
      collection: "owners"
    },
    {
      collection: "booking"
    }
  ])
)(Dashboard);
