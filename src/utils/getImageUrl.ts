import { getStorage, ref, getDownloadURL } from "firebase/storage";
import { initializeApp } from "firebase/app";
import {FIREBASE} from "../config/constant"

const firebaseConfig = { storageBucket: FIREBASE.STORAGE_BUCKET};

const app = initializeApp(firebaseConfig);
const storage = getStorage(app);

const getImageUrl = async (fileName: string): Promise<string | null> => {
  try {
    const imageRef = ref(storage, fileName);
    const url = await getDownloadURL(imageRef);
    return url;
  } catch (error) {
    console.error("Error getting image URL:", error);
    return null;
  }
};

export default getImageUrl;