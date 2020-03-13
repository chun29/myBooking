import authReducer from "../store/reducers/authReducer";

describe("auth Reducer Create ", () => {
  let AuthReducer;
  beforeEach(() => {
    jest.resetModules();
    AuthReducer = authReducer;
  });

  describe("type:LOGIN_ERROR", () => {
    it("should show login err", () => {
      const state = {
        authError: null,
        sendEmail: false
      };
      const result = AuthReducer(state, {
        type: "SIGNUP_SUCCESS"
      });
      expect(result).toEqual({
        ...state,
        sendEmail: true
      });
    });
  });
});
