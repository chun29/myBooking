import React, { Component } from "react";
import { compose } from "redux";
import { connect } from "react-redux";
import { firestoreConnect } from "react-redux-firebase";
import DashboardNav from "./DashboardNav";
import DashboardHeader from "./DashboardHeader";
import "../../style/staff.css";
import { Link } from "react-router-dom";
import StaffList from "../shops/StaffList";
import addstaff from "../../img/addstaff.png";

class Staff extends Component {
  state = {
    showMsg: false,
    staffMsg: null
  };
  componentDidUpdate(prevProps) {
    // 常見用法（別忘了比較 prop）：
    if (this.props.staffMsg !== prevProps.staffMsg) {
      this.setState({
        showMsg: true,
        staffMsg: this.props.staffMsg
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
    if (this.props.staff === null) {
      return <div>Loading</div>;
    }
    if (this.props.staff && this.props.staff.length < 1) {
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
                      <h1>服務項目</h1>
                    </div>
                    <div className="staff-main-wrapper">
                      <div className="button-wrapper">
                        <Link to="/createstaff">
                          <button className="add-staff">新建服務人員</button>
                        </Link>
                      </div>
                      <img src={addstaff} className="addservice" />
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

      // return (
      //   <div className="dashboard">
      //     <div className="top">
      //       <DashboardHeader />
      //     </div>
      //     <div className="down">
      //       <div className="left-container">
      //         <DashboardNav index={4} />
      //       </div>

      //       <div className="all-right-container">
      //         <div className="staff-wrapper">
      //           <div className="staff-header">
      //             <h1>服務人員</h1>
      //           </div>
      //           <div className="staff-main-wrapper">
      //             <div className="button-wrapper">
      //               <Link to="/createstaff">
      //                 <button className="add-staff">新建服務人員</button>
      //               </Link>
      //             </div>
      //             <h1>尚未有服務人員創建</h1>
      //             <img src={addstaff} className="addservice" />
      //             {this.state.showMsg && (
      //               <div className="dashboard-msg">
      //                 {staffMsg ? <p>{staffMsg}</p> : null}
      //               </div>
      //             )}
      //           </div>
      //         </div>
      //       </div>
      //     </div>
      //   </div>
      // );
    } else {
    }
    const staffs = this.props.staff && (
      <StaffList staffs={this.props.staff} storeId={this.props.auth.uid} />
    );
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
                        <button className="add-staff">新建服務人員</button>
                      </Link>
                    </div>
                    {staffs}
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

    // return (
    //   <div className="dashboard">
    //     <div className="top">
    //       <DashboardHeader />
    //     </div>
    //     <div className="down">
    //       <div className="left-container">
    //         <DashboardNav index={4} />
    //       </div>

    //       <div className="all-right-container">
    //         <div className="staff-wrapper">
    //           <div className="staff-header">
    //             <h1>服務人員</h1>
    //           </div>
    //           <div className="staff-main-wrapper">
    //             <div className="button-wrapper">
    //               <Link to="/createstaff">
    //                 <button className="add-staff">新建服務人員</button>
    //               </Link>
    //             </div>
    //             {staffs}
    //             {this.state.showMsg && (
    //               <div className="dashboard-msg">
    //                 {staffMsg ? <p>{staffMsg}</p> : null}
    //               </div>
    //             )}
    //           </div>
    //         </div>
    //       </div>
    //     </div>
    //   </div>
    // );
  }
}

const mapStateToProps = state => {
  console.log(state);
  return {
    staff: state.firestore.ordered.staff,
    auth: state.firebase.auth,
    staffMsg: state.staff.staffMsg
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
