import firebase from "firebase/app";
import "firebase/firestore";

const config = {
  apiKey: process.env.VUE_APP_FIREBASE_API_KEY,
  authDomain: "testinggrounds-96659.firebaseapp.com",
  projectId: "testinggrounds-96659",
  storageBucket: "testinggrounds-96659.appspot.com",
  messagingSenderId: "662090940107",
  appId: "1:662090940107:web:60944f4bcc6e4d9613a54e",
};
const firebaseApp = firebase.initializeApp(config);

export const db = firebaseApp.firestore();
export const overlayCollection = db.collection("overlay");
