import React from "react";
import "../../style/dashboardheader.css";
import { Logo, UserAvatar } from "../layout/Layout";
import { connect } from "react-redux";
import { Link } from "react-router-dom";
import { compose } from "redux";
import { firestoreConnect } from "react-redux-firebase";

const DashboardHeader = ({ auth, profile, store }) => {
  let onlineSetup = false;

  if (store && store[0]) {
    if (store[0].online) {
      onlineSetup = store[0].online.bookingIsOpen;
    }
  }

  const newClass = onlineSetup ? "blue" : "red";
  const text = onlineSetup ? "已上線" : "關閉中";

  let user = "";
  if (profile.name) {
    user = profile.name.charAt(0).toUpperCase();
  }
  const userName = auth.uid ? user : "";

  return (
    <React.Fragment>
      <div className="dashboard-header">
        <Logo />
        <div className="right-container">
          <Link to="/online">
            <div className="online-container">
              <div className={`color-sign ${newClass}`}></div>
              <div className="online-info">
                <p>線上預約網站</p>
                <p className="online-setup">{text}</p>
              </div>
            </div>
            {/* <div className="bell-img"></div> */}
          </Link>
          <UserAvatar userName={userName} />
        </div>
      </div>
    </React.Fragment>
  );
};

const mapStateToProps = state => {
  return {
    auth: state.firebase.auth,
    profile: state.firebase.profile,
    store: state.firestore.ordered.store
  };
};

export default compose(
  connect(mapStateToProps),
  firestoreConnect(props => {
    return [
      {
        collection: "store",
        doc: props.auth.uid
      }
    ];
  })
)(DashboardHeader);
