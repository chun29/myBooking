const initState = {
  staffs: [
    { id: 1, name: "June", content: "TEST DATA" },
    { id: 2, name: "May", content: "TEST DATA" }
  ]
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
