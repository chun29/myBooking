import React from "react";

const SelectOpenTime = ({ label, value, handleSelect, disabled }) => (
  <div className="set-container">
    <label>
      <div className="workingHours-startTime-container">
        <select
          value={value}
          onChange={handleSelect}
          name={label}
          disabled={disabled}
        >
          <option value="8">08:00</option>
          <option value="9">09:00</option>
          <option value="10">10:00</option>
          <option value="11">11:00</option>
          <option value="12">12:00</option>
        </select>
      </div>
    </label>
  </div>
);

export default SelectOpenTime;
