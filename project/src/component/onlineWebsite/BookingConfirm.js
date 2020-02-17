import React, { Component } from "react";
import TextField from "@material-ui/core/TextField";
import Button from "@material-ui/core/Button";
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
    const { handleInfoChange, handleSubmit, storeID } = this.props;
    const day = moment(selectedDate).format("YYYY-MM-DD");

    return (
      <React.Fragment>
        <div className="step4-wrapper">
          <form className="customer-info-wrapper" noValidate autoComplete="off">
            <TextField
              className="customer-info"
              required
              id="standard-required"
              label="姓名"
              onChange={handleInfoChange}
              name="name"
            />
            <TextField
              className="customer-info"
              required
              id="standard-required"
              label="聯絡電話"
              onChange={handleInfoChange}
              name="phone"
            />
            <TextField
              className="customer-info"
              id="standard-required"
              label="信箱"
              required
              onChange={handleInfoChange}
              name="email"
            />
            <TextField
              id="outlined-textarea"
              label="備註"
              rows="4"
              placeholder="Placeholder"
              multiline
              onChange={handleInfoChange}
              name="desc"
            />
          </form>
          <div className="booking-confirm">
            <div>{selectedService.item}</div>
            <div>日期：{day}</div>
            <div>時間：{startTime.text}</div>
            <div>服務人員：{selectedStaff.name}</div>
          </div>
        </div>
        <Button
          onClick={() => {
            handleSubmit(storeID);
          }}
          variant="contained"
          color="secondary"
        >
          確認預約
        </Button>
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
