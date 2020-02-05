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
    name: "",
    service: "",
    server: "",
    desc: "",
    date: new Date()
  };

  handleChange = e => {
    this.setState({
      [e.target.id]: e.target.value
    });
  };
  handleSubmit = e => {
    e.preventDefault();
    this.props.createBooking(this.state, this.props.auth.uid);
    this.props.history.push("/calendar");
  };
  handleDate = date => {
    this.setState({
      date: date
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
        <form className="staff-form" onSubmit={this.handleSubmit}>
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
                <label htmlFor="date">日期</label>
                <DatePicker
                  minDate={new Date()}
                  selected={this.state.date}
                  onChange={this.handleDate}
                />
              </div>
              <div className="form-item">
                <label htmlFor="time">時間</label>
                <DatePicker
                  selected={this.state.date}
                  onChange={this.handleDate}
                  showTimeSelect
                  showTimeSelectOnly
                  timeIntervals={30}
                  timeCaption="Time"
                  dateFormat="h:mm aa"
                />
              </div>
              <div className="form-item">
                <label htmlFor="service">服務</label>
                <select id="service" onChange={this.handleChange}>
                  {serviceArr &&
                    serviceArr.map(service => {
                      return (
                        <option key={service.id} value={service.id}>
                          {service.item} ({service.duration / 60} 小時)
                        </option>
                      );
                    })}
                </select>
              </div>
              <div className="form-item">
                <label htmlFor="name">服務人員</label>
                <select id="server" onChange={this.handleChange}>
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
            </div>
            <div className="form-section">
              <div className="form-item">
                <label htmlFor="desc">加入備註</label>
                <textarea
                  rows="11"
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
  console.log(state);
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
