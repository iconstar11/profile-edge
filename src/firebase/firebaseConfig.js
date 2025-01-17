// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyA_kYvODfmZ7XcnGLCBuxKHlaM8gA-20HE",
  authDomain: "profile-edge-e5854.firebaseapp.com",
  projectId: "profile-edge-e5854",
  storageBucket: "profile-edge-e5854.firebasestorage.app",
  messagingSenderId: "755712020403",
  appId: "1:755712020403:web:b56afd4ab06eed1b0385c6",
  measurementId: "G-7H6XPQVZWY"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);