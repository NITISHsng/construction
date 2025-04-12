import { initializeApp } from "firebase/app";
import { getAuth, GoogleAuthProvider, signInWithEmailAndPassword, signInWithPopup } from "firebase/auth";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyB-oZ_DyDSdg8JqBPRY8aGHc04p0KGqHTU",
  authDomain: "construction-92034.firebaseapp.com",
  projectId: "construction-92034",
  storageBucket: "construction-92034.appspot.com",
  messagingSenderId: "480307905801",
  appId: "1:480307905801:web:696f0243f40af0615fbfd8",
};

const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const db = getFirestore(app);
export const googleProvider = new GoogleAuthProvider();
export { signInWithEmailAndPassword, signInWithPopup };
