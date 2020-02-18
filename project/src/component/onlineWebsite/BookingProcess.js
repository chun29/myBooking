import React, { Component } from "react";
class BookingProcess extends Component {
  render() {
    const steps = [
      [1, "服務"],
      [2, "服務人員"],
      [3, "日期與時間"],
      [4, "顧客資訊"]
    ];
    let { step, selectStep } = this.props;

    let addClass;
    return (
      <div className="step-wrapper">
        <h3 className="step-wrapper-header">預約流程</h3>
        <div className="step-column">
          <div className="step-list">
            {steps.map((data, i) => {
              if (step == data[0]) {
                addClass = "step-selected";
              } else {
                addClass = "";
              }
              return (
                <div
                  key={i}
                  onClick={() => {
                    selectStep(data[0]);
                  }}
                  className={`step ${addClass}`}
                >
                  <span className="step-num">{data[0]}</span>
                  <span>{data[1]}</span>
                </div>
              );
            })}
          </div>
          <p className="step-msg">預約資訊請填妥，以保障您的權利</p>
        </div>
      </div>
    );
  }
}

export default BookingProcess;
