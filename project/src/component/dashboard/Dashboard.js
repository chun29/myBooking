import React, { Component } from "react";
import { Notifications, TodayBookings } from "./Notifications";
import { connect } from "react-redux";
import { firestoreConnect } from "react-redux-firebase";
import { compose } from "redux";
import DashboardNav from "./DashboardNav";
import DashboardHeader from "./DashboardHeader";
import { Redirect } from "react-router-dom";
import "../../style/dashboard.css";
import { guideBanned } from "../../store/actions/authAction";
import { Link } from "react-router-dom";

class Dashboard extends Component {
  constructor(props) {
    super(props);
    this.state = {
      guideOpen: false
    };
  }
  render() {
    console.log(this.props.guideShow);
    const guideOpen = this.props.guideShow;
    this.openGuide = () => {
      this.setState({
        guideOpen: !this.state.guideOpen
      });
    };
    this.guideClose = () => {
      this.props.guideBanned(this.props.auth.uid);
    };
    const { auth, notifications, bookings } = this.props;

    Date.prototype.yyyymmdd = function() {
      var mm = this.getMonth() + 1;
      var dd = this.getDate();

      return [
        this.getFullYear(),
        (mm > 9 ? "" : "0") + mm,
        (dd > 9 ? "" : "0") + dd
      ].join("");
    };

    var date = new Date();
    const today = date.yyyymmdd();
    let todayBookings = [];
    if (bookings) {
      bookings.map(booking => {
        if (booking.bookedDay === today) {
          todayBookings.push(booking);
        }
      });
    }

    if (!auth.uid /*|| !auth.emailVerified*/) return <Redirect to="/signIn" />;
    if (this.props.profile === null) {
      return <Loading />;
    }
    return (
      <div className="layout">
        <div className="left">
          <DashboardNav index={0} />
        </div>
        <div className="right">
          <div className="header">
            <DashboardHeader />
          </div>
          <div className="main">
            <div className="main-wrapper">
              <div className="dashboard-item-container dashboard-item1">
                <TodayBookings
                  todayBookings={todayBookings}
                  staffs={this.props.staff}
                  services={this.props.service}
                />
              </div>
              <div className="dashboard-item-container  dashboard-item2">
                <Notifications notifications={notifications} />
              </div>

              {guideOpen && (
                <div className="getting-started">
                  {this.state.guideOpen ? (
                    <button
                      onClick={this.openGuide}
                      className="getting-started-btn getting-started-btn-close"
                    >
                      X
                    </button>
                  ) : (
                    <button
                      onClick={this.openGuide}
                      className="getting-started-btn"
                    >
                      使用教學
                    </button>
                  )}

                  {this.state.guideOpen && (
                    <div className="getting-started-surface">
                      <div className="getting-started-surface-header">
                        <h1>使用步驟</h1>
                      </div>
                      <div className="getting-started-surface-body">
                        <ul>
                          <Link to="/staff">
                            <li className="getting-started-task-closed">
                              <span className="getting-started-completed icon-circle-check">
                                1
                              </span>
                              前往服務人員設定資料
                            </li>
                          </Link>
                          <Link to="/service">
                            <li className="getting-started-task-closed">
                              <span className="getting-started-completed icon-circle-check">
                                2
                              </span>
                              前往服務項目設定資料
                            </li>
                          </Link>
                          <Link to="/openinghours">
                            <li className="getting-started-task-closed">
                              <span className="getting-started-completed icon-circle-check">
                                3
                              </span>
                              營業時間設定資料
                            </li>
                          </Link>
                          <Link to="/online">
                            <li className="getting-started-task-closed">
                              <span className="getting-started-completed icon-circle-check">
                                4
                              </span>
                              預約網站頁面設定
                            </li>
                          </Link>
                        </ul>
                        <button
                          onClick={this.guideClose}
                          className="getting-started-dismiss"
                        >
                          不要再顯示
                        </button>
                      </div>
                    </div>
                  )}
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    );
  }
}

const mapStateToProps = state => {
  console.log(state);
  return {
    auth: state.firebase.auth,
    notifications: state.firestore.ordered.notifications,
    bookings: state.firestore.ordered.booking,
    staff: state.firestore.ordered.staff,
    service: state.firestore.ordered.service,
    guideShow:
      state.firestore.ordered.owners &&
      state.firestore.ordered.owners[0] &&
      state.firestore.ordered.owners[0].guideShow
  };
};

const mapDispatchToProps = dispatch => {
  return {
    guideBanned: id => dispatch(guideBanned(id))
  };
};

export default compose(
  connect(mapStateToProps, mapDispatchToProps),
  firestoreConnect(props => {
    return [
      {
        collection: "store",
        doc: props.auth.uid,
        subcollections: [{ collection: "notifications" }],
        storeAs: "notifications"
      },
      {
        collection: "owners",
        doc: props.auth.uid
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
        subcollections: [{ collection: "staff" }],
        storeAs: "staff"
      },
      {
        collection: "store",
        doc: props.auth.uid,
        subcollections: [{ collection: "service" }],
        storeAs: "service"
      }
    ];
  })
)(Dashboard);
