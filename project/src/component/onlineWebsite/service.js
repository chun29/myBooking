import React from "react";
import storePhoto from "../../img/banner.jpg";

const Service = service => {
  const data = service.service;

  return (
    <div className="service">
      <img src={storePhoto} />
      <div className="service-desc">
        <h3>{data.item}</h3>
        <p>{data.desc}</p>
        <div className="extra-info">
          <p>🕑 {data.duration / 60} 小時</p>
          <p>＄{data.price}</p>
        </div>

        <button>選擇</button>
      </div>
    </div>
  );
};

export default Service;
