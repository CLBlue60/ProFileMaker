import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyCVH4qzsIH3QzWWd8DO1DDbgdc7gCrindc",
  authDomain: "profilemaker-105e2.firebaseapp.com",
  projectId: "profilemaker-105e2",
  storageBucket: "profilemaker-105e2.firebasestorage.app",
  messagingSenderId: "1062153916881",
  appId: "1:1062153916881:web:b677a0a3c8c6a1202810f0",
  measurementId: "G-DSQHPMG9Z0",
};

const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const db = getFirestore(app);

export default app;
