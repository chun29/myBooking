import React, { Component } from "react";
import { connect } from "react-redux";
import { deleteBooking } from "../../store/actions/bookingAction";
class Test extends Component {
  constructor(props) {
    super(props);

    this.state = {
      isHover: false
    };
  }
  deleteBooking = (id, storeID) => {
    this.props.deleteBooking(id, storeID);
  };
  render() {
    const { data, storeID } = this.props;

    const text = data.desc;
    const ntext = text ? (
      <span>
        {text.split("\n").map((i, key) => {
          return <span key={key}>{i}</span>;
        })}
      </span>
    ) : (
      ""
    );
    return (
      <div
        className="booking-text"
        style={{ backgroundColor: data.staffColor }}
        onMouseEnter={this.onMouseOver.bind(this)}
        onMouseLeave={this.onMouseOut.bind(this)}
      >
        {data.time}
        {data.service}
        {this.state.isHover && (
          <span className="toolTip">
            <h4>預約資訊</h4>
            <div>預約編號：{data.id}</div>
            <div>開始時間：{data.time}</div>
            <div>服務時間：{data.duration}</div>
            <div>服務人員：{data.staff}</div>
            <div>顧客姓名：{data.name}</div>
            <div>顧客電話：{data.phone}</div>
            <div>顧客信箱：{data.email}</div>
            <div>備註：{ntext}</div>
            <button
              className="booking-delete-btn"
              onClick={() => {
                this.deleteBooking(data.id, storeID);
              }}
            >
              刪除預約
            </button>
          </span>
        )}
      </div>
    );
  }
  onMouseOver(e) {
    this.setState({
      isHover: true
    });
  }

  onMouseOut(e) {
    this.setState({
      isHover: false
    });
  }
}
const mapDispatchToProps = dispatch => {
  return {
    deleteBooking: (bookingID, storeId) =>
      dispatch(deleteBooking(bookingID, storeId))
  };
};
export default connect(null, mapDispatchToProps)(Test);
