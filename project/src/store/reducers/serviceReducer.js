const initState = {};
const serviceReducer = (state = initState, action) => {
  switch (action.type) {
    case "CREATE_SERVICE":
      console.log("created staff", action.service);
      return state;
    case "CREATE_SERVICE_ERROR":
      console.log("create service error", action.err);
      return state;
    default:
      return state;
  }
};

export default serviceReducer;
