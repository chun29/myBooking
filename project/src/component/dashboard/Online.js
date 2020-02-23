import React, { Component } from "react";
import { compose } from "redux";
import { connect } from "react-redux";
import { firestoreConnect } from "react-redux-firebase";
import DashboardNav from "./DashboardNav";
import DashboardHeader from "./DashboardHeader";
import { Link } from "react-router-dom";
import "../../style/staff.css";
import online from "../../img/online-img.png";

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
                      <img className="step-img" src={online} />
                      <h4>1. 設定服務項目</h4>
                      <Link to="/service">
                        <p>前往連結</p>
                      </Link>
                    </div>
                    <div className="online-step">
                      <img className="step-img" src={online} />
                      <h4>2. 設定服務人員</h4>
                      <Link to="/staff">
                        <p>前往連結</p>
                      </Link>
                    </div>
                    <div className="online-step">
                      <img className="step-img" src={online} />
                      <h4>3. 設定預約時程</h4>
                      <Link to="/openinghours">
                        <p>前往連結</p>
                      </Link>
                    </div>
                    <div className="online-step">
                      <img className="step-img" src={online} />
                      <h4>4. 上線設定</h4>
                      <Link to="/onlinebooking">
                        <p>前往連結</p>
                      </Link>
                    </div>
                  </div>
                </div>
                <div className="member-info">
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
                  <div className="member-title">我的帳戶</div>
                  <div className="member-content">
                    <div className="content">
                      <div className="member-cap">會員名稱</div>

                      <div className="member-text">June</div>
                    </div>
                    <div className="content">
                      <div className="member-cap">電子信箱</div>

                      <div className="member-text">june@gmail.com</div>
                      <div className="content">
                        <div className="member-cap">預約頁面</div>
                        <Link>
                          <div className="member-text">{auth.uid}</div>
                        </Link>
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
