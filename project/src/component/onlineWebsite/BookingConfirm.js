import React from "react";
import forms from "../../img/form.png";
import moment from "moment";
import { connect } from "react-redux";
import calendarImg from "../../img/calendar-2.png";
import timeImg from "../../img/clock.png";
import staffImg from "../../img/staff-avatar.png";
import serviceImg from "../../img/bag.png";
class BookingConfirm extends React.Component {
  render() {
    const {
      selectedService,
      selectedStaff,
      selectedDate,
      startTime
    } = this.props.allState;
    const { handleInfoChange, handleSubmit } = this.props;
    const day = moment(selectedDate).format("YYYY-MM-DD");

    return (
      <React.Fragment>
        <div className="step4-wrapper">
          <div className="booking-confirm">
            <h2>預約項目</h2>
            <div className="booking-confirm-item">
              <img className="icon" src={serviceImg} />
              {selectedService.item}
            </div>
            <div className="booking-confirm-item">
              <img className="icon" src={calendarImg} />
              {day}
            </div>
            <div className="booking-confirm-item">
              <img className="icon" src={timeImg} />
              {startTime.text}
            </div>
            <div className="booking-confirm-item">
              <img className="icon" src={staffImg} />
              {selectedStaff.nickname}
            </div>
            <div className="booking-confirm-img">
              <img className="formimg" src={forms}></img>
            </div>
          </div>
          <form className="customer-info-wrapper" autoComplete="off">
            <div className="form-item">
              <label className="required" htmlFor="name">
                姓名
              </label>
              <input name="name" onChange={handleInfoChange}></input>
            </div>
            <div className="form-item">
              <label className="required" htmlFor="phone">
                聯絡電話
              </label>
              <input name="phone" onChange={handleInfoChange}></input>
            </div>
            <div className="form-item">
              <label className="required" htmlFor="email">
                信箱
              </label>
              <input onChange={handleInfoChange} name="email"></input>
            </div>
            <div className="form-item">
              <label htmlFor="desc">備註</label>
              <textarea
                rows="11"
                onChange={handleInfoChange}
                id="desc"
                name="desc"
              ></textarea>
            </div>
          </form>
        </div>
        <button
          onClick={() => {
            handleSubmit();
          }}
          className="booking-confirm-btn blue-btn"
        >
          確認預約
        </button>
      </React.Fragment>
    );
  }
}
const mapStateToProps = state => {
  return {
    newBooking: state.booking.newBooking,
    bookingMsg: state.booking.bookingMsg
  };
};

export default connect(mapStateToProps)(BookingConfirm);
