import React from "react";
import { connect } from "react-redux";
import { deleteBooking } from "../../store/actions/bookingAction";
import close from "../../img/close.png";
import event from "../../img/event.png";

class CalendarDay extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      showDetail: false
    };
  }

  toggleDetail(e, boolean) {
    e.preventDefault();
    this.setState({
      showDetail: boolean
    });
  }
  deleteBooking = (id, storeID) => {
    this.props.deleteBooking(id, storeID);
  };

  render() {
    const { bookingInfo, storeID } = this.props;

    return (
      <React.Fragment>
        <div
          className="booking-text"
          style={{ backgroundColor: bookingInfo.staffColor }}
          onClick={e => {
            this.toggleDetail(e, true);
          }}
        >
          {bookingInfo.time}
          {bookingInfo.service}
        </div>
        {this.state.showDetail && (
          <div className="toolTip-bg">
            <span className="toolTip">
              <div
                onClick={e => {
                  this.toggleDetail(e, false);
                }}
              >
                <img className="close-img" src={close} />
              </div>
              <div className="toolTip-header-container">
                <img src={event} />
                <h4>預約資訊</h4>
              </div>

              <div>
                <b>預約編號</b>：{bookingInfo.id}
              </div>
              <div>
                <b>預約時間</b>：{bookingInfo.timeText}
              </div>
              <div>
                <b>服務時間</b>：{bookingInfo.duration}
              </div>
              <div>
                <b>服務人員</b>：{bookingInfo.staff}
              </div>
              <div>
                <b>顧客姓名</b>：{bookingInfo.name}
              </div>
              <div>
                <b>顧客電話</b>
                <a href={`tel:+${bookingInfo.phone}`}>：{bookingInfo.phone}</a>
              </div>
              <div>
                <b>顧客信箱</b>
                <a href={`mailto:${bookingInfo.email}?subject=預約通知`}>
                  ：{bookingInfo.email}
                </a>
              </div>
              <div>
                <b>備註</b>：{bookingInfo.desc}
              </div>
              <button
                className="booking-delete-btn"
                onClick={() => {
                  this.deleteBooking(bookingInfo.id, storeID);
                }}
              >
                刪除預約
              </button>
            </span>
          </div>
        )}
      </React.Fragment>
    );
  }
}
const mapDispatchToProps = dispatch => {
  return {
    deleteBooking: (bookingID, storeId) =>
      dispatch(deleteBooking(bookingID, storeId))
  };
};
export default connect(null, mapDispatchToProps)(CalendarDay);
