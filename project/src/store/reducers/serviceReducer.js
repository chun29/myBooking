const initState = { serviceMsg: null };
const serviceReducer = (state = initState, action) => {
  switch (action.type) {
    case "CREATE_SERVICE":
      console.log("created staff", action.service);
      return {
        ...state,
        serviceMsg: "成功新增服務"
      };
    case "CREATE_SERVICE_ERROR":
      console.log("create service error", action.err);
      return {
        ...state,
        serviceMsg: "新增服務失敗"
      };
    case "DELETE_SERVICE":
      console.log("delete servic", action.serviceId);
      return {
        ...state,
        serviceMsg: "成功刪除服務"
      };
    case "DELETE_SERVICE_ERR":
      console.log("delete service error", action.err);
      return {
        ...state,
        serviceMsg: "刪除服務失敗"
      };
    default:
      return state;
  }
};

export default serviceReducer;
