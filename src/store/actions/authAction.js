export const signIn = credential => {
  return (dispatch, getState, { getFirebase }) => {
    const firebase = getFirebase();
    firebase
      .auth()
      .signInWithEmailAndPassword(credential.email, credential.password)
      .then(data => {
        if (data.user.emailVerified) {
          dispatch({ type: "LOGIN_SUCCESS" });
        } else if (!data.user.emailVerified) {
          dispatch({ type: "LOGIN_EMAIL_NOT_VERIFIED" });
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

export const signUp = newUser => {
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
            email: newUser.email,
            guideShow: true
          });
      })
      .then(() => {
        firebase.auth().onAuthStateChanged(function(user) {
          user.sendEmailVerification();
        });
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

export const guideBanned = id => {
  return (dispatch, getState, { getFirebase, getFirestore }) => {
    const firestore = getFirestore();
    firestore
      .collection("owners")
      .doc(id)
      .update({ guideShow: false })
      .then(() => {
        dispatch({ type: "SHOW_GUIDE" });
      })
      .catch(() => {
        dispatch({ type: "SHOW_GUIDE_ERR", err });
      });
  };
};
