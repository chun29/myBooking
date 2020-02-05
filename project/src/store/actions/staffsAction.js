export const createStaff = (staff, id) => {
  return (dispatch, getState, { getFirebase, getFirestore }) => {
    // make async to database
    const firestore = getFirestore();
    console.log(firestore.collection("store"));
    firestore
      .collection("store")
      .doc(id)
      .collection("staff")
      .doc()
      .set(staff, { merge: true })
      .then(() => {
        dispatch({ type: "CREATE_STAFF", staff });
      })
      .catch(err => {
        dispatch({ type: "CREATE_STAFF_ERROR", err });
      });
  };
};
