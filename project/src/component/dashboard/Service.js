import React from "react";
import { connect } from "react-redux";
import DashboardNav from "./DashboardNav";
import DashboardHeader from "./DashboardHeader";
import "../../style/staff.css";
import StaffService from "./StaffService";

class Service extends React.Component {
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
    const { serviceMsg } = this.state;

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
                {this.state.showMsg && (
                  <div className="dashboard-msg">
                    {serviceMsg ? <p>{serviceMsg}</p> : null}
                  </div>
                )}
                <StaffService type={"service"} />
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
    serviceMsg: state.serviceReducer
  };
};

export default connect(mapStateToProps)(Service);
