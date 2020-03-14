const initState = { staffMsg: null, time: null };
const staffsReducer = (state = initState, action) => {
  switch (action.type) {
    case "CREATE_STAFF":
      return {
        ...state,
        staffMsg: "成功新增服務人員",
        time: Date.now()
      };
    case "CREATE_STAFF_ERROR":
      return {
        ...state,
        staffMsg: "新增服務人員失敗",
        time: Date.now()
      };
    case "DELETE_STAFF":
      return {
        ...state,
        staffMsg: "成功刪除服務人員",
        time: Date.now()
      };
    case "DELETE_STAFF_ERR":
      return {
        ...state,
        staffMsg: "刪除服務失敗",
        time: Date.now()
      };
    case "EDIT_STAFF":
      return {
        ...state,
        staffMsg: "成功編輯服務人員",
        time: Date.now()
      };
    case "EDIT_STAFF_ERR":
      return {
        ...state,
        staffMsg: "編輯服務失敗",
        time: Date.now()
      };
    default:
      return state;
  }
};

export default staffsReducer;
