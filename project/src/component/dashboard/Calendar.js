import React, { Component } from "react";
import { compose } from "redux";
import { connect } from "react-redux";
import { firestoreConnect } from "react-redux-firebase";
import DashboardNav from "./DashboardNav";
import DashboardHeader from "./DashboardHeader";
import "../../style/staff.css";
import { Link } from "react-router-dom";
import CalendarPart from "./CalendarPart";

class Calendar extends Component {
  state = {
    showMsg: false,
    bookingMsg: null
  };
  componentDidUpdate(prevProps) {
    if (this.props.bookingMsg.time !== prevProps.bookingMsg.time) {
      this.setState({
        showMsg: true,
        bookingMsg: this.props.bookingMsg.bookingMsg
      }),
        setTimeout(
          function() {
            this.setState({
              showMsg: false
            });
          }.bind(this),
          3000
        );
    }
  }
  render() {
    const { bookings } = this.props;
    const bookingMsg = this.state.bookingMsg;

    return (
      <div className="layout">
        <div className="left">
          <DashboardNav index={1} />
        </div>
        <div className="right">
          <div className="header">
            <DashboardHeader />
          </div>
          <div className="main">
            <div className="main-wrapper">
              <div className="all-right-container-calendar">
                <div className="staff-wrapper">
                  {/* <div className="staff-header">
                    <h1>行事曆</h1>
                  </div> */}

                  <div className="staff-main-wrapper">
                    <div className="booking-button-wrapper">
                      <Link to="/createbooking">
                        <button className="add-booking">新增預約</button>
                      </Link>
                    </div>
                    <CalendarPart
                      bookings={bookings}
                      staffs={this.props.staff}
                      services={this.props.service}
                      storeID={this.props.auth.uid}
                    />
                    {this.state.showMsg && (
                      <div className="dashboard-msg">
                        {bookingMsg ? <p>{bookingMsg}</p> : null}
                      </div>
                    )}
                  </div>
                </div>
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
    service: state.firestore.ordered.service,
    bookingMsg: state.booking
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
