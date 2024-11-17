import { collection, getDocs } from "firebase/firestore";
import { db } from "./firebaseConfig";
import { query, where, orderBy } from "firebase/firestore";

export const getAllCourseList = async () => {
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

export const getCoursesByLevel = async (level) => {
  try {
    // Önce kursları al
    const coursesSnapshot = await getDocs(
      query(collection(db, "Courses"), where("level", "==", level))
    );

    // Her kurs için chapter'ları da al
    const coursesWithChapters = await Promise.all(
      coursesSnapshot.docs.map(async (courseDoc) => {
        // Chapter'ları getir
        const chaptersSnapshot = await getDocs(
          collection(db, "Courses", courseDoc.id, "chapters")
        );

        // Kurs verilerini ve chapter'ları birleştir
        return {
          id: courseDoc.id,
          ...courseDoc.data(),
          chapters: chaptersSnapshot.docs.map(chapterDoc => ({
            id: chapterDoc.id,
            ...chapterDoc.data()
          }))
        };
      })
    );

    return coursesWithChapters;
  } catch (error) {
    console.error("Error getting courses by level:", error);
    throw error;
  }
};


export const enrollcourse = async (courseId, userId) => {
  try {
    await db.collection("EnrolledCourses").add({
      courseId,
      userId,
    });
  } catch (error) {
    console.error("Error enrolling course:", error);
    throw error;
  }
}