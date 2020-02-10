export const createBooking = (booking, id) => {
  return (dispatch, getState, { getFirebase, getFirestore }) => {
    const { startTime, duration } = booking;
    const bookedTime = [];
    bookedTime[0] = startTime;
    bookedTime[1] = startTime + duration;

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
      // .then(() => {
      //   return firestore
      //     .collection("bookingTime")
      //     .doc(id)
      //     .collection(booking.bookedDay)
      //     .doc(booking.selectedStaff)
      //     .set(
      //       {
      //         bookedTime: [bookedTime]
      //       },
      //       { merge: true }
      //     );
      // })
      .then(() => {
        dispatch({ type: "CREATE_BOOKING", booking });
      })
      .catch(() => {
        dispatch({ type: "CREATE_BOOKING_ERR", err });
      });
  };
};

[0, 2];
