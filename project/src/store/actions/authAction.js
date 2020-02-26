export const signIn = credential => {
  return (dispatch, getState, { getFirebase }) => {
    const firebase = getFirebase();
    firebase
      .auth()
      .signInWithEmailAndPassword(credential.email, credential.password)
      .then(data => {
        if (data.user.emailVerified) {
          dispatch({ type: "LOGIN_SUCCESS" });
        }
      })
      .catch(err => {
        dispatch({ type: "LOGIN_ERROR", err });
      });
  };
};

export const signOut = () => {
  return (dispatch, getState, { getFirebase }) => {
    const firebase = getFirebase();
    firebase
      .auth()
      .signOut()
      .then(() => {
        dispatch({ type: "SIGNOUT_SUCCESS" });
      });
  };
};

export const signUp = (newUser, callback) => {
  return (dispatch, getState, { getFirebase, getFirestore }) => {
    const firebase = getFirebase();
    const firestore = getFirestore();
    firebase
      .auth()
      .createUserWithEmailAndPassword(newUser.email, newUser.password)
      .then(resp => {
        return firestore
          .collection("owners")
          .doc(resp.user.uid)
          .set({
            name: newUser.name,
            email: newUser.email
          });
      })
      .then(() => {
        firebase.auth().onAuthStateChanged(function(user) {
          user.sendEmailVerification();
        });
        alert("已寄發驗證信，請先確認信箱再登入");
        callback();
        dispatch({
          type: "SIGNUP_SUCCESS"
        });
      })
      .catch(err => {
        dispatch({ type: "SIGNUP_ERROR", err });
      });
  };
};

export const authMsg = msg => {
  return dispatch => {
    dispatch({ type: "ADD_AUTHMSG", msg });
  };
};
