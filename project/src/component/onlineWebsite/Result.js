import React, { Component } from "react";
import moment from "moment";
import { connect } from "react-redux";
import result from "../../img/result.png";
import contact from "../../img/contact.png";
import confirm from "../../img/confirm.png";
class BookingConfirm extends Component {
  render() {
    const {
      selectedService,
      selectedStaff,
      selectedDate,
      startTime
    } = this.props.allState;

    const day = moment(selectedDate).format("YYYY-MM-DD");
    const { bookingResult } = this.props;
    let view;

    if (bookingResult == 0) {
      view = (
        <div className="result-middle">
          <h3>預約結果確認中</h3>
          <img className="result-img" src={result}></img>
        </div>
      );
    } else if (bookingResult == 1) {
      const data = this.props;
      const name = data.newBooking ? data.newBooking.name : "";
      const email = data.newBooking ? data.newBooking.email : "";
      const ID = data.newBooking ? data.newBooking.id : "";
      view = (
        <React.Fragment>
          <h3 className="result-h1">預約成功</h3>
          <div className="result-success">
            <div className="result-success-1">
              親愛的 <b>{name} </b> 先生/小姐 您好，您的預約資訊如下
            </div>
            <div>預約代碼：{ID}</div>
            <div>日期：{day}</div>
            <div>時間：{startTime.text}</div>
            <div>服務：{selectedService.item}</div>
            <div>服務人員：{selectedStaff.name}</div>
            <div>預約結果已寄到您的信箱：{email}</div>
          </div>
          <img className="result-img" src={confirm}></img>
          <div className="help-msg">
            需要協助嗎？ 聯絡 MyBooking 尋求支援與服務{" "}
            <b>
              <span>mybookingtw@gmail.com</span>
            </b>
          </div>
        </React.Fragment>
      );
    } else {
      view = (
        <div>
          <div className="text-wrapper">
            <h3> 預約結果</h3>
            <div>抱歉！預約失敗，請重新預約或聯絡商家</div>
          </div>

          <img className="result-img" src={contact}></img>
          <div>
            需要協助嗎？ 聯絡 MyBooking 尋求支援與服務{" "}
            <b>
              <span>mybookingtw@gmail.com</span>
            </b>
          </div>
        </div>
      );
    }

    return <React.Fragment>{view}</React.Fragment>;
  }
}
const mapStateToProps = state => {
  return {
    newBooking: state.booking.newBooking,
    bookingMsg: state.booking.bookingMsg,
    bookingResult: state.booking.bookingResult
  };
};

// export default BookingConfirm;

export default connect(mapStateToProps)(BookingConfirm);
