import firebase from "firebase";
import "firebase/firestore";
import "firebase/auth";

// Your web app's Firebase configuration
var firebaseConfig = {
  apiKey: "AIzaSyALjP1nAakCdQnmXHbsu4gkrO-QJtB6_Vk",
  authDomain: "mybooking-project.firebaseapp.com",
  databaseURL: "https://mybooking-project.firebaseio.com",
  projectId: "mybooking-project",
  storageBucket: "mybooking-project.appspot.com",
  messagingSenderId: "841969377430",
  appId: "1:841969377430:web:ea32bbaba53e423683a2b7",
  measurementId: "G-M6TPCK9PKL"
};
// Initialize Firebase
firebase.initializeApp(firebaseConfig);

export default firebase;
