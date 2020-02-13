export const createStaff = (staff, id) => {
  return (dispatch, getState, { getFirebase, getFirestore }) => {
    const { image } = staff;
    const firestore = getFirestore();
    const firebase = getFirebase();

    const imagesPath = "images";

    firebase
      .uploadFile(imagesPath, image)
      .then(uploadedFile => {
        return uploadedFile.uploadTaskSnapshot.ref.getDownloadURL();
      })
      .then(downloadURL => {
        console.log(
          `Successfully uploaded file and got download link - ${downloadURL}`
        );
        return downloadURL;
      })
      .then(url => {
        staff.url = url;
        staff.image = image.name;

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
      });
  };
};
