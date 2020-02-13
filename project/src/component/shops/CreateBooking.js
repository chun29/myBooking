import React, { Component } from "react";
import { compose } from "redux";
import { firestoreConnect } from "react-redux-firebase";
import { connect } from "react-redux";
import { createBooking } from "../../store/actions/bookingAction";
import DatePicker from "react-datepicker";
import "..//../style/createstaff.css";
import "react-datepicker/dist/react-datepicker.css";

class CreateBooking extends Component {
  state = {
    selectedService: "",
    selectedStaff: "",
    selectedDate: "",
    bookedDay: "",
    duration: "",
    startTime: "",
    name: "",
    phone: "",
    email: "",
    desc: ""
  };

  handleChange = e => {
    this.setState({
      [e.target.id]: e.target.value
    });
  };
  handleSubmit = e => {
    e.preventDefault();
    console.log(this.state);
    console.log(this.props.auth.uid);
    this.props.createBooking(this.state, this.props.auth.uid);
    this.props.history.push("/calendar");
  };
  handleEndTime = e => {
    const duration = e.target.options[e.target.selectedIndex].getAttribute(
      "time"
    );

    this.setState({
      duration: duration,
      selectedService: e.target.value
    });
  };
  handleDate = date => {
    let month;
    let day;
    if (date.getMonth() + 1 < 10) {
      month = "0" + (date.getMonth() + 1);
    } else {
      month = String(date.getMonth() + 1);
    }
    if (date.getDate() < 10) {
      day = "0" + date.getDate();
    } else {
      day = String(date.getDate());
    }

    const bookedDay = String(date.getFullYear()) + month + day;
    console.log(bookedDay);

    const hour = date.getHours();
    let time;
    if (date.getMinutes() == 0) {
      time = hour;
    } else {
      time = hour + 0.5;
    }
    console.log(time);
    this.setState({
      selectedDate: date,
      startTime: time,
      bookedDay: bookedDay
    });
  };

  render() {
    const staffArr = this.props.staff ? this.props.staff : "";
    const serviceArr = this.props.service ? this.props.service : "";

    return (
      <div className="createstaff-wrapper">
        <div className="createstaff-header">
          <h1>新增預約</h1>
        </div>
        <form
          autoComplete="off"
          className="staff-form"
          onSubmit={this.handleSubmit}
        >
          <div className="input-wrapper">
            <div className="form-section">
              <div className="form-item">
                <label htmlFor="name">預約者</label>
                <input
                  placeholder="e.g. 王小美"
                  id="name"
                  onChange={this.handleChange}
                ></input>
              </div>
              <div className="form-item">
                <label htmlFor="name">預約者電話</label>
                <input
                  placeholder="e.g. 0988123456"
                  id="phone"
                  onChange={this.handleChange}
                ></input>
              </div>
              <div className="form-item">
                <label htmlFor="name">預約者 Email</label>
                <input
                  placeholder="e.g. customer@gmail.com"
                  id="email"
                  onChange={this.handleChange}
                ></input>
              </div>

              <div className="form-item">
                <label htmlFor="date">日期</label>
                <DatePicker
                  minDate={new Date()}
                  selected={this.state.selectedDate}
                  onChange={this.handleDate}
                  placeholderText="請選擇日期"
                />
              </div>
              <div className="form-item">
                <label htmlFor="time">時間</label>
                <DatePicker
                  selected={this.state.selectedDate}
                  placeholderText="請選擇時間"
                  onChange={this.handleDate}
                  showTimeSelect
                  showTimeSelectOnly
                  timeIntervals={30}
                  timeCaption="Time"
                  dateFormat="h:mm aa"
                />
              </div>
            </div>
            <div className="form-section">
              <div className="form-item">
                <label htmlFor="selectService">選擇服務</label>
                <select id="selectedService" onChange={this.handleEndTime}>
                  <option disabled selected value>
                    -- 請選擇服務 --
                  </option>
                  {serviceArr &&
                    serviceArr.map(service => {
                      return (
                        <option
                          key={service.id}
                          value={service.id}
                          time={service.duration}
                        >
                          {service.item} ({service.duration / 60} 小時)
                        </option>
                      );
                    })}
                </select>
              </div>

              <div className="form-item">
                <label htmlFor="selectStaff">服務人員</label>
                <select id="selectedStaff" onChange={this.handleChange}>
                  <option disabled selected value>
                    -- 請選擇服務人員 --
                  </option>
                  {staffArr &&
                    staffArr.map(staff => {
                      return (
                        <option key={staff.id} value={staff.id}>
                          {staff.name}
                        </option>
                      );
                    })}
                </select>
              </div>

              <div className="form-item">
                <label htmlFor="desc">加入備註</label>
                <textarea
                  rows="10"
                  id="desc"
                  onChange={this.handleChange}
                ></textarea>
              </div>
            </div>
          </div>

          <div className="button-wrapper">
            <button className="cancel-staff-button">取消</button>
            <button className="create-staff-button">新增</button>
          </div>
        </form>
      </div>
    );
  }
}
const mapStateToProps = state => {
  return {
    staff: state.firestore.ordered.staff,
    service: state.firestore.ordered.service,
    auth: state.firebase.auth
  };
};

const mapDispatchToProps = dispatch => {
  return {
    createBooking: (booking, id) => dispatch(createBooking(booking, id))
  };
};

export default compose(
  connect(mapStateToProps, mapDispatchToProps),
  firestoreConnect(props => {
    return [
      {
        collection: "store",
        doc: props.auth.uid,
        subcollections: [{ collection: "staff" }],
        storeAs: "staff"
      },
      {
        collection: "store",
        doc: props.auth.uid,
        subcollections: [{ collection: "service" }],
        storeAs: "service"
      }
    ];
  })
)(CreateBooking);
