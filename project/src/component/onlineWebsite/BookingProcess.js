import React from "react";

export const BookingProcess = ({ step, selectStep }) => {
  const steps = [
    [1, "服務"],
    [2, "服務人員"],
    [3, "日期與時間"],
    [4, "顧客資訊"]
  ];
  let addClass;
  return (
    <div className="step-wrapper">
      <h5 className="step-wrapper-header">預約流程</h5>
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
};
