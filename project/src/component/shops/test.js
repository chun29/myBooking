import React, { Component } from "react";
import { connect } from "react-redux";
import { deleteBooking } from "../../store/actions/bookingAction";
import close from "../../img/close.png";
import event from "../../img/event.png";

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
      <React.Fragment>
        <div
          className="booking-text"
          style={{ backgroundColor: data.staffColor }}
          // onMouseEnter={this.onMouseOver.bind(this)}
          // onMouseLeave={this.onMouseOut.bind(this)}
          onClick={this.onMouseOver.bind(this)}
        >
          {data.time}
          {data.service}
        </div>
        {this.state.isHover && (
          <div className="toolTip-bg">
            <span className="toolTip">
              <div onClick={this.onMouseOut.bind(this)}>
                <img className="close-img" src={close} />
              </div>
              <div className="toolTip-header-container">
                <img src={event} />
                <h4>預約資訊</h4>
              </div>

              <div>
                <b>預約編號</b>：{data.id}
              </div>
              <div>
                <b>開始時間</b>：{data.time}
              </div>
              <div>
                <b>服務時間</b>：{data.duration}
              </div>
              <div>
                <b>服務人員</b>：{data.staff}
              </div>
              <div>
                <b>顧客姓名</b>：{data.name}
              </div>
              <div>
                <b>顧客電話</b>：{data.phone}
              </div>
              <div>
                <b>顧客信箱</b>：{data.email}
              </div>
              <div>
                <b>備註</b>：{ntext}
              </div>
              <button
                className="booking-delete-btn"
                onClick={() => {
                  this.deleteBooking(data.id, storeID);
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
  onMouseOver(e) {
    console.log("click");
    this.setState({
      isHover: true
    });
  }

  onMouseOut(e) {
    console.log("click");
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
