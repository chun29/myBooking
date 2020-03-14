import React from "react";
import storePhoto from "../../img/banner.jpg";
import Timer from "../../img/clock.png";

const Service = ({ service, selectService, selectedService }) => {
  let style;
  if (service.id == selectedService.id) {
    style = {
      border: "2px solid #3d5afe",
      boxShadow: "0 0 5px #3d5afe"
    };
  }
  let url;
  if (service.url == null) {
    url = storePhoto;
  } else {
    url = service.url;
  }

  return (
    <div className="service" style={style}>
      <img className="service-img" src={url} />
      <div className="service-desc">
        <p className="service-header">{service.item}</p>
        <p className="service-text"> {service.desc}</p>
      </div>

      <div className="service-row-2">
        <img className="timer" src={Timer}></img>
        <p className="duration-text">{service.duration / 60} 小時</p>
        <p className="price-text">＄{service.price}</p>
      </div>

      <button
        className="blue-btn"
        onClick={() => {
          selectService(service.item, service.id, service.duration / 60);
        }}
      >
        選擇
      </button>
    </div>
  );
};

export default Service;
