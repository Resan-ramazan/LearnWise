// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

import { getFirestore } from "firebase/firestore";

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyAunJvjy-uyANWmKc9TVh0Km7aRanwb8Ig",
  authDomain: "learnwise-1099b.firebaseapp.com",
  projectId: "learnwise-1099b",
  storageBucket: "learnwise-1099b.firebasestorage.app",
  messagingSenderId: "735648810768",
  appId: "1:735648810768:web:8aa687b0039cdcd8518795",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const db = getFirestore(app);


