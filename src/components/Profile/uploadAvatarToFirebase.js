import { Permissions, ImagePicker, ImageManipulator } from "expo";
import firebase from "firebase";

export default (uploadAvatarToFirebase = async userID => {
  const { status } = await Permissions.getAsync(Permissions.CAMERA_ROLL);

  if (status !== "granted") {
    const { status } = await Permissions.askAsync(Permissions.CAMERA_ROLL);
    if (status === "granted") {
      uploadAvatar();
    }
  }

  if (status === "granted") {
    let pickedImg = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: "Images",
      allowsEditing: true,
      aspect: [1, 1]
    });

    if (!pickedImg.cancelled) {
      // convert selected image to jpg
      pickedImgJPEG = await ImageManipulator.manipulateAsync(pickedImg.uri, [
        { format: "jpeg" }
      ]);

      // Why are we using XMLHttpRequest? See:
      // https://github.com/expo/expo/issues/2402#issuecomment-443726662
      const blob = await new Promise((resolve, reject) => {
        const xhr = new XMLHttpRequest();
        xhr.onload = function() {
          resolve(xhr.response);
        };
        xhr.onerror = function(e) {
          console.log(e);
          reject(new TypeError("Network request failed"));
        };
        xhr.responseType = "blob";
        xhr.open("GET", pickedImgJPEG.uri, true);
        xhr.send(null);
      });

      // upload to firebase storage
      let ref = firebase
        .storage()
        .ref()
        .child(`avatars/${userID}`);

      const uploadTask = await ref.put(blob);

      // We're done with the blob, close and release it
      blob.close();

      return await uploadTask.ref.getDownloadURL();
    }
  }
});
