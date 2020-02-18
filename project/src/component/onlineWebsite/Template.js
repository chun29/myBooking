import React, { Component, createRef } from "react";
import { compose } from "redux";
import { firestoreConnect } from "react-redux-firebase";
import { connect } from "react-redux";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import "../../style/template.css";
import Service from "./service";
import Staff from "./Staff";
import AvailableTime from "./AvailableTime";
import BookingProcess from "./BookingProcess";
import BookingConfirm from "./BookingConfirm";
import { createBooking } from "../../store/actions/bookingAction";
import Result from "../onlineWebsite/Result";

class Template extends React.Component {
  constructor(props) {
    super(props);
    this.scrollDiv = createRef();
    this.scrollDiv2 = createRef();
    this.state = {
      step: "",
      bookingShow: false,
      serviceShow: false,
      staffShow: false,
      dateShow: false,
      timeShow: false,
      confirmShow: false,
      resultShow: false,
      selectedService: { item: "", id: "" },
      selectedStaff: { name: "", id: "" },
      selectedDate: "",
      bookedDay: "",
      duration: "",
      startTime: { num: "", text: "" },
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
    if (this.state.resultShow == true) {
      window.location.reload(false);
    }
    this.setState(
      {
        serviceShow: true,
        bookingShow: true,
        step: 1
      },
      function() {
        this.scrollDiv.current.scrollIntoView({
          behavior: "smooth"
        });
      }
    );
  };

  selectService = (item, id, duration) => {
    this.setState({
      selectedService: {
        ...this.state.selectedService,
        item,
        id
      },
      duration: duration * 60,
      serviceShow: false,
      staffShow: true,
      step: 2
    });
  };

  selectStaff = (name, id) => {
    this.setState(
      {
        selectedStaff: {
          ...this.state.selectedStaff,
          name,
          id
        },
        serviceShow: false,
        staffShow: false,
        dateShow: true,
        step: 3
      },
      function() {
        this.scrollDiv2.current.scrollIntoView({
          behavior: "smooth"
        });
      }
    );
  };
  selectStartTime = (num, text) => {
    this.setState({
      startTime: {
        ...this.state.startTime,
        num,
        text
      },
      confirmShow: true,
      dateShow: false,
      step: 4
    });
  };

  handleInfoChange = e => {
    this.setState({
      [e.target.name]: e.target.value
    });
  };

  selectStep = step => {
    if (step == 1) {
      this.setState({
        serviceShow: true,
        staffShow: false,
        dateShow: false,
        confirmShow: false,
        step: 1
      });
    } else if (step == 2) {
      if (this.state.selectedService.item.length < 1) {
        return;
      } else {
        this.setState({
          serviceShow: false,
          staffShow: true,
          dateShow: false,
          confirmShow: false,
          step: 2
        });
      }
    } else if (step == 3) {
      if (
        this.state.selectedService.item.length < 1 ||
        this.state.selectedStaff.name.length < 1
      ) {
        return;
      } else {
        this.setState({
          serviceShow: false,
          staffShow: false,
          dateShow: true,
          confirmShow: false,
          step: 3
        });
      }
    } else if (step == 4) {
      if (
        this.state.selectedService.item.length < 1 ||
        this.state.selectedStaff.name.length < 1 ||
        this.state.startTime.num.length < 1
      ) {
        return;
      } else {
        this.setState({
          serviceShow: false,
          staffShow: false,
          dateShow: false,
          confirmShow: true,
          step: 4
        });
      }
    }
  };

  handleSubmit = () => {
    if (
      this.state.name.length > 0 &&
      this.state.phone.length > 0 &&
      this.state.email.length > 0
    ) {
      this.props.createBooking(this.state, this.props.store[0]);

      this.setState({
        confirmShow: false,
        resultShow: true,
        bookingShow: false
      });
    } else {
      alert("資料請填完整");
    }
  };

  render() {
    const id = this.props.match.params && this.props.match.params;

    const data = this.props;
    if (data.store && data.store[0]) {
      if (data.store[0].online) {
        onlineSetup = data.store[0].online.bookingIsOpen;
      }
    }

    let onlineSetup = false;

    if (data.store && data.store[0]) {
      if (data.store[0].online) {
        onlineSetup = data.store[0].online.bookingIsOpen;
      }
    }

    let store;
    let storeCloseDay = [];
    if (data.store && data.store[0].online) {
      const text = data.store[0].online.storeDesc;
      const ntext = (
        <div>
          {text.split("\n").map((i, key) => {
            return <div key={key}>{i}</div>;
          })}
        </div>
      );
      store = {
        bookingIsOpen: data.store[0].online.storeName.bookingIsOpen,
        name: data.store[0].online.storeName,
        address: data.store[0].online.storeAddress,
        phone: data.store[0].online.storePhone,
        desc: ntext,
        note: data.store[0].online.bookingNote,
        startDay: Number(data.store[0].online.bookOpenDay),
        closeDay: Number(data.store[0].online.bookCloseDay),
        logoImg: data.store[0].online.logoSrc,
        bannerImg: data.store[0].online.bannerSrc,
        close: data.store[0].online.storeIsClose,
        isOpen: Object.values(data.store[0].workday.isOpen),
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

    // const view = onlineSetup ? setUp : "loading";
    if (onlineSetup === null) {
      return <div>Loading</div>;
    }
    return (
      <div className="online-container">
        <nav className="online-header">
          <div className="left-header">My 線上預約</div>
          <div className="right-header">查詢 / 取消預約</div>
        </nav>
        <div className="banner-wrapper">
          <div className="banner">
            {store && <img className="banner" src={store.bannerImg} />}
          </div>
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
              <div className="store-desc">
                {store && <div>{store.desc}</div>}
              </div>
            </div>
            <div className="info-section">
              <h3>店家圖片</h3>
              <div className="store-photo-wrapper">
                <div className="store-photo">
                  {store && <img src={store.logoImg} alt="" />}
                </div>
              </div>
            </div>
            <div className="info-section">
              <h3>預約須知</h3>
              <div className="store-desc">{store && <p>{store.note}</p>}</div>
            </div>

            {this.state.bookingShow && (
              <div
                ref={this.scrollDiv}
                className="info-section booking-section"
              >
                <BookingProcess
                  step={this.state.step}
                  selectStep={this.selectStep}
                />
                <div className="booking-step-item">
                  {this.state.serviceShow && (
                    <div>
                      <h3> 選擇服務</h3>
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
                    <div className="booking-step-item">
                      <h3>選擇服務人員</h3>
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
                </div>

                {this.state.dateShow && (
                  <div className="booking-step-date">
                    <h3 ref={this.scrollDiv2}>選擇日期與時間</h3>
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
                      className="datePicker"
                    />
                    {this.state.timeShow && (
                      <div>
                        <h3>可選擇時間</h3>

                        <div className="service-wrapper">
                          <AvailableTime
                            bookedDay={this.state.bookedDay}
                            storeID={id}
                            storeInfo={store}
                            weekDay={this.state.selectedDate}
                            duration={this.state.duration}
                            selectStaff={this.state.selectedStaff}
                            selectStartTime={this.selectStartTime}
                          />
                        </div>
                      </div>
                    )}
                  </div>
                )}
                {this.state.confirmShow && (
                  <div className="booking-step-item-2">
                    <h3>填入顧客資訊</h3>
                    <BookingConfirm
                      allState={this.state}
                      handleInfoChange={this.handleInfoChange}
                      handleSubmit={this.handleSubmit}
                      storeID={id}
                    />
                  </div>
                )}
              </div>
            )}
            {this.state.resultShow && (
              <div className="info-section booking-result-wrapper">
                <Result allState={this.state} />
              </div>
            )}
          </div>
        </div>
        <footer>
          <div className="copyright">
            © 2019 MyBooking All rights researved.
          </div>
        </footer>
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
    createBooking: (booking, store) => dispatch(createBooking(booking, store))
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
