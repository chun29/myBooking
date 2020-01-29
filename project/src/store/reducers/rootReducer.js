import authReducer from "./authReducer";
import staffsReducer from "./staffsReducer";

import { combineReducers } from "redux";
import { firestoreReducer } from "redux-firestore";
import { firebaseReducer } from "react-redux-firebase";

const rootReducer = combineReducers({
  auth: authReducer,
  staff: staffsReducer,
  firestore: firestoreReducer,
  firebase: firebaseReducer
});

export default rootReducer;
