// Import the functions you need from the SDKs you need
// import { getAnalytics } from "firebase/analytics";
import { initializeApp } from "firebase/app";
import { getAuth, getReactNativePersistence, initializeAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
import { getStorage } from "firebase/storage";
import { Platform } from "react-native";

import AsyncStorage from "@react-native-async-storage/async-storage";

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyCFhdbT8neDUc3-irHhkB1uIAkmrQ-P6M4",
  authDomain: "framez-554cc.firebaseapp.com",
  projectId: "framez-554cc",
  storageBucket: "framez-554cc.firebasestorage.app",
  messagingSenderId: "212883972773",
  appId: "1:212883972773:web:ea0dd1b02145ade51f234c",
  measurementId: "G-5TXC88MFSK"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
// const analytics = getAnalytics(app);

export const auth =
  Platform.OS === "web"
    ? getAuth(app)
    : initializeAuth(app, {
        persistence: getReactNativePersistence(AsyncStorage),
      });

// Firestore & Storage
export const db = getFirestore(app);
export const storage = getStorage(app);


