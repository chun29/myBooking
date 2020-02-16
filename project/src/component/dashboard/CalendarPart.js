import React from "react";
import moment, { months } from "moment";
import "../../style/staff.css";
import calendar from "../../img/calendar-2.png";
import Test from "../shops/test";

class CalendarPart extends React.Component {
  constructor(props) {
    super(props);
    //state
    this.state = {
      dateObject: moment(),
      allMonths: moment.months(),
      showDateTable: true
    };
  }

  //Html + function
  render() {
    const { storeID } = this.props;
    const staffInfo = this.props.staffs;
    const serviceInfo = this.props.services;
    const bookingInfo =
      this.props.bookings &&
      this.props.bookings.sort(function(a, b) {
        return a.selectedDate.seconds - b.selectedDate.seconds;
      });
    const bookingList =
      bookingInfo &&
      staffInfo &&
      serviceInfo &&
      bookingInfo.map(booking => {
        let time = "";
        if (booking.startTime == 12) {
          time = "12:00 PM";
        } else if (booking.startTime == 12.5) {
          time = "12:30 PM";
        } else {
          let hh = Math.floor(booking.startTime); // getting hours of day in 0-24 format
          let mm = (booking.startTime * 60) % 60; // getting minutes of the hour in 0-55 format
          let ap = ["AM", "PM"]; // AM-PM
          time =
            ("0" + (hh % 12)).slice(-2) +
            ":" +
            ("0" + mm).slice(-2) +
            " " +
            ap[Math.floor(hh / 12)];
        }

        const staff =
          staffInfo &&
          staffInfo.filter(staff => staff.id === booking.selectedStaff);

        const staffName = staff[0] && staff[0].name;
        const staffColor = staff[0] && staff[0].color;

        const service =
          serviceInfo &&
          serviceInfo.filter(service => service.id === booking.selectedService);
        const serviceName = service && service[0] && service[0].item;
        let date = new Date(booking.selectedDate.seconds * 1000);
        const bookingMonth = date.getMonth() + 1;
        const bookingDate = date.getDate();
        const bookingHours = date.getHours();
        const { name, phone, email, desc, duration } = booking;
        const id = booking.id;
        let bookingMinutes;
        if (date.getMinutes() == 0) {
          bookingMinutes = "00";
        } else {
          bookingMinutes = date.getMinutes();
        }

        return {
          staff: staffName,
          staffColor: staffColor,
          service: serviceName,
          date: bookingDate,
          month: bookingMonth,
          hours: bookingHours,
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
    console.log(bookingList);

    // Mon~Sun
    let weekday = moment.weekdaysShort().map(day => {
      return (
        <th key={day} className="week-day">
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
    //  generate </td> of date in the month.
    let currentDay = () => {
      return this.state.dateObject.format("D");
    };

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
                  <React.Fragment>
                    <Test key={i} data={data} storeID={storeID} />
                  </React.Fragment>
                );
              })}
          </div>
        </td>
      );
    }
    // Define some more variables
    var totalSlots = [...blanks, ...daysInMonth];
    let rows = [];
    let cells = [];

    // totalSloats

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

    // Create month picker
    const month = () => {
      return this.state.dateObject.format("MMMM");
    };

    const MonthList = () => {
      let months = [];
      moment.months().map((month, i) =>
        months.push(
          <td
            key={i}
            onClick={e => {
              this.setMonth(month);
            }}
          >
            <span>{month}</span>
          </td>
        )
      );

      let rows = [];
      let cells = [];

      months.forEach((row, i) => {
        if (i % 3 !== 0 || i == 0) {
          // except zero index
          cells.push(row);
        } else {
          rows.push(cells);
          cells = [];
          cells.push(row);
        }
      });
      rows.push(cells); // add last row
      let monthlist = rows.map((d, i) => {
        return <tr key={i}>{d}</tr>;
      });
      return (
        <table className="calendar-month">
          <thead>
            <tr>
              <th>Select a Month</th>
            </tr>
          </thead>
          <tbody>{monthlist}</tbody>
        </table>
      );
    };

    // Year picker
    const year = () => {
      return this.state.dateObject.format("Y");
    };
    // Year Table
    const yearTable = () => {
      let years = [2019, 2020, 2021, 2022, 2023, 2024];
      let yearsArr = [];
      years.map(data => {
        yearsArr.push(
          <td
            key={data}
            onClick={() => {
              this.setYear(data);
            }}
          >
            {data}
          </td>
        );
      });
      let rows = [];
      let cells = [];

      yearsArr.forEach((row, i) => {
        if (i % 3 !== 0 || i == 0) {
          cells.push(row);
        } else {
          rows.push(cells);
          cells = [];
          cells.push(row);
        }
      });
      rows.push(cells);
      let yearlist = rows.map((d, i) => {
        return <tr key={i}>{d}</tr>;
      });
      return (
        <table className="calendar-month">
          <thead>
            <tr>
              <th colSpan="4">Select a Yeah</th>
            </tr>
          </thead>
          <tbody>{yearlist}</tbody>
        </table>
      );
    };

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
              <span>{month()} </span>
              <span> {year()}</span>
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

        {this.state.showYearTable && <div>{yearTable()}</div>}
        {this.state.showMonthTable && (
          <table className="calendar-month">
            <div>{this.state.showMonthTable && MonthList()}</div>
          </table>
        )}
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
