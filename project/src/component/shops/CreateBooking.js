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
    selectedService: { item: "", id: "0" },
    selectedStaff: { name: "", id: "0" },
    selectedDate: "",
    bookedDay: "",
    duration: "",
    startTime: { num: "", text: "" },
    name: "",
    phone: "",
    email: "",
    desc: "",
    error: {
      name: false,
      phone: false,
      selectedDate: false,
      selectedService: false,
      selectedStaff: false
    }
  };

  handleChange = e => {
    if (e.target.id === "phone") {
      if (isNaN(e.target.value)) {
        this.setState(prevState => ({
          error: {
            ...prevState.error,
            phone: true
          }
        }));
      } else {
        this.setState(prevState => ({
          error: {
            ...prevState.error,
            phone: false
          }
        }));
      }
    }

    if (e.target.id === "name") {
      this.setState(prevState => ({
        error: {
          ...prevState.error,
          name: false
        }
      }));
    }
    this.setState({
      [e.target.id]: e.target.value
    });
  };
  selectStaff = e => {
    const name = e.target.options[e.target.selectedIndex].getAttribute("name");
    this.setState({
      selectedStaff: {
        ...this.state.selectedStaff,
        id: e.target.value,
        name: name
      },
      error: {
        ...this.state.error,
        selectedStaff: false
      }
    });
  };

  handleEndTime = e => {
    const duration = e.target.options[e.target.selectedIndex].getAttribute(
      "time"
    );
    const item = e.target.options[e.target.selectedIndex].getAttribute("item");

    this.setState({
      duration: duration,
      selectedService: {
        ...this.state.selectedService,
        id: e.target.value,
        item
      },
      error: {
        ...this.state.error,
        selectedService: false
      }
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

    const hour = date.getHours();
    let time;
    if (date.getMinutes() == 0) {
      time = hour;
    } else {
      time = hour + 0.5;
    }

    this.setState({
      selectedDate: date,
      startTime: {
        ...this.state.startTime,
        num: time
      },
      error: {
        ...this.state.error,
        selectedDate: false
      },
      bookedDay: bookedDay
    });
  };
  handleCancel = e => {
    this.props.history.push("/calendar");
  };
  handleSubmit = e => {
    e.preventDefault();
    if (this.state.name.length < 1) {
      this.setState(prevState => ({
        error: {
          ...prevState.error,
          name: true
        }
      }));
    }
    if (this.state.phone.length < 1) {
      this.setState(prevState => ({
        error: {
          ...prevState.error,
          phone: true
        }
      }));
    }

    if (this.state.selectedDate.length < 1) {
      this.setState(prevState => ({
        error: {
          ...prevState.error,
          selectedDate: true
        }
      }));
    }

    if (this.state.duration.length < 1) {
      this.setState(prevState => ({
        error: {
          ...prevState.error,
          selectedService: true
        }
      }));
    }
    if (this.state.selectedStaff.name.length < 1) {
      this.setState(prevState => ({
        error: {
          ...prevState.error,
          selectedStaff: true
        }
      }));
    }
    if (
      this.state.name.length > 0 &&
      this.state.phone.length > 0 &&
      this.state.selectedStaff.name.length > 0 &&
      this.state.duration.length > 0 &&
      this.state.bookedDay.length > 0
    ) {
      const store = this.props.store[0]
        ? this.props.store[0]
        : { id: this.props.auth.uid };
      this.props.createBooking(this.state, store);
      this.props.history.push("/calendar");
    }
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
                <label className="required" htmlFor="name">
                  顧客姓名
                  {this.state.error.name && (
                    <span className="alert-msg">名稱請填寫完整</span>
                  )}
                </label>
                <input
                  placeholder="e.g. 王小美"
                  id="name"
                  onChange={this.handleChange}
                ></input>
              </div>
              <div className="form-item">
                <label className="required" htmlFor="name">
                  顧客電話
                  {this.state.error.phone && (
                    <span className="alert-msg">請填入完整聯絡電話</span>
                  )}
                </label>
                <input
                  placeholder="e.g. 0988123456"
                  id="phone"
                  onChange={this.handleChange}
                ></input>
              </div>
              <div className="form-item">
                <label htmlFor="name">顧客信箱</label>
                <input
                  placeholder="e.g. customer@gmail.com"
                  id="email"
                  onChange={this.handleChange}
                ></input>
              </div>

              <div className="form-item">
                <label className="required" htmlFor="date">
                  日期
                  {this.state.error.selectedDate && (
                    <span className="alert-msg">請選擇日期與時間</span>
                  )}
                </label>
                <DatePicker
                  minDate={new Date()}
                  selected={this.state.selectedDate}
                  onChange={this.handleDate}
                  placeholderText="請選擇日期"
                />
              </div>
              <div className="form-item">
                <label className="required" htmlFor="time">
                  時間
                  {this.state.error.selectedDate && (
                    <span className="alert-msg">請選擇日期與時間</span>
                  )}
                </label>
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
                <label className="required" htmlFor="selectService">
                  選擇服務
                  {this.state.error.selectedService && (
                    <span className="alert-msg">請選擇服務</span>
                  )}
                </label>
                <select
                  className="all-select"
                  id="selectedService"
                  onChange={this.handleEndTime}
                  value={this.state.selectedService.id}
                >
                  <option disabled value="0">
                    -- 請選擇服務 --
                  </option>
                  {serviceArr &&
                    serviceArr.map(service => {
                      return (
                        <option
                          key={service.id}
                          value={service.id}
                          time={service.duration}
                          item={service.item}
                        >
                          {service.item} ({service.duration / 60} 小時)
                        </option>
                      );
                    })}
                </select>
              </div>

              <div className="form-item">
                <label className="required" htmlFor="selectStaff">
                  服務人員
                  {this.state.error.selectedStaff && (
                    <span className="alert-msg">請選擇服務人員</span>
                  )}
                </label>
                <select
                  value={this.state.selectedStaff.id}
                  className="all-select"
                  id="selectedStaff"
                  onChange={this.selectStaff}
                >
                  <option disabled value="0">
                    -- 請選擇服務人員 --
                  </option>
                  {staffArr &&
                    staffArr.map(staff => {
                      return (
                        <option
                          key={staff.id}
                          value={staff.id}
                          name={staff.name}
                        >
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

          <div className="form-button-wrapper">
            <button onClick={this.handleCancel} className="cancel-staff-button">
              取消
            </button>
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
    store: state.firestore.ordered.store,
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
        doc: props.auth.uid
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
