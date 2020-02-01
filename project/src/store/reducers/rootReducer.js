import { combineReducers } from "redux";
import authReducer from "./authReducer";
import staffsReducer from "./staffsReducer";
import openingHoursReducer from "./openingHoursReducer";
import bookingReducer from "./bookingReducer";
import { firestoreReducer } from "redux-firestore";
import { firebaseReducer } from "react-redux-firebase";

const rootReducer = combineReducers({
  auth: authReducer,
  staff: staffsReducer,
  booking: bookingReducer,
  firestore: firestoreReducer,
  firebase: firebaseReducer,
  workday: openingHoursReducer
});

export default rootReducer;
