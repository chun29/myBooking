import React, { Component } from "react";
import setOpeningHours from "../../store/actions/openingHoursAction";
import { connect } from "react-redux";
import Checkbox from "@material-ui/core/Checkbox";

class SelectOpenDay extends Component {
  render() {
    let isOpen = this.props.isSelected;
    let day = this.props.label;
    let checkboxChange = this.props.onCheckboxChange;

    return (
      <div className="set-container">
        <div className="form-check">
          <label>
            <Checkbox
              name={day[0]}
              checked={isOpen}
              onChange={checkboxChange}
              className="form-check-input"
              value="secondary"
              color="primary"
              inputProps={{ "aria-label": "secondary checkbox" }}
            />
            {day[1]}
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
