import React from "react";
import { connect } from "react-redux";
import DashboardNav from "./DashboardNav";
import DashboardHeader from "./DashboardHeader";
import "../../style/staff.css";
import StaffService from "./StaffService";

class Staff extends React.Component {
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
    const { staffMsg } = this.state;

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
                {this.state.showMsg && (
                  <div className="dashboard-msg">
                    {staffMsg ? <p>{staffMsg}</p> : null}
                  </div>
                )}
                <StaffService type={"staff"} />
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
    staffMsg: state.staff
  };
};

export default connect(mapStateToProps)(Staff);
