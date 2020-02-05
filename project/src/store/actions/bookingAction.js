export const createBooking = (booking, id) => {
  return (dispatch, getState, { getFirebase, getFirestore }) => {
    // make async call to database
    const firestore = getFirestore();
    firestore
      .collection("store")
      .doc(id)
      .collection("booking")
      .doc()
      .set({
        ...booking,
        createdAt: new Date()
      })
      .then(() => {
        dispatch({ type: "CREATE_BOOKING", booking });
      })
      .catch(() => {
        dispatch({ type: "CREATE_BOOKING_ERR", err });
      });
  };
};
