export const onlineSetup = (online, id) => {
  return (dispatch, getState, { getFirebase, getFirestore }) => {
    const { logoImage } = online;
    const { bannerImage } = online;
    const firestore = getFirestore();
    const firebase = getFirebase();

    const imagesPath = "images";

    if (logoImage.name && bannerImage.name) {
      const options = {
        name: logoImage => `${logoImage.name}/${Date.now()}`
      };

      firebase
        .uploadFile(imagesPath, logoImage, null, options)
        .then(uploadFile => {
          return uploadFile.uploadTaskSnapshot.ref.getDownloadURL();
        })
        .then(downloadURL => {
          return downloadURL;
        })
        .then(url => {
          online.logoSrc = url;
          online.logoImage = logoImage.name;
          const optionsB = {
            name: bannerImage => `${bannerImage.name}/${Date.now()}`
          };

          return firebase.uploadFile(imagesPath, bannerImage, null, optionsB);
        })
        .then(uploadFile => {
          return uploadFile.uploadTaskSnapshot.ref.getDownloadURL();
        })
        .then(downloadURL => {
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
      const options = {
        name: logoImage => `${logoImage.name}/${Date.now()}`
      };
      firebase
        .uploadFile(imagesPath, logoImage, null, options)
        .then(uploadFile => {
          return uploadFile.uploadTaskSnapshot.ref.getDownloadURL();
        })
        .then(downloadURL => {
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
      const options = {
        name: bannerImage => `${bannerImage.name}/${Date.now()}`
      };
      firebase
        .uploadFile(imagesPath, bannerImage, null, options)
        .then(uploadFile => {
          return uploadFile.uploadTaskSnapshot.ref.getDownloadURL();
        })
        .then(downloadURL => {
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
