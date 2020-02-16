import React from "react";
import "../../style/dashboardheader.css";
import { Logo, UserAvatar } from "../layout/Layout";
import { connect } from "react-redux";

const DashboardHeader = ({ auth, profile }) => {
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
          <div className="online-container">
            <div className="color-sign"></div>
            <div className="online-info">
              <p>線上預約網站</p>
              <p className="online-setup">尚未設定</p>
            </div>
          </div>
          {/* <div className="bell-img"></div> */}
          <UserAvatar userName={userName} />
        </div>
      </div>
    </React.Fragment>
  );
};

const mapStateToProps = state => {
  return {
    auth: state.firebase.auth,
    profile: state.firebase.profile
  };
};
export default connect(mapStateToProps)(DashboardHeader);
