export const createBooking = (booking, id) => {
  return (dispatch, getState, { getFirebase, getFirestore }) => {
    const {
      bookedDay,
      desc,
      duration,
      email,
      name,
      phone,
      selectedDate,
      selectedService,
      selectedStaff,
      startTime
    } = booking;
    const bookingInfo = {
      bookedDay,
      desc,
      duration,
      email,
      name,
      phone,
      selectedDate,
      selectedService: selectedService.id,
      selectedStaff: selectedStaff.id,
      startTime: startTime.num
    };

    // make async call to database
    const firestore = getFirestore();
    firestore
      .collection("store")
      .doc(id)
      .collection("booking")
      .doc()
      .set({
        ...bookingInfo,
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

export const deleteBooking = (bookingId, storeId) => {
  return (dispatch, getState, { getFirebase, getFirestore }) => {
    const firestore = getFirestore();
    firestore
      .collection("store")
      .doc(storeId)
      .collection("booking")
      .doc(bookingId)
      .delete()
      .then(() => {
        console.log("Document successfully deleted!");
        dispatch({ type: "DELETE_BOOKING", bookingId });
      })
      .catch(() => {
        dispatch({ type: "DELETE_BOOKING_ERR", err });
      });
  };
};
