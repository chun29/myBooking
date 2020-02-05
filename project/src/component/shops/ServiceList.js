import React from "react";

const ServiceList = ({ services }) => {
  return (
    <React.Fragment>
      {services &&
        services.map(service => {
          return (
            <tr key={service.id}>
              <td className="icon-edit">✍︎</td>
              <td className="staff-name">{service.item}</td>
              <td className="staff-phone">{service.duration / 60} 小時</td>
              <td className="staff-email">{service.price}</td>
              <td className="staff-desc">{service.desc}</td>
            </tr>
          );
        })}
    </React.Fragment>
  );
};

export default ServiceList;
