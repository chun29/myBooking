import React, { Component } from "react";
import { compose } from "redux";
import { firestoreConnect } from "react-redux-firebase";
import { connect } from "react-redux";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import "../../style/template.css";
import storePhoto from "../../img/banner.jpg";
import Service from "./service";
import Staff from "./Staff";

class Template extends React.Component {
  state = {
    serviceShow: false,
    staffShow: false,
    dateShow: false,
    service: "",
    staff: "",
    selectDate: "",
    time: ""
  };

  handleChange = date => {
    this.setState({
      selectDate: date
    });
    console.log(this.state.selectDate);
  };
  showBooking = () => {
    this.setState({
      serviceShow: true,
      staffShow: true,
      dateShow: true
    });
  };

  render() {
    const id = "3IYjMjG5ejTCoyfQ6FYapwJsMaA3";

    const data = this.props;
    let store;
    let storeCloseDay = [];
    if (data.store && data.store[0].online) {
      store = {
        name: data.store[0].online.storeName,
        address: data.store[0].online.storeAddress,
        phone: data.store[0].online.storePhone,
        desc: data.store[0].online.storeDesc,
        note: data.store[0].online.bookingDesc,
        startDay: Number(data.store[0].online.startDay),
        closeDay: Number(data.store[0].online.closeDay),
        close: data.store[0].online.storeIsClose,
        isOpen: data.store[0].workday.open,
        openTime: data.store[0].workday.openTime,
        closeTime: data.store[0].workday.closeTime
      };

      for (let i = 0; i < store.isOpen.length; i++) {
        if (store.isOpen[i] === false) {
          storeCloseDay.push(i);
        }
      }
    }
    const isOpenDay = date => {
      const day = date.getDay();
      for (let i = 0; i < storeCloseDay.length; i++) {
        if (day === storeCloseDay[i]) {
          return false;
        }
      }
      return true;
    };

    const staffArr = this.props.staff ? this.props.staff : "";
    const serviceArr = this.props.service ? this.props.service : "";
    const timeArea = () => {
      var x = 30; //minutes interval
      var times = []; // time array
      var tt = store.openTime.friday * 60; // start time
      const close = store.closeTime.friday * 60;
      var ap = ["AM", "PM"]; // AM-PM

      //loop to increment the time and push results in array
      for (var i = 0; tt < close; i++) {
        var hh = Math.floor(tt / 60); // getting hours of day in 0-24 format
        var mm = tt % 60; // getting minutes of the hour in 0-55 format
        times[i] =
          ("0" + (hh % 12)).slice(-2) +
          ":" +
          ("0" + mm).slice(-2) +
          ap[Math.floor(hh / 12)]; // pushing data in array in [00:00 - 12:00 AM/PM format]
        tt = tt + x;
      }

      return (
        <div>
          {times.map(time => {
            return <button>{time}</button>;
          })}
        </div>
      );
    };

    return (
      <div className="online-container">
        <nav className="online-header">
          <div className="left-header">My 線上預約</div>
          <div className="right-header">查詢/修改預約</div>
        </nav>
        <div className="banner-wrapper">
          <div className="banner"></div>
        </div>
        <div className="content">
          <div className="store-info">
            <div className="info-section">
              {store && <h1>{store.name}</h1>}
              <div className="button-wrapper">
                <button className="blue">查看地圖</button>

                <button className="red" onClick={this.showBooking}>
                  我要預訂
                </button>
              </div>
              {store && <div className="info phone">電話：{store.phone}</div>}
              {store && (
                <div className="info address">地址：{store.address}</div>
              )}
              <hr className="infohr" />
              <div className="store-desc">{store && <p>{store.desc}</p>}</div>
            </div>
            <div className="info-section">
              <h3>店家圖片</h3>
              <div class="store-photo-wrapper">
                <div className="store-photo">
                  <img src={storePhoto} alt="" />
                </div>
              </div>
            </div>
            <div className="info-section">
              <h3>預約須知</h3>
              <div className="store-desc">{store && <p>{store.note}</p>}</div>
            </div>
            {this.state.serviceShow && (
              <div className="info-section">
                <h3>服務</h3>
                <div className="service-wrapper">
                  {serviceArr.map(service => {
                    return <Service service={service} />;
                  })}
                </div>
              </div>
            )}
            {this.state.staffShow && (
              <div className="info-section">
                <h3>服務人員</h3>
                <div className="service-wrapper">
                  {staffArr.map(staff => {
                    return <Staff staff={staff} />;
                  })}
                </div>
              </div>
            )}
            {this.state.dateShow && (
              <div className="info-section">
                <h3>選擇日期</h3>
                <DatePicker
                  selected={this.state.selectDate}
                  onChange={this.handleChange}
                  minDate={new Date().setDate(
                    new Date().getDate() + store.closeDay
                  )}
                  maxDate={new Date().setDate(
                    new Date().getDate() + store.startDay
                  )}
                  placeholderText="請選擇日期"
                  filterDate={isOpenDay}
                />
              </div>
            )}
          </div>
        </div>
      </div>
    );
  }
}

const mapStateToProps = state => {
  console.log(state);
  return {
    staff: state.firestore.ordered.staff,
    service: state.firestore.ordered.service,
    store: state.firestore.ordered.store
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
        doc: "3IYjMjG5ejTCoyfQ6FYapwJsMaA3",
        subcollections: [{ collection: "staff" }],
        storeAs: "staff"
      },
      {
        collection: "store",
        doc: "3IYjMjG5ejTCoyfQ6FYapwJsMaA3",
        subcollections: [{ collection: "service" }],
        storeAs: "service"
      },
      {
        collection: "store",
        doc: "3IYjMjG5ejTCoyfQ6FYapwJsMaA3"
      }
    ];
  })
)(Template);
