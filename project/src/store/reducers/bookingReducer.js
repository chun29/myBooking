const initState = {};
const bookingReducer = (state = initState, action) => {
  switch (action.type) {
    case "CREATE_BOOKING":
      console.log("create booking", action.booking);
      return state;
    case "CREATE_BOOKING_ERR":
      console.log("create booking error", action.err);
      return state;
    default:
      return state;
  }
};

export default bookingReducer;
