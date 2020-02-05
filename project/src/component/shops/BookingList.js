import React from "react";

const BookingList = ({ bookings, staffs, services }) => {
  return (
    <React.Fragment>
      {bookings &&
        bookings.map(booking => {
          const staff = staffs.filter(staff => staff.id === booking.server);

          const staffName = staff[0] && staff[0].name;

          const service = services.filter(
            service => service.id === booking.service
          );
          const serviceName = service[0] && service[0].item;
          let date = new Date(booking.date.seconds * 1000);
          const dataValues = [
            date.getMonth() + 1 + "月",
            date.getDate() + "日",
            date.getHours() + "時",
            date.getMinutes() + "日"
          ];
          return (
            <tr key={booking.id}>
              <td className="icon-edit">✍︎</td>
              <td className="staff-avatar">{booking.id}</td>
              <td className="staff-name">{dataValues}</td>
              <td className="staff-phone">{booking.name}</td>
              <td className="staff-email">{staffName}</td>
              <td className="staff-email">{serviceName}</td>
              <td className="staff-desc">{booking.desc}</td>
            </tr>
          );
        })}
    </React.Fragment>
  );
};

export default BookingList;
