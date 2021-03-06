export const createBooking = (booking, store) => {
  return (dispatch, getState, { getFirebase, getFirestore }) => {
    const { id } = store;
    const storeName = store.online ? store.online.storeName : "";
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
      storeName,
      selectedService: selectedService.id,
      selectedStaff: selectedStaff.id,
      startTime: startTime.num,
      serviceItem: selectedService.item,
      staffName: selectedStaff.name,
      staffNickname: selectedStaff.nickname,
      timeText: startTime.text
    };

    const firestore = getFirestore();
    firestore
      .collection("store")
      .doc(id)
      .collection("booking")
      .add({
        ...bookingInfo,
        createdAt: new Date()
      })
      .then(docRef => {
        booking.id = docRef.id;
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
        dispatch({ type: "DELETE_BOOKING", bookingId });
      })
      .catch(() => {
        dispatch({ type: "DELETE_BOOKING_ERR", err });
      });
  };
};
