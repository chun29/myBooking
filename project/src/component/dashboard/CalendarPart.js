import React from "react";
import moment, { months } from "moment";

class CalendarPart extends React.Component {
  constructor(props) {
    super(props);
    //state
    this.state = {
      dateObject: moment(),
      allMonths: moment.months(),
      showMonthTable: false,
      showYearTable: false,
      showDateTable: true
    };
  }

  //Html + function
  render() {
    // Booking Data
    const booking = [
      {
        server: "JUNE",
        date: "2",
        month: "6",
        service: "wash hair"
      },
      {
        server: "JUNE",
        date: "5",
        month: "1",
        service: "wash hair"
      },
      {
        server: "JUNE",
        date: "8",
        month: "3",
        service: "wash hair"
      },
      {
        server: "JUNE",
        date: "8",
        month: "1",
        service: "wash hair"
      },
      {
        server: "JUNE",
        date: "2",
        month: "5",
        service: "wash hair"
      },
      {
        server: "JUNE",
        date: "20",
        month: "4",
        service: "wash hair"
      },
      {
        server: "JUNE",
        date: "20",
        month: "10",
        service: "wash hair"
      },
      {
        server: "JUNE",
        date: "30",
        month: "01",
        service: "wash hair"
      },
      {
        server: "JUNE",
        date: "20",
        month: "10",
        service: "wash hair"
      },
      {
        server: "JUNE",
        date: "20",
        month: "02",
        service: "test1"
      },
      {
        server: "JUNE",
        date: "20",
        month: "02",
        service: "test2"
      }
    ];
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
      const datas = booking.filter(
        data =>
          data.month == moment(this.state.dateObject).month() + 1 &&
          data.date == d
      );

      daysInMonth.push(
        <td id={d} key={d} className={`calendar-day ${currentDay}`}>
          {d}
          <div>
            {datas.map(data => {
              return <div>{data.service}</div>;
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
      return <tr>{d}</tr>;
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
        return <tr>{d}</tr>;
      });
      return (
        <table className="calendar-month">
          <thead>
            <tr>
              <th colSpan="4">Select a Month</th>
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
        return <tr>{d}</tr>;
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
      <div>
        <div className="calendar-header">
          <button
            className="button-prev"
            onClick={e => {
              this.setPrevMonth();
            }}
          >
            ◀︎
          </button>
          <div>
            <h4 onClick={this.showMonth}>{month()}</h4>
          </div>
        </div>
        <div className="month">
          <span onClick={this.showYear}>{year()}</span>
          <button
            className="button-next"
            onClick={e => {
              this.setNextMonth();
            }}
          >
            ▶︎
          </button>
        </div>

        {this.state.showYearTable && <div>{yearTable()}</div>}
        {this.state.showMonthTable && (
          <table className="calendar-month">
            <div>{this.state.showMonthTable && MonthList()}</div>
          </table>
        )}
        {this.state.showDateTable && (
          <table className="calendar-day">
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

  setYear = year => {
    let dateObject = Object.assign({}, this.state.dateObject);
    dateObject = moment(dateObject).set("year", year);

    this.setState(prevstate => ({
      dateObject: dateObject,
      showMonthTable: !prevstate.showMonthTable,
      showYearTable: false // add to state
    }));
  };

  showMonth = e => {
    this.setState(prevstate => ({
      showMonthTable: !prevstate.showMonthTable,
      showDateTable: !prevstate.showDateTable
    }));
  };

  showYear = e => {
    this.setState(prevstate => ({
      showYearTable: !prevstate.showYearTable,
      showDateTable: !prevstate.showDateTable
    }));
  };
}

export default CalendarPart;
