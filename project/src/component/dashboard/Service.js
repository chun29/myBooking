import React, { Component } from "react";
import { compose } from "redux";
import { connect } from "react-redux";
import { firestoreConnect } from "react-redux-firebase";
import DashboardNav from "./DashboardNav";
import DashboardHeader from "./DashboardHeader";
import "../../style/staff.css";
import { Link } from "react-router-dom";
import ServiceList from "../shops/ServiceList";
import addservice from "../../img/addservice.png";

class Service extends Component {
  state = {
    showMsg: false,
    serviceMsg: null
  };
  componentDidUpdate(prevProps) {
    // 常見用法（別忘了比較 prop）：
    if (this.props.serviceMsg !== prevProps.serviceMsg) {
      this.setState({
        showMsg: true,
        serviceMsg: this.props.serviceMsg
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
    const serviceMsg = this.state.serviceMsg;
    if (this.props.services && this.props.services.length < 1) {
      return (
        <div className="dashboard">
          <div className="top">
            <DashboardHeader />
          </div>
          <div className="down">
            <div className="left-container">
              <DashboardNav index={3} />
            </div>

            <div className="all-right-container">
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
                  <h1>尚未有服務創建</h1>
                  <img src={addservice} className="addservice" />
                  {this.state.showMsg && (
                    <div className="dashboard-msg">
                      {serviceMsg ? <p>{serviceMsg}</p> : null}
                    </div>
                  )}
                </div>
              </div>
            </div>
          </div>
        </div>
      );
    }
    const services = this.props.services && (
      <ServiceList
        services={this.props.services}
        storeId={this.props.auth.uid}
      />
    );
    return (
      <div className="dashboard">
        <div className="top">
          <DashboardHeader />
        </div>
        <div className="down">
          <div className="left-container">
            <DashboardNav index={3} />
          </div>

          <div className="all-right-container">
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
                {services}
                {this.state.showMsg && (
                  <div className="dashboard-msg">
                    {serviceMsg ? <p>{serviceMsg}</p> : null}
                  </div>
                )}
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
    auth: state.firebase.auth,
    serviceMsg: state.serviceReducer.serviceMsg
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
