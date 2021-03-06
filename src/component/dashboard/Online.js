import React from "react";
import { compose } from "redux";
import { connect } from "react-redux";
import { firestoreConnect } from "react-redux-firebase";
import DashboardNav from "./DashboardNav";
import DashboardHeader from "./DashboardHeader";
import { Link } from "react-router-dom";
import "../../style/staff.css";
import step_3 from "../../img/online-img.png";
import step_1 from "../../img/step1.png";
import step_2 from "../../img/step2.png";
import step_4 from "../../img/step4.png";
import Loading from "../layout/loading";
import alert from "../../img/alert.png";
import mail from "../../img/mail.png";
import user from "../../img/user.png";
import www from "../../img/www.png";
import "../../style/online.css";

class Online extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      store: "",
      showSetup: true,
      showMsg: false,
      onlineMsg: null
    };
  }

  componentDidUpdate(prevProps) {
    if (this.props.onlineMsg.time !== prevProps.onlineMsg.time) {
      this.setState({
        showMsg: true,
        onlineMsg: this.props.onlineMsg.onlineMsg
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
    if (this.props.profile.name == null) {
      return <Loading />;
    }
    const { onlineMsg } = this.state;
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
    if (
      (store && store[0] && store[0].workday === undefined) ||
      (store && store.length < 1)
    ) {
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
      (store && store[0] && store[0].workday === undefined) ||
      (staff && staff.length < 1) ||
      (service && service.length < 1)
    ) {
      showSetup = (
        <div className="alert-wrapper">
          <h1 className="today-info">設定提示</h1>
          {msg.map((data, i) => {
            return (
              <div className="set-alert-msg" key={i}>
                <img className="alert-img" src={alert} />
                <div style={{ color: "red" }}>{data}尚未設定</div>
              </div>
            );
          })}
        </div>
      );
    } else {
      showSetup = (
        <div className="button-wrapper">
          <Link to="/onlinebooking">
            <button className="add-staff blue-btn">上線資料設定</button>
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
            <div className="main-wrapper onlineSet-container">
              <div className="all-right-container-online">
                <div className="online-step-info">
                  <div className="online-info-header">
                    <h1>輕鬆的架設您的專屬預約系統</h1>
                    <h1>按照下列步驟開始吧！</h1>
                  </div>

                  <div className="online-step-wrap">
                    <div className="online-step">
                      <img className="step-img" src={step_1} />
                      <h5>1. 設定服務項目</h5>
                      <Link to="/service">
                        <p className="go-to-link">前往連結</p>
                      </Link>
                    </div>
                    <div className="online-step">
                      <img className="step-img" src={step_2} />
                      <h5>2. 設定服務人員</h5>
                      <Link to="/staff">
                        <p className="go-to-link">前往連結</p>
                      </Link>
                    </div>
                    <div className="online-step">
                      <img className="step-img" src={step_3} />
                      <h5>3. 設定營業時間</h5>
                      <Link to="/openinghours">
                        <p className="go-to-link">前往連結</p>
                      </Link>
                    </div>
                    <div className="online-step">
                      <img className="step-img" src={step_4} />
                      <h5>4. 上線設定</h5>
                      <Link to="/onlinebooking">
                        <p className="go-to-link">前往連結</p>
                      </Link>
                    </div>
                  </div>
                </div>
                <div className="member-info">
                  <div className="member-content-alert">{showSetup}</div>

                  <div className="member-content">
                    <div className="member-title">我的帳戶</div>
                    <div className="content">
                      <div className="content-header-wrapper">
                        <img className="member-icon" src={user} />
                        <div className="member-cap">會員名稱</div>
                        <div className="member-text">{profile.name}</div>
                      </div>
                    </div>
                    <div className="content">
                      <div className="content-header-wrapper">
                        <img className="member-icon" src={mail} />
                        <div className="member-cap">電子信箱</div>
                        <div className="member-text">{profile.email}</div>
                      </div>
                    </div>
                    <div className="content">
                      <div className="content-header-wrapper">
                        <img className="member-icon" src={www} />
                        <div className="member-cap">預約頁面</div>

                        <div className="member-text">{weblinkimg}</div>
                      </div>
                    </div>
                    {this.state.showMsg && (
                      <div className="dashboard-msg">
                        {onlineMsg ? <p>{onlineMsg}</p> : null}
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
    store: state.firestore.ordered.store,
    service: state.firestore.ordered.service,
    auth: state.firebase.auth,
    profile: state.firebase.profile,
    onlineMsg: state.onlineSetup
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
