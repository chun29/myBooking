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

export const deleteService = (storeId, serviceId) => {
  return (dispatch, getState, { getFirebase, getFirestore }) => {
    const firestore = getFirestore();
    firestore
      .collection("store")
      .doc(storeId)
      .collection("service")
      .doc(serviceId)
      .delete()
      .then(() => {
        console.log("服務刪除成功!");
        dispatch({ type: "DELETE_SERVICE", serviceId });
      })
      .catch(() => {
        dispatch({ type: "DELETE_SERVICE_ERR", err });
      });
  };
};
