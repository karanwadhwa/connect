import { Permissions, ImagePicker } from "expo";

export default (uploadAvatar = async () => {
  const { status } = await Permissions.getAsync(Permissions.CAMERA_ROLL);

  if (status !== "granted") {
    const { status } = await Permissions.askAsync(Permissions.CAMERA_ROLL);
    if (status === "granted") {
      uploadAvatar();
    }
  }

  if (status === "granted") {
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: "Images",
      allowsEditing: true,
      aspect: [1, 1]
    });

    console.log(result);

    if (!result.cancelled) {
      // upload selected image
    }
  }
});
