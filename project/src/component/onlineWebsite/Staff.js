import React from "react";
import storePhoto from "../../img/banner.jpg";

const Staff = staff => {
  const data = staff.staff;

  return (
    <div className="service">
      <img src={storePhoto} />
      <div className="service-desc">
        <h3>{data.nickname}</h3>
        <p>{data.desc}</p>

        <button>選擇</button>
      </div>
    </div>
  );
};

export default Staff;
