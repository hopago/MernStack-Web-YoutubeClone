// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth, GoogleAuthProvider } from 'firebase/auth';
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyADFN0DXXe_jJa9cZ6P32hpExSANmpwB3Q",
  authDomain: "clone-748b3.firebaseapp.com",
  projectId: "clone-748b3",
  storageBucket: "clone-748b3.appspot.com",
  messagingSenderId: "1077158923958",
  appId: "1:1077158923958:web:b63848719ee649f29de017"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const auth = getAuth();
export const provider = new GoogleAuthProvider();

export default app;