import React, { Component } from "react";
import { compose } from "redux";
import { connect } from "react-redux";
import { firestoreConnect } from "react-redux-firebase";
import DashboardNav from "./DashboardNav";
import DashboardHeader from "./DashboardHeader";
import "../../style/staff.css";
import { Link } from "react-router-dom";
import ServiceList from "../shops/ServiceList";

class Service extends Component {
  render() {
    const services = this.props.services ? (
      <ServiceList services={this.props.services} />
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
                <h1>服務項目</h1>
              </div>
              <div className="staff-main-wrapper">
                <div className="button-wrapper">
                  <Link to="/createservice">
                    <button className="add-staff">新建服務項目</button>
                  </Link>
                </div>
                <table className="staff-table-wrapper">
                  <thead>
                    <tr>
                      <th>編輯</th>
                      <th>項目</th>
                      <th>時間</th>
                      <th>價格</th>
                      <th>描述</th>
                    </tr>
                  </thead>
                  <tbody>{services}</tbody>
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
    services: state.firestore.ordered.services,
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
        subcollections: [{ collection: "service" }],
        storeAs: "services"
      }
    ];
  })
)(Service);
