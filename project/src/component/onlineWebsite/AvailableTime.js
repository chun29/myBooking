import React, { Component } from "react";
import setOpeningHours from "../../store/actions/openingHoursAction";
import { connect } from "react-redux";
import { compose } from "redux";
import { firestoreConnect } from "react-redux-firebase";
import { withRouter } from "react-router";
import "../../style/template.css";

class AvailableTime extends Component {
  render() {
    const {
      booking,
      bookedDay,
      storeInfo,
      weekDay,
      duration,
      selectStaff,
      selectStartTime
    } = this.props;

    let closeTime;
    let openTime;
    if (weekDay) {
      const w = weekDay.getDay();
      openTime = Number(storeInfo.openTime[w]);
      closeTime = Number(storeInfo.closeTime[w]);
    }

    let bookedList = [];

    if (booking) {
      booking.map(data => {
        if (
          data.bookedDay == bookedDay &&
          data.selectedStaff == selectStaff.id
        ) {
          let startTime = data.startTime;
          let endTime = data.startTime + data.duration / 60;
          let length = (endTime - startTime) * 2;
          for (let i = 0; i < length; i++) {
            let t = [];
            t[0] = startTime;
            t[1] = startTime + 0.5;

            if (startTime >= openTime && startTime <= closeTime) {
              for (let i = 0; i < bookedList.length; i++) {
                if (bookedList[i][0] == startTime) {
                  return;
                }
                // bookedList.push(t);
              }
              bookedList.push(t);
            }
            // bookedList.push(t);
            startTime = startTime + 0.5;
          }
        }
      });
    }

    const timeArea = bookedTime => {
      //Book time fake data

      // 由 open time and close time 生成全部時段 array

      let times = []; // time array
      let start = openTime; //Number(store.openTime.friday); // start time
      let close = closeTime;

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
        let time = [];
        if (finalArr[i] == 12) {
          time[0] = "12:00 PM";
          time[1] = 12;
        } else if (finalArr[i] == 12.5) {
          time[0] = "12:30 PM";
          time[1] = 12.5;
        } else {
          let hh = Math.floor(finalArr[i]); // getting hours of day in 0-24 format
          let mm = (finalArr[i] * 60) % 60; // getting minutes of the hour in 0-55 format
          let ap = ["AM", "PM"]; // AM-PM
          time[0] =
            ("0" + (hh % 12)).slice(-2) +
            ":" +
            ("0" + mm).slice(-2) +
            " " +
            ap[Math.floor(hh / 12)];
          time[1] = finalArr[i];
        }
        finalBtn.push(time);
      }

      return (
        <div className="time-btn-wrapper">
          {finalBtn.map((time, i) => {
            return (
              <button
                onClick={() => {
                  selectStartTime(time[1], time[0]);
                }}
                className="timeButton"
                key={i}
              >
                {time[0]}
              </button>
            );
          })}
        </div>
      );
    };

    return <React.Fragment>{timeArea(bookedList)}</React.Fragment>;
  }
}
const mapStateToProps = state => {
  return {
    auth: state.firebase.auth,
    booking: state.firestore.ordered.booking
  };
};

const mapDispatchToProps = dispatch => {
  return {
    setOpeningHours: (weekday, id) => dispatch(setOpeningHours(weekday, id))
  };
};

export default withRouter(
  compose(
    connect(mapStateToProps, mapDispatchToProps),
    firestoreConnect(props => {
      const uid = props.match.params.id;

      return [
        {
          collection: "store",
          doc: uid,
          subcollections: [{ collection: "booking" }],
          storeAs: "booking"
        }
      ];
    })
  )(AvailableTime)
);
