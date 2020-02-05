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

{
  /* <div className="set-container">
  <label>
    <input
      onChange={() => {
        this.handleOpen("monday");
      }}
      type="checkbox"
      name="workingHours-monday-open"
      value="true"
      checked={this.state.businessHour[0].open}
      id="monday"
    />
    <div className="workday-text">星期一</div>
  </label>
</div>; */
}

// this.setState(prevState => ({
//   businessHour: prevState.businessHour.map(eachday => {
//     if (eachday.day === id) {
//       eachday.open = !eachday.open;
//     }
//     return eachday;
//   })
// }));
// this.props.setOpeningHours(this.state.businessHour, this.props.auth.uid);
