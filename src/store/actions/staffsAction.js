export const createStaff = (staff, id) => {
  return (dispatch, getState, { getFirebase, getFirestore }) => {
    const { name, phone, nickname, image, color, desc, email, url } = staff;
    const newStaff = {
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
    if (image.name) {
      const options = {
        name: image => `${image.name}/${Date.now()}`
      };
      firebase
        .uploadFile(imagesPath, image, null, options)
        .then(uploadedFile => {
          return uploadedFile.uploadTaskSnapshot.ref.getDownloadURL();
        })
        .then(downloadURL => {
          return downloadURL;
        })
        .then(url => {
          newStaff.url = url;
          newStaff.image = image.name;

          firestore
            .collection("store")
            .doc(id)
            .collection("staff")
            .doc()
            .set(newStaff, { merge: true })
            .then(() => {
              dispatch({ type: "CREATE_STAFF", newStaff });
            })
            .catch(err => {
              dispatch({ type: "CREATE_STAFF_ERROR", err });
            });
        });
    } else {
      firestore
        .collection("store")
        .doc(id)
        .collection("staff")
        .doc()
        .set(newStaff, { merge: true })
        .then(() => {
          dispatch({ type: "CREATE_STAFF", newStaff });
        })
        .catch(err => {
          dispatch({ type: "CREATE_STAFF_ERROR", err });
        });
    }
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
        dispatch({ type: "DELETE_STAFF", staffId });
      })
      .catch(() => {
        dispatch({ type: "DELETE_STAFF_ERR", err });
      });
  };
};

export const editStaff = (storeId, staffId, staffInfo) => {
  return (dispatch, getState, { getFirebase, getFirestore }) => {
    const { name, phone, nickname, image, color, desc, email, url } = staffInfo;
    const newStaff = {
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
    if (image.name) {
      const options = {
        name: image => `${image.name}/${Date.now()}`
      };
      firebase
        .uploadFile(imagesPath, image, null, options)
        .then(uploadedFile => {
          return uploadedFile.uploadTaskSnapshot.ref.getDownloadURL();
        })
        .then(downloadURL => {
          return downloadURL;
        })
        .then(url => {
          newStaff.url = url;
          newStaff.image = image.name;

          firestore
            .collection("store")
            .doc(storeId)
            .collection("staff")
            .doc(staffId)
            .update(newStaff)
            .then(() => {
              dispatch({ type: "EDIT_STAFF", newStaff });
            })
            .catch(err => {
              dispatch({ type: "EDIT_STAFF_ERROR", err });
            });
        });
    } else {
      firestore
        .collection("store")
        .doc(storeId)
        .collection("staff")
        .doc(staffId)
        .update(newStaff)
        .then(() => {
          dispatch({ type: "EDIT_STAFF", newStaff });
        })
        .catch(err => {
          dispatch({ type: "EDIT_STAFF_ERROR", err });
        });
    }
  };
};
