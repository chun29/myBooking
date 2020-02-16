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
          <option value="0">00:00</option>
          <option value="0.5">00:30</option>
          <option value="1">01:00</option>
          <option value="1.5">01:30</option>
          <option value="2">02:00</option>
          <option value="2.5">02:30</option>
          <option value="3">03:00</option>
          <option value="3.5">03:30</option>
          <option value="4">04:00</option>
          <option value="4.5">04:30</option>
          <option value="5">05:00</option>
          <option value="5.5">05:30</option>
          <option value="6">06:00</option>
          <option value="6.5">06:30</option>
          <option value="7">07:00</option>
          <option value="7.5">07:30</option>
          <option value="8">08:00</option>
          <option value="8.5">08:30</option>
          <option value="9">09:00</option>
          <option value="9.5">09:30</option>
          <option value="10">10:00</option>
          <option value="10.5">10:30</option>
          <option value="11">11:00</option>
          <option value="11.5">11:30</option>
          <option value="12">12:00</option>
          <option value="12.5">12:30</option>
          <option value="13">13:00</option>
          <option value="13.5">13:30</option>
          <option value="14">14:00</option>
          <option value="14.5">14:30</option>
          <option value="15">15:00</option>
          <option value="15.5">15:30</option>
          <option value="16">16:00</option>
          <option value="16.5">16:30</option>
          <option value="17">17:00</option>
          <option value="17.5">17:30</option>
          <option value="18">18:00</option>
          <option value="18.5">18:30</option>
          <option value="19">19:00</option>
          <option value="19.5">19:30</option>
          <option value="20">20:00</option>
          <option value="20.5">20:30</option>
          <option value="21">21:00</option>
          <option value="21.5">21:30</option>
          <option value="22">22:00</option>
          <option value="22.5">22:30</option>
          <option value="23">23:00</option>
          <option value="23.5">23:30</option>
        </select>
      </div>
    </label>
  </div>
);

export default SelectOpenTime;
