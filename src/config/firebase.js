// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getFirestore } from "firebase/firestore";

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: process.env.REACT_APP_FIREBASE_API_KEY,
  authDomain: "gtmovies-1efd8.firebaseapp.com",
  databaseURL: "https://gtmovies-1efd8-default-rtdb.firebaseio.com",
  projectId: "gtmovies-1efd8",
  storageBucket: "gtmovies-1efd8.firebasestorage.app",
  messagingSenderId: "111622341698",
  appId: "1:111622341698:web:8bf8fe878c3f58520e19db",
  measurementId: "G-P94BGM5GXT"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
const db = getFirestore(app);

export { app, analytics, db };
