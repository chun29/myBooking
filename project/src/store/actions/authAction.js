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
            email: newUser.email
          });
      })
      .then(dataBeforeEmail => {
        firebase.auth().onAuthStateChanged(function(user) {
          user.sendEmailVerification();
        });
        console.log("Signup and email verification successful:");
      })
      .then(dataAfterEmail => {
        firebase.auth().onAuthStateChanged(function(user) {
          if (user.emailVerified) {
            // Email is verified
            dispatch({
              type: "SIGNUP_SUCCESS"
            });
          } else {
            // Email is not verified
            dispatch({
              type: "SIGNUP_ERROR",
              err
            });
          }
        });
      })
      .catch(err => {
        dispatch({ type: "SIGNUP_ERROR", err });
      });
  };
};
