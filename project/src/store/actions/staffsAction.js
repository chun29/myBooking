export const createStaff = staff => {
  return (dispatch, getState, { getFirebase, getFirestore }) => {
    // make async to database
    const firestore = getFirestore();
    firestore
      .collection("owners")
      .add({
        ...staff,
        staffId: 12345,
        createdAt: new Date()
      })
      .then(() => {
        dispatch({ type: "CREATE_STAFF", staff });
      })
      .catch(err => {
        dispatch({ type: "CREATE_STAFF_ERROR", err });
      });
  };
};
