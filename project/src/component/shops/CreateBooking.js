import React, { Component } from "react";
import { connect } from "react-redux";
import { createBooking } from "../../store/actions/bookingAction";

class CreateBooking extends Component {
  state = {
    name: "",
    service: "",
    server: "",
    date: "",
    desc: ""
  };
  handleChange = e => {
    this.setState({
      [e.target.id]: e.target.value
    });
  };
  handleSubmit = e => {
    e.preventDefault();
    this.props.createBooking(this.state);
  };
  render() {
    return (
      <div>
        <div>
          <h1>新增預約</h1>

          <form className="signin-input" onSubmit={this.handleSubmit}>
            <div>
              <label htmlFor="name">姓名</label>
              <input
                placeholder="姓名"
                id="name"
                onChange={this.handleChange}
              ></input>
            </div>
            <div>
              <label htmlFor="name">服務</label>
              <input
                placeholder="服務"
                id="service"
                onChange={this.handleChange}
              ></input>
            </div>

            <div>
              <label htmlFor="name">服務人員</label>
              <input
                placeholder="服務人員"
                id="server"
                onChange={this.handleChange}
              ></input>
            </div>

            <div>
              <label htmlFor="desc">備註</label>
              <textarea id="desc" onChange={this.handleChange}></textarea>
            </div>

            <button className="signin-btn">新增</button>
          </form>
        </div>
      </div>
    );
  }
}

const mapDispatchToProps = dispatch => {
  return {
    createBooking: booking => dispatch(createBooking(booking))
  };
};

export default connect(null, mapDispatchToProps)(CreateBooking);
