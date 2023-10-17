import { initializeApp } from "firebase/app";
import { getStorage, getDownloadURL, ref, uploadBytes } from "firebase/storage";
import dotenv from "dotenv";

dotenv.config();

const firebaseConfig = {
  apiKey: process.env.FIREBASE_API_KEY,
  authDomain: "tdp013.firebaseapp.com",
  projectId: "tdp013",
  storageBucket: "tdp013.appspot.com",
  messagingSenderId: process.env.FIREBASE_MESSAGING_SENDER_ID,
  appId: process.env.FIREBASE_APP_ID,
  measurementId: process.env.FIREBASE_MEASUREMENT_ID,
};

/**
 * This function takes an image file as input and uploads it to Firebase Storage. It then returns
 * the download URL of the uploaded image. If the upload or retrieval fails, it resolves with an
 * empty string.
 */
export const uploadImage = (files) => {
  return new Promise((resolve, reject) => {
    if (files && Object.keys(files).length !== 0) {
      const image = ref(
        storage,
        "postImages/" + `${Date.now()}_${files.image.name}`
      );

      uploadBytes(image, files.image.data)
        .then(() => getDownloadURL(image))
        .then((imageURL) => {
          console.log(imageURL);
          resolve(imageURL);
        })
        .catch((err) => {
          console.error(err);
          resolve("");
        });
    } else {
      resolve("");
    }
  });
};

const app = initializeApp(firebaseConfig);
const storage = getStorage(app);
