import { collection, getDocs } from "firebase/firestore";
import { db } from "./firebaseConfig";

export const getCourseList = async () => {
  try {
    const querySnapshot = await getDocs(collection(db, "Courses"));
    return querySnapshot.docs.map((doc) => ({
      id: doc.id,
      ...doc.data(),
    }));
  } catch (error) {
    console.log("Error getting documents    ", error);
    throw error;
  }
};
