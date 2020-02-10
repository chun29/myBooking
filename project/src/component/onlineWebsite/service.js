import React from "react";
import storePhoto from "../../img/banner.jpg";

const Service = ({ service, selectService, selectedService }) => {
  let style;
  if (service.item == selectedService) {
    style = {
      border: "2px solid rgba(81, 203, 238, 1)",
      boxShadow: "0 0 5px rgba(81, 203, 238, 1)"
    };
  }
  return (
    <div className="service" style={style}>
      <img src={storePhoto} />
      <div className="service-desc">
        <h3>{service.item}</h3>
        <p>{service.desc}</p>
        <div className="extra-info">
          <p>🕑 {service.duration / 60} 小時</p>
          <p>＄{service.price}</p>
        </div>

        <button
          onClick={() => {
            selectService(service.item, service.duration / 60);
          }}
        >
          選擇
        </button>
      </div>
    </div>
  );
};

export default Service;
