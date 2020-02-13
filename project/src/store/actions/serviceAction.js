export const createService = (service, id) => {
  return (dispatch, getState, { getFirebase, getFirestore }) => {
    console.log(service);
    // make async to database
    const firestore = getFirestore();
    console.log(firestore.collection("store"));
    firestore
      .collection("store")
      .doc(id)
      .collection("service")
      .doc()
      .set(service, { merge: true })
      .then(() => {
        dispatch({ type: "CREATE_SERVICE", service });
      })
      .catch(err => {
        dispatch({ type: "CREATE_SERVICE_ERROR", err });
      });
  };
};
