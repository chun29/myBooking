import React, { Component } from "react";
import setOpeningHours from "../../store/actions/openingHoursAction";
import { connect } from "react-redux";

class SelectOpenDay extends Component {
  render() {
    let isOpen = this.props.isSelected;
    let day = this.props.label;
    let checkboxChange = this.props.onCheckboxChange;

    return (
      <div className="set-container">
        <div className="form-check">
          <label>
            <input
              type="checkbox"
              name={day}
              checked={isOpen}
              onChange={checkboxChange}
              className="form-check-input"
            />
            {day}
          </label>
        </div>
      </div>
    );
  }
}
const mapStateToProps = state => {
  return {
    auth: state.firebase.auth
  };
};

const mapDispatchToProps = dispatch => {
  return {
    setOpeningHours: (weekday, id) => dispatch(setOpeningHours(weekday, id))
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(SelectOpenDay);
