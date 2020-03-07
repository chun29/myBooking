const initState = {
  openingHoursMsg: null,
  openingHoursResult: 0,
  time: null
};

const openingHoursReducer = (state = initState, action) => {
  switch (action.type) {
    case "ADD_WORKDAY":
      return {
        ...state,
        openingHoursMsg: "營業時間設定成功",
        openingHoursResult: 2,
        time: Date.now()
      };
    case "ADD_WORKDAY_ERROR":
      return {
        ...state,
        openingHoursMsg: "營業時間設定失敗",
        openingHoursResult: 2,
        time: Date.now()
      };
    default:
      return state;
  }
};

export default openingHoursReducer;
