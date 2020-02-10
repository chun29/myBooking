import React, { Component } from "react";

export default class Test extends Component {
  constructor(props) {
    super(props);
    //state
    this.state = {
      isHover: false
    };
  }
  render() {
    const { data } = this.props;
    return (
      <div
        className="booking-text"
        style={{ backgroundColor: data.serverColor }}
        onMouseEnter={this.onMouseOver.bind(this)}
        onMouseLeave={this.onMouseOut.bind(this)}
      >
        <span className="booking-time-text">
          {data.hours}:{data.minutes}
        </span>
        <span>{data.service}</span>
        {this.state.isHover && (
          <span className="toolTip">
            <h4>預約資訊</h4>
            <div>預約編號：{data.id.substring(0, 4)}</div>
            <div>服務人員：{data.staff}</div>
            <div>顧客姓名：{data.name}</div>
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
