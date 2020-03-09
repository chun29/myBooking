import { combineReducers } from "redux";
import authReducer from "./authReducer";
import staffsReducer from "./staffsReducer";
import openingHoursReducer from "./openingHoursReducer";
import bookingReducer from "./bookingReducer";
import serviceReducer from "./serviceReducer";
import onlineReducer from "./onlineReducer";
import { firestoreReducer } from "redux-firestore";
import { firebaseReducer } from "react-redux-firebase";

const rootReducer = combineReducers({
  auth: authReducer,
  staff: staffsReducer,
  booking: bookingReducer,
  onlineSetup: onlineReducer,
  firestore: firestoreReducer,
  firebase: firebaseReducer,
  workday: openingHoursReducer,
  serviceReducer: serviceReducer
});

export default rootReducer;
