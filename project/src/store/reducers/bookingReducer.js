const initState = { bookingMsg: null, newBooking: null, bookingResult: 0 };
const bookingReducer = (state = initState, action) => {
  switch (action.type) {
    case "CREATE_BOOKING":
      console.log("create booking", action.booking);
      return {
        ...state,
        bookingMsg: `成功新增預約${action.booking.id}`,
        newBooking: action.booking,
        bookingResult: 1
      };
    case "CREATE_BOOKING_ERR":
      console.log("create booking error", action.err);
      return {
        ...state,
        bookingMsg: "新增預約失敗",
        bookingResult: 2
      };
    case "DELETE_BOOKING":
      console.log("delete booking", action.bookingId);
      return {
        ...state,
        bookingMsg: `成功刪除預約  ${action.bookingId}`
      };
    case "DELETE_BOOKING_ERR":
      console.log("create booking error", action.err);
      return {
        ...state,
        bookingMsg: "刪除預約失敗"
      };
    default:
      return state;
  }
};

export default bookingReducer;
