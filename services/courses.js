import { collection, getDocs } from "firebase/firestore";
import { db } from "./firebaseConfig";
import { query, where, orderBy } from "firebase/firestore";

export const getAllCourseList = async () => {
  try {
    const querySnapshot = await getDocs(collection(db, "Courses"));
    return querySnapshot.docs.map(doc => ({
        id: doc.id,
        ...doc.data()
      }));
  } catch (error) {
    console.log("Error getting documents    ", error);
    throw error;
  }
};


export const getCoursesByLevel = async (level) => {
    try {
      const coursesSnapshot = await getDocs(
        query(
          collection(db, 'Courses',),
          where('level', '==', level),
        )
      );
      return coursesSnapshot.docs.map(doc => ({
        id: doc.id,
        ...doc.data()
      }));
    } catch (error) {
      console.error('Error getting courses by level:', error);
      throw error;
    }
  };
  