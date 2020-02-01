import React, { Component } from "react";
import setOpeningHours from "../../store/actions/openingHoursAction";
import { connect } from "react-redux";

class SelectOpenDay extends Component {
  state = {
    id: this.props.auth.uid,
    checked: true,
    workday: this.props.storeData
  };

  handleOpen = e => {
    const data = { [this.props.name]: e.target.checked };
    this.setState(
      {
        checked: e.target.checked,
        workday: data
      }
      // function() {
      //   this.props.setOpeningHours(this.state.workday, this.state.id);
      // }
    );
  };

  render() {
    let isOpen = true;
    let day = this.props.name;

    if (this.props.storeData) {
      isOpen = this.props.storeData.workday[day];
    }

    return (
      <div className="set-container">
        <label>
          <input
            type="checkbox"
            name="checked"
            value={isOpen}
            id={day}
            checked={this.state.checked}
            onChange={this.handleOpen}
          />
          <div className="workday-text">{day}</div>
        </label>
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
