import React, { Component } from "react";
import { compose } from "redux";
import { connect } from "react-redux";
import { firestoreConnect } from "react-redux-firebase";
import DashboardNav from "./DashboardNav";
import DashboardHeader from "./DashboardHeader";
import "../../style/staff.css";
import { Link } from "react-router-dom";
import ServiceList from "../shops/ServiceList";
import { NoData } from "./NoData";

class Service extends Component {
  constructor(props) {
    super(props);
    this.state = {
      showMsg: false,
      serviceMsg: null
    };
  }

  componentDidUpdate(prevProps) {
    if (this.props.serviceMsg.time !== prevProps.serviceMsg.time) {
      this.setState({
        showMsg: true,
        serviceMsg: this.props.serviceMsg.serviceMsg
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
      return <NoData type={"service"} />;
    }

    return (
      <div className="layout">
        <div className="left">
          <DashboardNav index={3} />
        </div>
        <div className="right">
          <div className="header">
            <DashboardHeader />
          </div>
          <div className="main">
            <div className="main-wrapper">
              <div className="all-right-container-service">
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
                    {this.props.services && (
                      <ServiceList
                        services={this.props.services}
                        storeId={this.props.auth.uid}
                      />
                    )}
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
        </div>
      </div>
    );
  }
}

const mapStateToProps = state => {
  return {
    services: state.firestore.ordered.services,
    auth: state.firebase.auth,
    serviceMsg: state.serviceReducer
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
