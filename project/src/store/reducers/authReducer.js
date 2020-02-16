const initState = {
  authError: null
};
const authReducer = (state = initState, action) => {
  switch (action.type) {
    case "LOGIN_ERROR":
      return {
        ...state,
        authError: "登入失敗"
      };
    case "LOGIN_SUCCESS":
      console.log("登入成功");
      return {
        ...state,
        authError: null
      };
    case "SIGNOUT_SUCCESS":
      console.log("sign out success");
      return state;
    case "SIGNUP_SUCCESS":
      console.log("註冊成功");
      return { ...state, authError: null };
    case "SIGNUP_ERROR":
      console.log(action.err.message);
      return { ...state, authError: action.err.message };
    default:
      return state;
  }
};

export default authReducer;
