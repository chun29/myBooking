const initState = {
  bookingMsg: null,
  newBooking: null,
  bookingResult: 0,
  time: null
};
const bookingReducer = (state = initState, action) => {
  switch (action.type) {
    case "CREATE_BOOKING":
      return {
        ...state,
        bookingMsg: `成功新增預約`,
        newBooking: action.booking,
        bookingResult: 1,
        time: Date.now()
      };
    case "CREATE_BOOKING_ERR":
      return {
        ...state,
        bookingMsg: "新增預約失敗",
        bookingResult: 2,
        time: Date.now()
      };
    case "DELETE_BOOKING":
      return {
        ...state,
        bookingMsg: `成功刪除預約`,
        time: Date.now()
      };
    case "DELETE_BOOKING_ERR":
      return {
        ...state,
        bookingMsg: "刪除預約失敗",
        time: Date.now()
      };
    default:
      return state;
  }
};

export default bookingReducer;
