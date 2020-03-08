import React from "react";
import { connect } from "react-redux";
import { compose } from "redux";
import { firestoreConnect } from "react-redux-firebase";
import { withRouter } from "react-router";
import "../../style/template.css";
import optionsImg from "../../img/options.png";

class AvailableTime extends React.Component {
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
      let times = [];
      let start = openTime;
      let close = closeTime;
      let length = (close - start) * 2;

      for (let i = 0; i < length; i++) {
        let t = [];
        t[0] = start;
        t[1] = start + 0.5;
        times.push(t);
        start = start + 0.5;
      }

      function arr_diff(a1, a2) {
        let a = [],
          diff = [];

        for (let i = 0; i < a1.length; i++) {
          a[a1[i]] = true;
        }

        for (let i = 0; i < a2.length; i++) {
          if (a[a2[i]]) {
            delete a[a2[i]];
          } else {
            a[a2[i]] = true;
          }
        }

        for (let k in a) {
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
          let hh = Math.floor(finalArr[i]);
          let mm = (finalArr[i] * 60) % 60;
          let ap = ["AM", "PM"];
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
      if (finalBtn.length < 1) {
        return (
          <div>
            <p>很抱歉，今日預約已滿，請選擇其他日期或是服務人員</p>
            <img className="no-time-img" src={optionsImg} />
          </div>
        );
      }

      return (
        <div className="time-btn-wrapper">
          {finalBtn.map((time, i) => {
            return (
              <button
                onClick={() => {
                  selectStartTime(time[1], time[0]);
                }}
                className="timeButton green-btn"
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

export default withRouter(
  compose(
    connect(mapStateToProps),
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
