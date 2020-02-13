import React, { Component } from "react";
import { compose } from "redux";
import { connect } from "react-redux";
import { firestoreConnect } from "react-redux-firebase";
import DashboardNav from "./DashboardNav";
import DashboardHeader from "./DashboardHeader";
import "../../style/staff.css";
import { Link } from "react-router-dom";
import StaffList from "../shops/StaffList";

class Staff extends Component {
  render() {
    const staffs = this.props.staff ? (
      <StaffList staffs={this.props.staff} />
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
                <h1>服務人員</h1>
              </div>
              <div className="staff-main-wrapper">
                <div className="button-wrapper">
                  <Link to="/createstaff">
                    <button className="add-staff">新建服務人員</button>
                  </Link>
                </div>
                <table className="staff-table-wrapper">
                  <thead>
                    <tr>
                      <th></th>
                      <th className="staff-img-th"></th>

                      <th>姓名</th>
                      <th>電話</th>
                      <th>Email</th>
                      <th>描述</th>
                    </tr>
                  </thead>
                  <tbody>{staffs}</tbody>
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
        subcollections: [{ collection: "staff" }],
        storeAs: "staff"
      }
    ];
  })
)(Staff);
