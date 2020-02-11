import React, { Component, createRef } from "react";
import { compose } from "redux";
import { firestoreConnect } from "react-redux-firebase";
import { connect } from "react-redux";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import "../../style/template.css";
import storePhoto from "../../img/banner.jpg";
import Service from "./service";
import Staff from "./Staff";
import AvailableTime from "./AvailableTime";

class Template extends React.Component {
  constructor(props) {
    super(props);
    this.scrollDiv = createRef();
    this.scrollDiv2 = createRef();
    this.state = {
      serviceShow: false,
      staffShow: false,
      dateShow: false,
      timeShow: false,
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
  }

  handleChange = date => {
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

    this.setState({
      selectedDate: date,
      bookedDay: bookedDay
    });
    if (this.state.timeShow == false) {
      this.setState({
        timeShow: true
      });
    }
  };
  showBooking = () => {
    this.setState(
      {
        serviceShow: true,
        staffShow: true,
        dateShow: true
      },
      function() {
        this.scrollDiv.current.scrollIntoView({
          behavior: "smooth"
        });
      }
    );
  };

  selectStaff = (e, id) => {
    this.setState(
      {
        selectedStaff: id
      },
      function() {
        this.scrollDiv2.current.scrollIntoView({
          behavior: "smooth"
        });
      }
    );
  };
  selectService = (e, duration) => {
    this.setState({
      selectedService: e,
      duration: duration * 60,
      timeShow: true
    });
  };

  render() {
    const id = "3IYjMjG5ejTCoyfQ6FYapwJsMaA3";
    console.log(this.props.match.params);
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
      //Book time fake data
      const bookedTime = [
        [8, 8.5],
        [8.5, 9],
        [10.5, 11],
        [11.5, 12],
        [13.5, 14],
        [14, 14.5]
      ];
      // 由 open time and close time 生成全部時段 array

      let times = []; // time array
      let start = Number(store.openTime.friday); // start time
      let close = 17;
      const duration = 90;
      let length = (close - start) * 2;

      // 全部時間 array 格式 [[開始時間],[結束時間],...]
      for (let i = 0; i < length; i++) {
        let t = [];
        t[0] = start;
        t[1] = start + 0.5;
        times.push(t);
        start = start + 0.5;
      }
      //篩出全部時間-已預定的時間
      function arr_diff(a1, a2) {
        var a = [],
          diff = [];

        for (var i = 0; i < a1.length; i++) {
          a[a1[i]] = true;
        }

        for (var i = 0; i < a2.length; i++) {
          if (a[a2[i]]) {
            delete a[a2[i]];
          } else {
            a[a2[i]] = true;
          }
        }

        for (var k in a) {
          diff.push(k);
        }

        return diff;
      }
      let availableArr = arr_diff(bookedTime, times).map(e => e.split(","));
      // console.log(availableArr);

      // 最終時間 Arr
      let finalArr = [];

      for (let i = 0; i < availableArr.length - (duration / 30 - 1); i++) {
        if (
          Number(availableArr[i][0]) + duration / 60 ===
          Number(availableArr[i + (duration / 30 - 1)][1])
        ) {
          const data = Number(availableArr[i][0]);
          finalArr.push(data);
        }
      }
      // console.log(finalArr);

      // 生成btn
      let finalBtn = [];
      for (let i = 0; i < finalArr.length; i++) {
        let time;
        if (finalArr[i] == 12) {
          time = "12:00 PM";
        } else {
          let hh = Math.floor(finalArr[i]); // getting hours of day in 0-24 format
          let mm = (finalArr[i] * 60) % 60; // getting minutes of the hour in 0-55 format
          let ap = ["AM", "PM"]; // AM-PM
          time =
            ("0" + (hh % 12)).slice(-2) +
            ":" +
            ("0" + mm).slice(-2) +
            " " +
            ap[Math.floor(hh / 12)];
        }
        finalBtn.push(time);
      }

      return (
        <div>
          {finalBtn.map((time, i) => {
            return <button key={i}>{time}</button>;
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
              <div className="store-photo-wrapper">
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
                <h3 ref={this.scrollDiv}>服務</h3>
                <div className="service-wrapper">
                  {serviceArr.map((service, i) => {
                    return (
                      <Service
                        key={i}
                        service={service}
                        selectService={this.selectService}
                        selectedService={this.state.selectedService}
                      />
                    );
                  })}
                </div>
              </div>
            )}
            {this.state.staffShow && (
              <div className="info-section">
                <h3>服務人員</h3>
                <div className="service-wrapper">
                  {staffArr.map((staff, i) => {
                    return (
                      <Staff
                        key={i}
                        staff={staff}
                        selectStaff={this.selectStaff}
                        selectedStaff={this.state.selectedStaff}
                      />
                    );
                  })}
                </div>
              </div>
            )}
            {this.state.dateShow && (
              <div className="info-section">
                <h3 ref={this.scrollDiv2}>選擇日期</h3>
                <DatePicker
                  selected={this.state.selectedDate}
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
            {this.state.timeShow && (
              <div className="info-section">
                <h3>時間</h3>

                <div className="service-wrapper">
                  <AvailableTime
                    bookedDay={this.state.bookedDay}
                    storeID={id}
                    storeInfo={store}
                    weekDay={this.state.selectedDate}
                    duration={this.state.duration}
                    selectStaff={this.state.selectedStaff}
                  />
                </div>
              </div>
            )}
            {/* {store && <div>{timeArea()}</div>} */}
          </div>
        </div>
      </div>
    );
  }
}

const mapStateToProps = state => {
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
    const uid = props.match.params.id;

    return [
      {
        collection: "store",
        doc: uid,
        subcollections: [{ collection: "staff" }],
        storeAs: "staff"
      },
      {
        collection: "store",
        doc: uid,
        subcollections: [{ collection: "service" }],
        storeAs: "service"
      },
      {
        collection: "store",
        doc: uid
      }
    ];
  })
)(Template);
