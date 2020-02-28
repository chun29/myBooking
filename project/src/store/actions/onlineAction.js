export const onlineSetup = (online, id) => {
  return (dispatch, getState, { getFirebase, getFirestore }) => {
    const { logoImage } = online;
    const { bannerImage } = online;
    const firestore = getFirestore();
    const firebase = getFirebase();

    const imagesPath = "images";
    console.log(online);

    if (logoImage.name && bannerImage.name) {
      firebase
        .uploadFile(imagesPath, logoImage)
        .then(uploadFile => {
          return uploadFile.uploadTaskSnapshot.ref.getDownloadURL();
        })
        .then(downloadURL => {
          console.log(
            `Successfully uploaded file and got download link - ${downloadURL}`
          );
          return downloadURL;
        })
        .then(url => {
          online.logoSrc = url;
          online.logoImage = logoImage.name;
          return firebase.uploadFile(imagesPath, bannerImage);
        })
        .then(uploadFile => {
          return uploadFile.uploadTaskSnapshot.ref.getDownloadURL();
        })
        .then(downloadURL => {
          console.log(
            `Successfully uploaded file and got download link - ${downloadURL}`
          );
          return downloadURL;
        })
        .then(url => {
          online.bannerSrc = url;
          online.bannerImage = bannerImage.name;

          firestore
            .collection("store")
            .doc(id)
            .set({ online: online }, { merge: true })
            .then(() => {
              dispatch({ type: "ONLINE-SETUP", online });
            })
            .catch(err => {
              dispatch({ type: "ONLINE-SETUP_ERROR", err });
            });
        });
    } else if (logoImage.name && !bannerImage.name) {
      firebase
        .uploadFile(imagesPath, logoImage)
        .then(uploadFile => {
          return uploadFile.uploadTaskSnapshot.ref.getDownloadURL();
        })
        .then(downloadURL => {
          console.log(
            `Successfully uploaded file and got download link - ${downloadURL}`
          );
          return downloadURL;
        })
        .then(url => {
          online.logoSrc = url;
          online.logoImage = logoImage.name;
          firestore
            .collection("store")
            .doc(id)
            .set({ online: online }, { merge: true })
            .then(() => {
              dispatch({ type: "ONLINE-SETUP", online });
            })
            .catch(err => {
              dispatch({ type: "ONLINE-SETUP_ERROR", err });
            });
        });
    } else if (!logoImage.name && bannerImage.name) {
      firebase
        .uploadFile(imagesPath, bannerImage)
        .then(uploadFile => {
          return uploadFile.uploadTaskSnapshot.ref.getDownloadURL();
        })
        .then(downloadURL => {
          console.log(
            `Successfully uploaded file and got download link - ${downloadURL}`
          );
          return downloadURL;
        })
        .then(url => {
          online.bannerSrc = url;
          online.bannerImage = bannerImage.name;

          firestore
            .collection("store")
            .doc(id)
            .set({ online: online }, { merge: true })
            .then(() => {
              dispatch({ type: "ONLINE-SETUP", online });
            })
            .catch(err => {
              dispatch({ type: "ONLINE-SETUP_ERROR", err });
            });
        });
    } else if (!logoImage.name && !bannerImage.name) {
      firestore
        .collection("store")
        .doc(id)
        .set({ online: online }, { merge: true })
        .then(() => {
          dispatch({ type: "ONLINE-SETUP", online });
        })
        .catch(err => {
          dispatch({ type: "ONLINE-SETUP_ERROR", err });
        });
    }
  };
};
