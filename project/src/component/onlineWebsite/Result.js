import React from "react";
import { connect } from "react-redux";
import result from "../../img/result.png";
import contact from "../../img/contact.png";
import confirm from "../../img/confirm.png";
import { getFormatYMD } from "../../lib";

class BookingConfirm extends React.Component {
  render() {
    const {
      selectedService,
      selectedStaff,
      selectedDate,
      startTime
    } = this.props.allState;

    const day = getFormatYMD(selectedDate);
    const { bookingResult } = this.props;

    if (bookingResult == 0) {
      return (
        <div className="result-middle">
          <h5>預約結果確認中</h5>
          <img className="result-img" src={result}></img>
        </div>
      );
    } else if (bookingResult == 1) {
      const data = this.props;
      const name = data.newBooking ? data.newBooking.name : "";
      const email = data.newBooking ? data.newBooking.email : "";
      const ID = data.newBooking ? data.newBooking.id : "";
      return (
        <React.Fragment>
          <h5>預約成功</h5>
          <div className="result-success">
            <div className="result-success-1">
              親愛的 <b>{name} </b> 先生/小姐 您好，您的預約資訊如下
            </div>
            <div>
              <b>預約代碼</b>：{ID}
            </div>
            <div>
              <b>日期</b>：{day}
            </div>
            <div>
              <b>時間</b>：{startTime.text}
            </div>
            <div>
              <b>服務</b>：{selectedService.item}
            </div>
            <div>
              <b>服務人員</b>：{selectedStaff.nickname}
            </div>
            <div>
              預約結果已寄到您的信箱 <b>{email}</b>
            </div>
          </div>
          <img className="result-img" src={confirm}></img>
          <div className="help-msg">
            需要協助嗎？ 聯絡 MyBooking 尋求支援與服務
            <b>
              <span>mybookingtw@gmail.com</span>
            </b>
          </div>
        </React.Fragment>
      );
    } else {
      return (
        <div>
          <div className="text-wrapper">
            <h3> 預約結果</h3>
            <div>抱歉！預約失敗，請重新預約或聯絡商家</div>
          </div>

          <img className="result-img" src={contact}></img>
          <div>
            需要協助嗎？ 聯絡 MyBooking 尋求支援與服務
            <b>
              <span>mybookingtw@gmail.com</span>
            </b>
          </div>
        </div>
      );
    }
  }
}
const mapStateToProps = state => {
  return {
    newBooking: state.booking.newBooking,
    bookingMsg: state.booking.bookingMsg,
    bookingResult: state.booking.bookingResult
  };
};

export default connect(mapStateToProps)(BookingConfirm);
