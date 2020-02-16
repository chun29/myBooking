const initState = {
  storeName: "",
  storeAddress: "",
  storePhone: "",
  bookOpenDay: "0",
  bookCloseDay: "0",
  storeDesc: "",
  bookingNote: "",
  bookingIsOpen: true,
  logoImage: null,
  logoSrc: "",
  bannerImage: null,
  bannerSrc: ""
};
const onlineReducer = (state = initState, action) => {
  switch (action.type) {
    case "ONLINE-SETUP":
      console.log("online setup", action.online);
      return state;
    case "ONLINE-SETUP_ERROR":
      console.log("online setup error", action.err);
      return state;
    default:
      return state;
  }
};

export default onlineReducer;
