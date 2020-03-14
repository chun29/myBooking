import React from "react";
import "../../style/marker.css";

const Marker = props => {
  const { color, name } = props;
  return (
    <div className="pin bounce" style={{ backgroundColor: color }} title={name}>
      <div className="pulse" />
    </div>
  );
};

export default Marker;
