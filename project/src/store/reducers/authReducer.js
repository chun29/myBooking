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
      if (
        action.err.message ===
        "The email address is already in use by another account."
      ) {
        return { ...state, authError: "此信箱已被註冊" };
      }
      return { ...state, authError: action.err.message };
    case "ADD_AUTHMSG":
      console.log("ADD_AUTHMSG", action.msg);
      return { ...state, authError: action.msg };
    default:
      return state;
  }
};

export default authReducer;
