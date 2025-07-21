// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getAuth } from "firebase/auth";

const firebaseConfig = {
  apiKey: "AIzaSyBm5utRNsvDL8LUko_9Nawlptx0mCsvLXc",
  authDomain: "courierly.firebaseapp.com",
  projectId: "courierly",
  storageBucket: "courierly.firebasestorage.app",
  messagingSenderId: "702379598896",
  appId: "1:702379598896:web:b449b3c0900195ded479f5",
  measurementId: "G-V8E571M8LQ"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
const auth = getAuth(app);

export default auth;
