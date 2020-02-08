export const onlineSetup = (online, id) => {
  return (dispatch, getState, { getFirebase, getFirestore }) => {
    // make async to database
    const firestore = getFirestore();
    console.log(firestore.collection("store"));
    firestore
      .collection("store")
      .doc(id)
      .set({ online: online }, { merge: true })
      .then(() => {
        dispatch({ type: "ONLINE-SETUP", online });
      })
      .catch(err => {
        dispatch({ type: "ONLINE-SETUP_ERROR", err });
      });
  };
};
