import { initializeApp } from 'firebase/app';
import { getFirestore } from 'firebase/firestore';

const firebaseConfig = {
  apiKey: "AIzaSyAunJvjy-uyANWmKc9TVh0Km7aRanwb8Ig",
  authDomain: "learnwise-1099b.firebaseapp.com",
  projectId: "learnwise-1099b",
  storageBucket: "learnwise-1099b.firebasestorage.app",
  messagingSenderId: "735648810768",
  appId: "1:735648810768:web:8aa687b0039cdcd8518795",
};

const app = initializeApp(firebaseConfig);
export const db = getFirestore(app);


