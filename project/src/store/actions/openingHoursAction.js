const setOpeningHours = (weekday, id) => {
  return (dispatch, getState, { getFirebase, getFirestore }) => {
    // make async to database
    const firestore = getFirestore();
    firestore
      .collection("store")
      .doc(id)
      .set(
        {
          workday: weekday
        },
        { merge: true }
      )
      .then(() => {
        dispatch({ type: "ADD_WORKDAY", weekday });
      })
      .catch(err => {
        dispatch({ type: "ADD_WORKDAY_ERROR", err });
      });
  };
};

export default setOpeningHours;
