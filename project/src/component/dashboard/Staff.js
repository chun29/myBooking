import React, { Component } from "react";
import { compose } from "redux";
import { connect } from "react-redux";
import { firestoreConnect } from "react-redux-firebase";
import DashboardNav from "./DashboardNav";
import DashboardHeader from "./DashboardHeader";
import "../../style/staff.css";
import { Link } from "react-router-dom";
import StaffList from "../shops/StaffList";
import { NoData } from "./NoData";

class Staff extends Component {
  constructor(props) {
    super(props);
    this.state = {
      showMsg: false,
      staffMsg: null
    };
  }

  componentDidUpdate(prevProps) {
    if (this.props.staffMsg.time !== prevProps.staffMsg.time) {
      this.setState({
        showMsg: true,
        staffMsg: this.props.staffMsg.staffMsg
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
    const staffMsg = this.state.staffMsg;

    if (this.props.staff && this.props.staff.length < 1) {
      return <NoData type={"staff"} />;
    }

    return (
      <div className="layout">
        <div className="left">
          <DashboardNav index={4} />
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
                    <h1>服務人員</h1>
                  </div>
                  <div className="staff-main-wrapper">
                    <div className="button-wrapper">
                      <Link to="/createstaff">
                        <button className="add-staff green-btn">
                          新建服務人員
                        </button>
                      </Link>
                    </div>
                    {this.props.staff && (
                      <StaffList
                        staffs={this.props.staff}
                        storeId={this.props.auth.uid}
                      />
                    )}
                    {this.state.showMsg && (
                      <div className="dashboard-msg">
                        {staffMsg ? <p>{staffMsg}</p> : null}
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
    staffMsg: state.staff
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
