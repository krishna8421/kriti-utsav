import { ref, uploadBytes, getDownloadURL } from "firebase/storage";
import { showNotification } from "@mantine/notifications";
import { storage } from "../firebase";

export const UploadPhoto = async (file: File | null, userId: string) => {
  try {
    if (file) {
      // @ts-ignore
      const storageRef = ref(
        storage,
        // @ts-ignore
        `/${userId}/${file.name.trim().replace(/\s/g, "-")}`
      );
      await uploadBytes(storageRef, file).then(() => {
        showNotification({
          title: "Success",
          message: "File Uploaded Successfully",
          color: "green",
          autoClose: 3 * 1000,
        });
      });
      const url = await getDownloadURL(storageRef);
      return url;
    }
  } catch (err) {
    showNotification({
      title: "Error",
      message: "Unable to Upload Photo",
      color: "red",
      autoClose: 3 * 1000,
    });
  }
};
