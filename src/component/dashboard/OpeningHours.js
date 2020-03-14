import React, { Component } from "react";
import DashboardNav from "./DashboardNav";
import DashboardHeader from "./DashboardHeader";
import "../../style/openinghours.css";
import { connect } from "react-redux";
import { firestoreConnect } from "react-redux-firebase";
import { compose } from "redux";
import SelectOpenDay from "./SelectOpenDay";
import SelectOpenTime from "./SelectOpenTime";
import SelectCloseTime from "./SelectOpenTime";
import setOpeningHours from "../../store/actions/openingHoursAction";
import Msg from "../../component/layout/Msg";

const week = [
  [1, "星期一"],
  [2, "星期二"],
  [3, "星期三"],
  [4, "星期四"],
  [5, "星期五"],
  [6, "星期六"],
  [0, "星期日"]
];

class OpeningHours extends React.Component {
  constructor(props) {
    super(props);
    this.state =
      props.store && props.store[0] && props.store[0].workday
        ? props.store[0].workday
        : {
            isOpen: week.reduce(
              (options, option) => ({
                ...options,
                [option[0]]: true
              }),
              {}
            ),
            openTime: week.reduce(
              (options, option) => ({
                ...options,
                [option[0]]: "8"
              }),
              {}
            ),
            closeTime: week.reduce(
              (options, option) => ({
                ...options,
                [option[0]]: "18"
              }),
              {}
            )
          };
  }

  componentDidUpdate(prevProps) {
    if (this.props.store !== prevProps.store) {
      if (
        this.props.store &&
        this.props.store[0] &&
        this.props.store[0].workday
      ) {
        {
          const workday = this.props.store[0].workday;

          this.setState({
            isOpen: workday.isOpen,
            closeTime: workday.closeTime,
            openTime: workday.openTime
          });
        }
      }
    }
  }

  handleCheckboxChange = changeEvent => {
    const { name } = changeEvent.target;
    this.setState(prevState => ({
      isOpen: {
        ...prevState.isOpen,
        [name]: !prevState.isOpen[name]
      }
    }));
  };

  handleSelectOpenValue = changeEvent => {
    const time = changeEvent.target.value;
    const { name } = changeEvent.target;
    this.setState({
      openTime: {
        ...this.state.openTime,
        [name[0]]: time
      }
    });
  };

  handleSelectCloseValue = changeEvent => {
    const time = changeEvent.target.value;
    const { name } = changeEvent.target;
    this.setState({
      closeTime: {
        ...this.state.closeTime,
        [name[0]]: time
      }
    });
  };

  createCheckbox = option => (
    <SelectOpenDay
      label={option}
      isSelected={this.state.isOpen[option[0]]}
      onCheckboxChange={this.handleCheckboxChange}
      key={option}
    />
  );

  createOpenTime = option => (
    <SelectOpenTime
      label={option}
      value={this.state.openTime[option[0]]}
      handleSelect={this.handleSelectOpenValue}
      key={option}
      disabled={!this.state.isOpen[option[0]]}
    />
  );

  createCloseTime = option => (
    <SelectCloseTime
      label={option}
      value={this.state.closeTime[option[0]]}
      handleSelect={this.handleSelectCloseValue}
      key={option}
      disabled={!this.state.isOpen[option[0]]}
    />
  );

  createCheckboxes = () => week.map(this.createCheckbox);
  createOpenTimes = () => week.map(this.createOpenTime);
  createCloseTimes = () => week.map(this.createCloseTime);

  handleSubmit = () => {
    this.props.setOpeningHours(this.state, this.props.auth.uid);
  };
  render() {
    return (
      <div className="layout">
        <div className="left">
          <DashboardNav index={2} />
        </div>
        <div className="right">
          <div className="header">
            <DashboardHeader />
          </div>
          <div className="main">
            <div className="main-wrapper-time">
              <div className="staff-header">
                <h1>設定營業時間</h1>
              </div>
              <main className="openingHours-wrapper">
                <div className="workingHours-container">
                  <form autoComplete="off" className="workingHours-form">
                    <div className="workingHours-column workday">
                      <h3>星期</h3>
                      {this.createCheckboxes()}
                    </div>

                    <div className="workingHours-column open-time">
                      <h3>開始時間</h3>
                      {this.createOpenTimes()}
                    </div>

                    <div className="workingHours-column close-time">
                      <h3>結束時間</h3>

                      {this.createCloseTimes()}
                    </div>
                  </form>
                  <div className="open-button-wrapper">
                    <button
                      onClick={this.handleSubmit}
                      className="create-staff-button"
                    >
                      儲存
                    </button>
                  </div>
                  <Msg />
                </div>
              </main>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

const mapStateToProps = state => {
  return {
    auth: state.firebase.auth,
    store: state.firestore.ordered.store,
    openingHoursMsg: state.workday
  };
};

const mapDispatchToProps = dispatch => {
  return {
    setOpeningHours: (weekday, id) => dispatch(setOpeningHours(weekday, id))
  };
};

export default compose(
  connect(mapStateToProps, mapDispatchToProps),
  firestoreConnect(props => {
    return [
      {
        collection: "store",
        doc: props.auth.uid
      }
    ];
  })
)(OpeningHours);
