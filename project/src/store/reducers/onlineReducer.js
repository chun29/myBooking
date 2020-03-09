const initState = {
  onlineMsg: null,
  time: null
};
const onlineReducer = (state = initState, action) => {
  switch (action.type) {
    case "ONLINE-SETUP":
      return { ...state, onlineMsg: "上線資料設定成功", time: Date.now() };
    case "ONLINE-SETUP_ERROR":
      return { ...state, onlineMsg: "上線資料設定失敗", time: Date.now() };
    default:
      return state;
  }
};

export default onlineReducer;
