import React, { Component } from "react";
import { compose } from "redux";
import { connect } from "react-redux";
import { firestoreConnect } from "react-redux-firebase";
import DashboardNav from "./DashboardNav";
import DashboardHeader from "./DashboardHeader";
import "../../style/staff.css";
import { Link } from "react-router-dom";
import BookingList from "../shops/BookingList";
import CalendarPart from "./CalendarPart";

class Calendar extends Component {
  render() {
    const { bookings } = this.props;
    const bookingList =
      this.props.staff && this.props.service ? (
        <BookingList
          bookings={bookings}
          staffs={this.props.staff}
          services={this.props.service}
        />
      ) : (
        "Loading"
      );

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
            <div className="staff-wrapper">
              <div className="staff-header">
                <h1>行事曆</h1>
              </div>

              <div className="staff-main-wrapper">
                <div className="button-wrapper">
                  <Link to="/createbooking">
                    <button className="add-staff">新增預約</button>
                  </Link>
                </div>
                <CalendarPart
                  bookings={bookings}
                  staffs={this.props.staff}
                  services={this.props.service}
                />

                <table className="staff-table-wrapper">
                  <thead>
                    <tr>
                      <th>編輯</th>
                      <th>預約 ID</th>
                      <th>預約日期</th>
                      <th>顧客姓名</th>
                      <th>服務人員</th>
                      <th>服務</th>
                      <th>描述</th>
                    </tr>
                  </thead>
                  {/* <tbody>{bookingList}</tbody> */}
                </table>
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
    staff: state.firestore.ordered.staff,
    auth: state.firebase.auth,
    bookings: state.firestore.ordered.booking,
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
        subcollections: [{ collection: "staff" }],
        storeAs: "staff"
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
        subcollections: [{ collection: "service" }],
        storeAs: "service"
      }
    ];
  })
)(Calendar);
