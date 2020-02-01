const initState = {
  businessHour: [
    { day: "monday", open: true, openTime: "08:00", closeTime: "18:00" },
    { day: "tuesday", open: true, openTime: "08:00", closeTime: "18:00" }
  ]
};

const openingHoursReducer = (state = initState, action) => {
  switch (action.type) {
    case "ADD_WORKDAY":
      console.log("add workday", action.weekday);
      return state;
    case "ADD_WORKDAY_ERROR":
      console.log("add workday error", action.err);
      return state;
    default:
      return state;
  }
};

export default openingHoursReducer;
