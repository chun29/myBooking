import React from "react";
import Checkbox from "@material-ui/core/Checkbox";

const SelectOpenDay = ({ isSelected, label, onCheckboxChange }) => {
  return (
    <div className="set-container">
      <div className="form-check">
        <label>
          <Checkbox
            name={`${label[0]}`}
            checked={isSelected}
            onChange={onCheckboxChange}
            className="form-check-input"
            value="secondary"
            color="primary"
            inputProps={{ "aria-label": "secondary checkbox" }}
          />
          {label[1]}
        </label>
      </div>
    </div>
  );
};

export default SelectOpenDay;
