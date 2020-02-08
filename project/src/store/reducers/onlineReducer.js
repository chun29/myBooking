const initState = {};
const onlineReducer = (state = initState, action) => {
  switch (action.type) {
    case "ONLINE-SETUP":
      console.log("online setup", action.online);
      return state;
    case "ONLINE-SETUP_ERROR":
      console.log("create service error", action.err);
      return state;
    default:
      return state;
  }
};

export default onlineReducer;
