import { addDoc, collection, getDocs, getFirestore } from "firebase/firestore";
import { db } from "./firebaseConfig";
import { query, where, orderBy } from "firebase/firestore";
import { add } from "firebase/firestore";

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
          chapters: chaptersSnapshot.docs.map((chapterDoc) => ({
            id: chapterDoc.id,
            ...chapterDoc.data(),
          })),
        };
      })
    );

    return coursesWithChapters;
  } catch (error) {
    console.error("Error getting courses by level:", error);
    throw error;
  }
};

// export const enrollcourse = async (course, user) => {
//   try {
//     const db = getFirestore();
//     const userCourseRef = collection(db, "UserEnrolledCourse");

//     const q = query(
//       userCourseRef,
//       where("courseId", "==", course.id),
//     );

//     const querySnapshot = await getDocs(q);

//     if (!querySnapshot.empty) {
//       throw new Error("User already enrolled in this course");
//     }

//     await addDoc(userCourseRef, {
//       courseId: course.id,
//       userEmail: user.email,
//       completedChapters: [],
//       progress: 0,
//     });
//     console.log("Course enrolled successfully");
//   } catch (error) {
//     console.error("Error enrolling course:", error);
//     throw error;
//   }
// };

export const enrollcourse = async (courseId, userEmail) => {
  try {
    const email = userEmail.emailAddress;
    const userCourseRef = collection(db, "UserEnrolledCourse");

    const q = query(
      userCourseRef,
      where("courseId", "==", courseId),
      where("userEmail", "==", email)
    );

    const querySnapshot = await getDocs(q);

    if (!querySnapshot.empty) {
      throw new Error("User already enrolled in this course");
    }

    const docRef = await addDoc(userCourseRef, {
      courseId: courseId,
      userEmail: email,
      completedChapters: [],
      progress: 0,
    });
    return docRef.id;

  } catch (error) {
    console.error("Error enrolling course:", error);
    throw error;
  }
};
