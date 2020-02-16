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

const WEEK = [
  [1, "星期一"],
  [2, "星期二"],
  [3, "星期三"],
  [4, "星期四"],
  [5, "星期五"],
  [6, "星期六"],
  [0, "星期日"]
];

// const WEEK = [1, 2, 3, 4, 5, 6, 0];
class OpeningHours extends Component {
  state = {
    isOpen: WEEK.reduce(
      (options, option) => ({
        ...options,
        [option[0]]: true
      }),
      {}
    ),
    openTime: WEEK.reduce(
      (options, option) => ({
        ...options,
        [option[0]]: "8"
      }),
      {}
    ),
    closeTime: WEEK.reduce(
      (options, option) => ({
        ...options,
        [option[0]]: "18"
      }),
      {}
    )
  };

  componentDidUpdate(prevProps) {
    // 常見用法（別忘了比較 prop）：
    if (this.props.store !== prevProps.store) {
      // this.setState({ store: this.props.store });

      const workday = this.props.store[0].workday;

      this.setState({
        isOpen: workday.isOpen,
        closeTime: workday.closeTime,
        openTime: workday.openTime
      });
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
    this.setState(prevState => ({
      openTime: {
        ...prevState.openTime,
        [name[0]]: time
      }
    }));
  };

  handleSelectCloseValue = changeEvent => {
    const time = changeEvent.target.value;
    const { name } = changeEvent.target;
    this.setState(prevState => ({
      closeTime: {
        ...prevState.closeTime,
        [name[0]]: time
      }
    }));
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

  createCheckboxes = () => WEEK.map(this.createCheckbox);
  createOpenTimes = () => WEEK.map(this.createOpenTime);
  createCloseTimes = () => WEEK.map(this.createCloseTime);

  handleSubmit = () => {
    this.props.setOpeningHours(this.state, this.props.auth.uid);
  };
  render() {
    return (
      <div className="dashboard">
        <div className="top">
          <DashboardHeader />
        </div>
        <div className="down">
          <div className="left-container">
            <DashboardNav />
          </div>

          <div className="all-right-container">
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
              </div>
              <div className="form-button-wrapper">
                <button
                  onClick={this.handleSubmit}
                  className="create-staff-button"
                >
                  儲存
                </button>
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

const mapDispatchToProps = dispatch => {
  return {
    setOpeningHours: (weekday, id) => dispatch(setOpeningHours(weekday, id))
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
)(OpeningHours);
