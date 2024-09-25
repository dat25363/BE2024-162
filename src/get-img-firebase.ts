import { initializeApp } from "firebase/app";
import { getStorage, ref, getDownloadURL } from "firebase/storage";

const firebaseConfig = {
  storageBucket: "project25363.appspot.com",
};

// Khởi tạo Firebase
const app = initializeApp(firebaseConfig);
const storage = getStorage(app);

export default async function getImageUrl(
  fileName: string
): Promise<string | null> {
  try {
    const imageRef = ref(storage, fileName);
    const url = await getDownloadURL(imageRef);
    return url;
  } catch (error) {
    console.error("Error getting image URL:", error);
    return null;
  }
}
