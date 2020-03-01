const initState = { serviceMsg: null, time: null };
const serviceReducer = (state = initState, action) => {
  switch (action.type) {
    case "CREATE_SERVICE":
      console.log("created staff", action.newService);
      return {
        ...state,
        serviceMsg: "成功新增服務",
        time: Date.now()
      };
    case "CREATE_SERVICE_ERROR":
      console.log("create service error", action.err);
      return {
        ...state,
        serviceMsg: "新增服務失敗",
        time: Date.now()
      };
    case "DELETE_SERVICE":
      console.log("delete service", action.serviceId);
      return {
        ...state,
        serviceMsg: "成功刪除服務",
        time: Date.now()
      };
    case "DELETE_SERVICE_ERR":
      console.log("delete service error", action.err);
      return {
        ...state,
        serviceMsg: "刪除服務失敗",
        time: Date.now()
      };
    case "EDIT_SERVICE":
      console.log("delete service", action.serviceId);
      return {
        ...state,
        serviceMsg: "成功編輯服務",
        time: Date.now()
      };
    case "EDIT_SERVICE_ERR":
      console.log("delete service error", action.err);
      return {
        ...state,
        serviceMsg: "編輯服務失敗",
        time: Date.now()
      };
    default:
      return state;
  }
};

export default serviceReducer;
