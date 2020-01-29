const initState = {
  // staffs: [
  //   { id: 1, name: "June", content: "I am June" },
  //   { id: 2, name: "May", content: "I am May" }
  // ]
};
const staffsReducer = (state = initState, action) => {
  switch (action.type) {
    case "CREATE_STAFF":
      console.log("created staff", action.staff);
      return state;
    case "CREATE_STAFF_ERROR":
      console.log("create staff error", action.err);
      return state;
    default:
      return state;
  }
};

export default staffsReducer;
