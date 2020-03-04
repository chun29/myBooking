import React from "react";
import moment from "moment";
import "../../style/staff.css";
import calendar from "../../img/calendar-2.png";
import Day from "../shops/Day";

class CalendarPart extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      dateObject: moment(),
      allMonths: moment.months(),
      showDateTable: true
    };
  }

  render() {
    const { storeID } = this.props;
    const staffInfo = this.props.staffs;
    const serviceInfo = this.props.services;
    const bookingInfo =
      this.props.bookings &&
      this.props.bookings.sort(function(a, b) {
        return a.startTime - b.startTime;
      });

    const bookingList =
      bookingInfo &&
      staffInfo &&
      serviceInfo &&
      bookingInfo.map(booking => {
        let time = "";

        let hh = Math.floor(booking.startTime);
        let mm = (booking.startTime * 60) % 60;
        time = hh + ":" + ("0" + mm).slice(-2) + " ";

        const staff =
          staffInfo &&
          staffInfo.filter(staff => staff.id === booking.selectedStaff);

        const service =
          serviceInfo &&
          serviceInfo.filter(service => service.id === booking.selectedService);

        let date = new Date(booking.selectedDate.seconds * 1000);

        const { name, phone, email, desc, duration } = booking;
        const id = booking.id;

        let bookingMinutes;
        if (date.getMinutes() == 0) {
          bookingMinutes = "00";
        } else {
          bookingMinutes = date.getMinutes();
        }

        return {
          staff: staff[0] && staff[0].name,
          staffColor: staff[0] && staff[0].color,
          service: service[0] && service[0].item,
          date: date.getDate(),
          month: date.getMonth() + 1,
          hours: date.getHours(),
          minutes: bookingMinutes,
          duration: duration / 60 + "小時",
          time,
          name,
          id,
          phone,
          email,
          desc
        };
      });

    // Mon~Sun
    let weekday = moment.weekdaysShort().map((day, i) => {
      return (
        <th key={i} className="week-day">
          {day}
        </th>
      );
    });

    // The first weekday of a month
    const firstDayOfMonth = () => {
      let dateObject = this.state.dateObject;
      let firstDay = moment(dateObject)
        .startOf("month")
        .format("d");
      return firstDay;
    };

    // Create a blank area before filling the first date of the month
    let blanks = [];
    for (let i = 0; i < firstDayOfMonth(); i++) {
      blanks.push(<td className="calendar-day empty">{""}</td>);
    }

    let daysInMonth = [];

    for (let d = 1; d <= moment(this.state.dateObject).daysInMonth(); d++) {
      let currentDay = d == moment().date() ? "today" : "";
      const datas =
        bookingList &&
        bookingList.filter(
          data =>
            data.month == moment(this.state.dateObject).month() + 1 &&
            data.date == d
        );

      daysInMonth.push(
        <td id={d} key={d} className={`calendar-day ${currentDay}`}>
          <div className="day-text">{d}</div>
          <div className="day-bookings">
            {datas &&
              datas.map((data, i) => {
                return (
                  <React.Fragment key={i}>
                    <Day data={data} storeID={storeID} />
                  </React.Fragment>
                );
              })}
          </div>
        </td>
      );
    }

    let totalSlots = [...blanks, ...daysInMonth];
    let rows = [];
    let cells = [];

    totalSlots.forEach((row, i) => {
      if (i % 7 !== 0) {
        cells.push(row); // if index not equal 7 that means not go to next week
      } else {
        rows.push(cells); // when reach next week we contain all td in last week to rows
        cells = []; // empty container
        cells.push(row); // in current loop we still push current row to new container
      }
      if (i === totalSlots.length - 1) {
        // when end loop we add remain date
        rows.push(cells);
      }
    });

    let daysinmonth = rows.map((d, i) => {
      return <tr key={i}>{d}</tr>;
    });

    return (
      <div className="calendar-main-wrapper">
        <div className="calendar-header">
          <span
            className="button-prev"
            onClick={e => {
              this.setPrevMonth();
            }}
          >
            ◀︎
          </span>
          <div className="calendar-icon">
            <div className="calendar-icon-1">
              <img src={calendar} alt="calendar-icon" />
            </div>

            <div className="calendar-icon-2">
              <span>{this.state.dateObject.format("MMMM")} </span>
            </div>
          </div>
          <span
            className="button-next"
            onClick={e => {
              this.setNextMonth();
            }}
          >
            ▶︎
          </span>
        </div>

        {this.state.showDateTable && (
          <table className="calendar-table">
            <thead>
              <tr>{weekday}</tr>
            </thead>
            <tbody>{daysinmonth}</tbody>
          </table>
        )}
      </div>
    );
  }
  setMonth = month => {
    let monthNo = this.state.allMonths.indexOf(month);
    let dateObject = Object.assign({}, this.state.dateObject);
    dateObject = moment(dateObject).set("month", monthNo); // change month value
    this.setState({
      dateObject: dateObject,
      showMonthTable: false,
      showDateTable: true
    });
  };

  setPrevMonth = () => {
    let dateObject = Object.assign({}, this.state.dateObject);
    dateObject = moment(dateObject).set(
      "month",
      this.state.dateObject.month() - 1
    ); // change month value
    this.setState({
      dateObject: dateObject
    });
  };

  setNextMonth = () => {
    let dateObject = Object.assign({}, this.state.dateObject);
    dateObject = moment(dateObject).set(
      "month",
      this.state.dateObject.month() + 1
    ); // change month value
    this.setState({
      dateObject: dateObject
    });
  };
}

export default CalendarPart;
