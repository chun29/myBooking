import React, { Component } from "react";
import Notifications from "./Notifications";
import StoreCalender from "../shops/StoreCalender";
import { Link } from "react-router-dom";
import { connect } from "react-redux";
import { firestoreConnect } from "react-redux-firebase";
import { compose } from "redux";
import { Redirect } from "react-router-dom";
import "../../style/dashboard.css";
class Dashboard extends Component {
  render() {
    console.log(this.props);
    const { staffs, auth } = this.props;
    if (!auth.uid) return <Redirect to="/signIn" />;
    return (
      <div className="dashboard">
        <div className="left-container">This is left navbar</div>
        <div className="right-container">
          <Notifications />
          <StoreCalender staffs={staffs} />
          <Link to="/createstaff">新增工作人員</Link>
        </div>
      </div>
    );
  }
}

const mapStateToProps = state => {
  console.log(state);
  return {
    staffs: state.firestore.ordered.owners,
    auth: state.firebase.auth
  };
};

export default compose(
  connect(mapStateToProps),
  firestoreConnect([
    {
      collection: "owners"
    }
  ])
)(Dashboard);
