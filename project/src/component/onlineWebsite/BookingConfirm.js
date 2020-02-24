import React, { Component } from "react";
import forms from "../../img/form.png";
import moment from "moment";
import { connect } from "react-redux";
class BookingConfirm extends Component {
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
            <div className="booking-confirm-item">{selectedService.item}</div>
            <div className="booking-confirm-item">日期：{day}</div>
            <div className="booking-confirm-item">時間：{startTime.text}</div>
            <div className="booking-confirm-item">
              服務人員：{selectedStaff.name}
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
          className="booking-confirm-btn"
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

// export default BookingConfirm;

export default connect(mapStateToProps)(BookingConfirm);
