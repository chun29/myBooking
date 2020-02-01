export const createBooking = booking => {
  return (dispatch, getState, { getFirebase, getFirestore }) => {
    // make async call to database
    const firestore = getFirestore();
    firestore.collection("booking").add({
      ...booking,
      addObjInfo: { text: "test", createdAt: new Date() }
    }),
      then(() => {
        dispatch({ type: "CREATE_BOOKING", booking });
      }).catch(() => {
        dispatch({ type: "CREATE_BOOKING_ERR", err });
      });
  };
};
