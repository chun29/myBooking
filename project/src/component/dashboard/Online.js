import React, { Component } from "react";
import { compose } from "redux";
import { connect } from "react-redux";
import { firestoreConnect } from "react-redux-firebase";
import DashboardNav from "./DashboardNav";
import DashboardHeader from "./DashboardHeader";
import { Link } from "react-router-dom";
import "../../style/staff.css";

class Online extends Component {
  state = {
    store: ""
  };

  componentDidUpdate(prevProps) {
    // 常見用法（別忘了比較 prop）：
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
    const { auth } = this.props;
    return (
      <div className="dashboard">
        <div className="top">
          <DashboardHeader />
        </div>
        <div className="down">
          <div className="left-container">
            <DashboardNav index={5} />
          </div>

          <div className="all-right-container">
            <div className="staff-wrapper">
              <div className="staff-header">
                <h1>專屬預約網站</h1>
              </div>
              <div className="staff-main-wrapper">
                <div className="button-wrapper">
                  <Link to="/onlinebooking">
                    <button
                      onClick={this.onlineSetupLink}
                      className="add-staff"
                    >
                      上線資料設定
                    </button>
                  </Link>
                </div>
                <div>
                  {/* <div className="main-left">
                    <div className="main-left-header">
                      <h1>輕鬆的架設您的專屬預約系統</h1>
                      <h1>按照下列步驟開始吧！</h1>
                    </div>
                    <div className="main-left-step">
                      <div className="online-step">
                        <h4>1. 設定服務項目</h4>
                        <p>前往連結</p>
                      </div>
                      <div className="online-step">
                        <h4>2. 設定服務人員</h4>
                        <p>前往連結</p>
                      </div>
                      <div className="online-step">
                        <h4>3. 設定預約時程</h4>
                        <p>前往連結</p>
                      </div>
                      <div className="online-step">
                        <h4>4. 上線設定</h4>
                        <p>前往連結</p>
                      </div>
                    </div>
                    <div className="main-left-step"></div>
                  </div> */}
                  <div className="main-right">
                    <h3>預約頁面</h3>
                    <div>商店帳號：{auth.uid}</div>
                    <div>商店名稱</div>
                    <div>商店電話</div>
                    <div>商店地址</div>
                    <div>img</div>
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
