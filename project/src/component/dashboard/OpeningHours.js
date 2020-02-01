import React, { Component } from "react";
import DashboardNav from "./DashboardNav";
import DashboardHeader from "./DashboardHeader";
import "../../style/openinghours.css";
import { connect } from "react-redux";
import { firestoreConnect } from "react-redux-firebase";
import { compose } from "redux";
import SelectOpenDay from "./SelectOpenDay";
import SelectOpenTime from "./SelectOpenTime";

class OpeningHours extends Component {
  render() {
    const { store } = this.props;
    let storeData;

    if (store) {
      store.map(data => {
        if (data.id === this.props.auth.uid) {
          storeData = data;
        }
        return data;
      });
    }
    const dayList = [
      "monday",
      "tuesday",
      "wednesday",
      "thursday",
      "friday",
      "saturday",
      "sunday"
    ];

    return (
      <div className="dashboard">
        <div className="top">
          <DashboardHeader />
        </div>
        <div className="down">
          <div className="left-container">
            <DashboardNav />
          </div>

          <div className="right-container">
            <main className="openingHours-wrapper">
              <div className="workingHours-header">
                <h1>設定營業時間</h1>
              </div>
              <div className="workingHours-container">
                <form className="workingHours-form">
                  {/* isOpen Select */}

                  <div className="workingHours-column workday">
                    <h3>星期</h3>
                    {dayList.map((day, i) => (
                      <SelectOpenDay key={i} storeData={storeData} name={day} />
                    ))}
                  </div>

                  {/* openTime Select */}
                  <div className="workingHours-column open-time">
                    <h3>開始時間</h3>
                    <SelectOpenTime />
                  </div>

                  {/* closeTime Select */}
                  <div className="workingHours-column close-time">
                    <h3>結束時間</h3>
                    <SelectOpenTime />
                  </div>
                </form>
              </div>
              <div className="workingHours-btn">
                <button className="workingHours-next">下一步</button>
              </div>
            </main>
          </div>
        </div>
      </div>
    );
  }
}

const mapStateToProps = state => {
  return {
    auth: state.firebase.auth,
    store: state.firestore.ordered.store
  };
};

export default compose(
  connect(mapStateToProps),
  firestoreConnect([
    {
      collection: "store"
    }
  ])
)(OpeningHours);
