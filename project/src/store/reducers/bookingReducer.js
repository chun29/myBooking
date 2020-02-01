import { Switch } from "react-router";

const initState = {
  bookings: [
    {
      id: 1,
      name: "Customer 1",
      service: "wash hair",
      server: "June",
      date: "02/01",
      desc: "Good"
    },
    {
      id: 2,
      name: "Customer 2",
      service: "wash hair",
      server: "May",
      date: "02/03",
      desc: "Nice"
    }
  ]
};
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
