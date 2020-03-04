import React, { createRef } from "react";
import { compose } from "redux";
import { firestoreConnect } from "react-redux-firebase";
import { connect } from "react-redux";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import "../../style/template.css";
import Service from "./service";
import Staff from "./Staff";
import AvailableTime from "./AvailableTime";
import { BookingProcess } from "./BookingProcess";
import BookingConfirm from "./BookingConfirm";
import { createBooking } from "../../store/actions/bookingAction";
import Result from "../onlineWebsite/Result";
import { Link } from "react-router-dom";
import Loading from "../layout/loading";
import calendar from "../../img/event.png";
import group from "../../img/group.png";
import work from "../../img/work.png";
import notFound from "../../img/notfound.png";
import StoreMap from "../../component/layout/StoreMap";
import storeBanner from "../../img/store-banner.jpg";
import phoneImg from "../../img/telephone.png";
import addressImg from "../../img/address.png";
import Footer from "../layout/Footer";
import userInfoImg from "../../img/portfolio.png";

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
      selectedStaff: { name: "", id: "", nickname: "" },
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
    if (this.state.bookingShow == true || this.state.resultShow == true) {
      window.location.reload(true);
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

  selectStaff = (name, id, nickname) => {
    this.setState({
      selectedStaff: {
        ...this.state.selectedStaff,
        name,
        id,
        nickname
      },
      serviceShow: false,
      staffShow: false,
      dateShow: true,
      step: 3
    });
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
    const { staffs, services, storeInfo } = this.props;
    const id = this.props.match.params && this.props.match.params;

    //Loading
    if (storeInfo == null) {
      return (
        <div>
          <Loading />
        </div>
      );
    }

    //Store Close
    if (
      storeInfo.length < 1 ||
      storeInfo[0].online.bookingIsOpen == false ||
      (storeInfo && storeInfo[0] && storeInfo[0].workday === null) ||
      (staffs && staffs.length < 1) ||
      (services && services.length < 1)
    ) {
      return (
        <div className="online-container">
          <nav className="online-header">
            <Link to="/">
              <div className="left-header">My 線上預約</div>
            </Link>
          </nav>
          <div className="notfound-container">
            <h1>很抱歉，此商店預約頁面關閉中</h1>
            <img className="notfound" src={notFound} />
          </div>
        </div>
      );
    }
    //Store Open
    //Get Close Day
    let store;
    let storeCloseDay = [];
    if (storeInfo && storeInfo[0].online) {
      const text = storeInfo[0].online.storeDesc;
      const ntext = (
        <div>
          {text.split("\n").map((i, key) => {
            return <div key={key}>{i}</div>;
          })}
        </div>
      );
      store = {
        bookingIsOpen: storeInfo[0].online.storeName.bookingIsOpen,
        name: storeInfo[0].online.storeName,
        address: storeInfo[0].online.storeAddress,
        phone: storeInfo[0].online.storePhone,
        desc: ntext,
        note: storeInfo[0].online.bookingNote,
        startDay: Number(storeInfo[0].online.bookOpenDay),
        closeDay: Number(storeInfo[0].online.bookCloseDay),
        logoImg: storeInfo[0].online.logoSrc,
        bannerImg: storeInfo[0].online.bannerSrc,
        close: storeInfo[0].online.storeIsClose,
        isOpen: Object.values(storeInfo[0].workday.isOpen),
        openTime: storeInfo[0].workday.openTime,
        closeTime: storeInfo[0].workday.closeTime
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

    return (
      <div className="online-container">
        <nav className="online-header">
          <Link to="/">
            <div className="left-header">My 線上預約</div>
          </Link>
        </nav>
        <div className="banner-wrapper">
          <div className="banner">
            {store && (
              <img
                className="banner"
                src={store.bannerImg ? store.bannerImg : storeBanner}
              />
            )}
          </div>
        </div>
        <div className="content">
          <div className="store-info">
            <div className="info-section">
              {store && <h3>{store.name}</h3>}
              <div className="button-wrapper">
                <button className="blue-btn" onClick={this.showBooking}>
                  我要預訂
                </button>
              </div>
              <StoreMap address={store.address} />
              <div className="basic-container">
                <div className="info">
                  <img className="info-icon" src={phoneImg} />
                  {store.phone}
                </div>

                <div className="info">
                  <img className="info-icon" src={addressImg} />
                  {store.address}
                </div>
              </div>

              <hr className="infohr" />

              <div className="store-desc">
                <div>{store.desc}</div>
              </div>
            </div>

            <div className="info-section">
              <h5>店家圖片</h5>
              <div className="store-photo-wrapper">
                <div className="store-photo">
                  <img src={store.logoImg} alt="" />
                </div>
              </div>
            </div>
            <div className="info-section">
              <h5>預約須知</h5>
              <div className="store-desc">
                <p>{store.note}</p>
              </div>
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
                    <React.Fragment>
                      <div className="step-header-wrapper">
                        <img src={work} />
                        <h5> 選擇服務</h5>
                      </div>

                      <div className="service-wrapper">
                        {services.map((service, i) => {
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
                    </React.Fragment>
                  )}

                  {this.state.staffShow && (
                    <div className="booking-step-item">
                      <div className="step-header-wrapper">
                        <img src={group} />
                        <h5>選擇服務人員</h5>
                      </div>

                      <div className="service-wrapper">
                        {staffs.map((staff, i) => {
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
                    <div className="step-header-wrapper">
                      <img src={calendar} />
                      <h5>選擇日期與時間</h5>
                    </div>

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
                    <div className="step-header-wrapper">
                      <img src={userInfoImg} />
                      <h5>填入顧客資訊</h5>
                    </div>

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
        <Footer />
      </div>
    );
  }
}

const mapStateToProps = state => {
  return {
    staffs: state.firestore.ordered.staff,
    services: state.firestore.ordered.service,
    storeInfo: state.firestore.ordered.store
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
