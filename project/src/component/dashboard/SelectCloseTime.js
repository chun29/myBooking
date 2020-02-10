import React, { Component } from "react";

const SelectCloseTime = ({ label, value, handleSelect }) => (
  <div className="set-container">
    <label>
      <div className="workingHours-startTime-container">
        <select value={value} onChange={handleSelect} name={label}>
          <option value="8">08:00</option>
          <option value="8.5">08:30</option>
        </select>
      </div>
    </label>
  </div>
);

export default SelectCloseTime;
