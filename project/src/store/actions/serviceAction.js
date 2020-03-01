export const createService = (service, id) => {
  return (dispatch, getState, { getFirebase, getFirestore }) => {
    const { item, price, desc, duration, image, url } = service;
    const newService = {
      item,
      price,
      desc,
      duration,
      image,
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
          console.log(
            `Successfully uploaded file and got download link - ${downloadURL}`
          );
          return downloadURL;
        })
        .then(url => {
          newService.url = url;
          newService.image = image.name;

          firestore
            .collection("store")
            .doc(id)
            .collection("service")
            .doc()
            .set(newService, { merge: true })
            .then(() => {
              dispatch({ type: "CREATE_SERVICE", newService });
            })
            .catch(err => {
              dispatch({ type: "CREATE_SERVICE_ERROR", err });
            });
        });
    } else {
      firestore
        .collection("store")
        .doc(id)
        .collection("service")
        .doc()
        .set(newService, { merge: true })
        .then(() => {
          dispatch({ type: "CREATE_SERVICE", newService });
        })
        .catch(err => {
          dispatch({ type: "CREATE_SERVICE_ERROR", err });
        });
    }
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

export const editService = (storeId, serviceId, serviceInfo) => {
  return (dispatch, getState, { getFirebase, getFirestore }) => {
    const { item, price, desc, duration, image, url } = serviceInfo;
    const newService = {
      item,
      price,
      desc,
      duration,
      image,
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
        .uploadFile(imagesPath, image, options)
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
          newService.url = url;
          newService.image = image.name;

          firestore
            .collection("store")
            .doc(storeId)
            .collection("service")
            .doc(serviceId)
            .update(newService)
            .then(() => {
              dispatch({ type: "EDIT_SERVICE", newService });
            })
            .catch(err => {
              dispatch({ type: "EDIT_SERVICE_ERROR", err });
            });
        });
    } else {
      firestore
        .collection("store")
        .doc(storeId)
        .collection("service")
        .doc(serviceId)
        .update(newService)
        .then(() => {
          dispatch({ type: "EDIT_SERVICE", newService });
        })
        .catch(err => {
          dispatch({ type: "EDIT_SERVICE_ERROR", err });
        });
    }
  };
};
