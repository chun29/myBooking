export const createStaff = (staff, id) => {
  return (dispatch, getState, { getFirebase, getFirestore }) => {
    const { name, phone, nickname, image, color, desc, email, url } = staff;
    const staffInfo = {
      name,
      phone,
      nickname,
      image,
      color,
      desc,
      email,
      url
    };
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
        staffInfo.url = url;
        staffInfo.image = image.name;
        console.log(staffInfo);
        firestore
          .collection("store")
          .doc(id)
          .collection("staff")
          .doc()
          .set(staffInfo, { merge: true })
          .then(() => {
            dispatch({ type: "CREATE_STAFF", staffInfo });
          })
          .catch(err => {
            dispatch({ type: "CREATE_STAFF_ERROR", err });
          });
      });
  };
};

export const deleteStaff = (storeId, staffId) => {
  return (dispatch, getState, { getFirebase, getFirestore }) => {
    const firestore = getFirestore();
    firestore
      .collection("store")
      .doc(storeId)
      .collection("staff")
      .doc(staffId)
      .delete()
      .then(() => {
        console.log("服務人員刪除成功!");
        dispatch({ type: "DELETE_STAFF", staffId });
      })
      .catch(() => {
        dispatch({ type: "DELETE_STAFF_ERR", err });
      });
  };
};
