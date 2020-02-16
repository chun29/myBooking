const initState = { staffMsg: null };
const staffsReducer = (state = initState, action) => {
  switch (action.type) {
    case "CREATE_STAFF":
      console.log("created staff", action.staff);
      return {
        ...state,
        staffMsg: "成功新增服務人員"
      };
    case "CREATE_STAFF_ERROR":
      console.log("create staff error", action.err);
      return {
        ...state,
        staffMsg: "新增服務人員失敗"
      };
    case "DELETE_STAFF":
      console.log("delete staff", action.staffId);
      return {
        ...state,
        staffMsg: "成功刪除服務人員"
      };
    case "DELETE_STAFF_ERR":
      console.log("delete staff error", action.err);
      return {
        ...state,
        staffMsg: "刪除服務失敗"
      };
    default:
      return state;
  }
};

export default staffsReducer;
