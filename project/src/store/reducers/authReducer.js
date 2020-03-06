const initState = {
  authError: null,
  sendEmail: false
};
const authReducer = (state = initState, action) => {
  switch (action.type) {
    case "LOGIN_ERROR":
      return {
        ...state,
        authError: "信箱或密碼有錯誤"
      };
    case "LOGIN_EMAIL_NOT_VERIFIED":
      return {
        ...state,
        authError: "此信箱尚未被驗證"
      };
    case "LOGIN_SUCCESS":
      return {
        ...state,
        authError: null
      };
    case "SIGNOUT_SUCCESS":
      return state;
    case "SIGNUP_SUCCESS":
      return { ...state, authError: null, sendEmail: true };
    case "SIGNUP_ERROR":
      if (
        action.err.message ===
        "The email address is already in use by another account."
      ) {
        return { ...state, authError: "此信箱已被註冊" };
      }
      return { ...state, authError: action.err.message };
    case "ADD_AUTHMSG":
      return { ...state, authError: action.msg };
    case "SHOW_GUIDE":
      return { ...state, showGuide: false };
    default:
      return state;
  }
};

export default authReducer;
