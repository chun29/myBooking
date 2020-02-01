import React from "react";

const BookingList = ({ bookings }) => {
  return (
    <div>
      <h1>預約列表</h1>
      {bookings &&
        bookings.map((booking, i) => {
          return (
            <p key={i}>
              預約號碼:{booking.id} 姓名：{booking.name}
            </p>
          );
        })}
    </div>
  );
};

export default BookingList;
