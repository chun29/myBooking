import React, { Component } from "react";
import { compose } from "redux";
import { connect } from "react-redux";
import { firestoreConnect, createFirebaseConnect } from "react-redux-firebase";
import DashboardNav from "./DashboardNav";
import DashboardHeader from "./DashboardHeader";
import { Link } from "react-router-dom";
import "../../style/staff.css";
import step_3 from "../../img/online-img.png";
import step_1 from "../../img/step1.png";
import step_2 from "../../img/step2.png";
import step_4 from "../../img/step4.png";
import Loading from "../layout/loading";

class Online extends Component {
  state = {
    store: "",
    showSetup: true
  };

  componentDidUpdate(prevProps) {
    if (this.props.store !== prevProps.store) {
      this.setState({ store: this.props.store });
    }
  }

  onlineSetupLink = () => {
    if (this.props.store[0].workday === null) {
      alert("請先前往營業時間設定資料");
    }
    if (this.props.staff.length < 1) {
      alert("請先前往服務人員設定資料");
    }
    if (this.props.staff.length < 1) {
      alert("請先前往服務人員設定資料");
    }
  };

  render() {
    if (this.props.profile.name == null) {
      return <Loading />;
    }
    const { store, auth, profile, staff, service } = this.props;
    let onlineSetup = false;
    if (store && store[0]) {
      if (store[0].online) {
        onlineSetup = store[0].online.bookingIsOpen;
      }
    }
    const weblinkimg = onlineSetup ? (
      <a
        href={`https://mybooking-project.firebaseapp.com/booking/${auth.uid}`}
        target="_blank"
      >
        <div className="member-text">
          https://mybooking-project.firebaseapp.com/booking/{auth.uid}
        </div>
      </a>
    ) : (
      "關閉中"
    );
    let msg = [];
    if (store && store[0] && store[0].workday === null) {
      msg.push("營業時間");
    }
    if (staff && staff.length < 1) {
      msg.push("服務人員");
    }
    if (service && service.length < 1) {
      msg.push("服務");
    }
    let showSetup;
    if (
      (store && store[0] && store[0].workday === null) ||
      (staff && staff.length < 1) ||
      (service && service.length < 1)
    ) {
      showSetup = msg.map((data, i) => {
        return (
          <div key={i}>
            <div style={{ color: "red" }}>{data}尚未設定</div>
          </div>
        );
      });
    } else {
      showSetup = (
        <div className="button-wrapper">
          <Link to="/onlinebooking">
            <button onClick={this.onlineSetupLink} className="add-staff">
              上線資料設定
            </button>
          </Link>
        </div>
      );
    }

    return (
      <div className="layout">
        <div className="left">
          <DashboardNav index={5} />
        </div>
        <div className="right">
          <div className="header">
            <DashboardHeader />
          </div>
          <div className="main main-online">
            <div className="main-wrapper">
              <div className="all-right-container-online">
                <div className="online-step-info">
                  <h1>輕鬆的架設您的專屬預約系統</h1>
                  <h1>按照下列步驟開始吧！</h1>
                  <div className="online-step-wrap">
                    <div className="online-step">
                      <img className="step-img" src={step_1} />
                      <h4>1. 設定服務項目</h4>
                      <Link to="/service">
                        <p>前往連結</p>
                      </Link>
                    </div>
                    <div className="online-step">
                      <img className="step-img" src={step_2} />
                      <h4>2. 設定服務人員</h4>
                      <Link to="/staff">
                        <p>前往連結</p>
                      </Link>
                    </div>
                    <div className="online-step">
                      <img className="step-img" src={step_3} />
                      <h4>3. 設定預約時程</h4>
                      <Link to="/openinghours">
                        <p>前往連結</p>
                      </Link>
                    </div>
                    <div className="online-step">
                      <img className="step-img" src={step_4} />
                      <h4>4. 上線設定</h4>
                      <Link to="/onlinebooking">
                        <p>前往連結</p>
                      </Link>
                    </div>
                  </div>
                </div>
                <div className="member-info">
                  {/* <div className="button-wrapper">
                      <Link to="/onlinebooking">
                        <button
                          onClick={this.onlineSetupLink}
                          className="add-staff"
                        >
                          上線資料設定
                        </button>
                      </Link>
                    </div> */}
                  {showSetup}
                  <div className="member-title">我的帳戶</div>
                  <div className="member-content">
                    <div className="content">
                      <div className="member-cap">會員名稱</div>

                      <div className="member-text">{profile.name}</div>
                    </div>
                    <div className="content">
                      <div className="member-cap">電子信箱</div>

                      <div className="member-text">{profile.email}</div>
                      <div className="content">
                        <div className="member-cap">預約頁面</div>

                        <div className="member-text">{weblinkimg}</div>
                      </div>
                    </div>
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
    store: state.firestore.ordered.store,
    service: state.firestore.ordered.service,
    auth: state.firebase.auth,
    profile: state.firebase.profile
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
      },
      {
        collection: "store",
        doc: props.auth.uid,
        subcollections: [{ collection: "service" }],
        storeAs: "service"
      },
      {
        collection: "store",
        doc: props.auth.uid
      }
    ];
  })
)(Online);
