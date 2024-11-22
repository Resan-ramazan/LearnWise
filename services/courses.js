import {
  addDoc,
  collection,
  getDocs,
  getFirestore,
  doc,
  updateDoc,
  where,
  getDoc,
  setDoc,
} from "firebase/firestore";
import { db } from "./firebaseConfig";
import { query, orderBy } from "firebase/firestore";
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

export const enrollcourse = async (courseId, userEmail) => {
  try {
    const email = userEmail.emailAddress;
    const userCourseRef = collection(db, "UserEnrolledCourse");

    // Kullanıcı verisini al
    const userRef = doc(db, 'users', email);
    const userDoc = await getDoc(userRef);
    const userData = userDoc.data();

    // Enrolled courses listesini güncelle
    const updatedUserData = {
      ...userData,
      enrolledCourses: Array.from(new Set([...(userData.enrolledCourses || []), courseId]))
    };

    // Kullanıcı verisini güncelle
    await setDoc(userRef, updatedUserData);

    // Kurs kaydını oluştur
    const docRef = await addDoc(userCourseRef, {
      courseId: courseId,
      userEmail: email,
      completedChapters: [],
      progress: 0,
    });

    return { docRef: docRef.id, updatedUserData };
  } catch (error) {
    console.error("Error enrolling course:", error);
    throw error;
  }
};

export const updateUserEnrolledCourse = async (
  courseId,
  userEmail,
  chapterId,
  allChapterIds,
  chaptersLength
) => {
  try {
    // UserEnrolledCourse koleksiyonunu güncelle
    const userCourseRef = collection(db, "UserEnrolledCourse");
    const q = query(
      userCourseRef,
      where("courseId", "==", courseId),
      where("userEmail", "==", userEmail)
    );

    const querySnapshot = await getDocs(q);
    if (!querySnapshot.empty) {
      const docRef = doc(db, "UserEnrolledCourse", querySnapshot.docs[0].id);
      await updateDoc(docRef, {
        completedChapters: allChapterIds,
        progress: allChapterIds.length,
      });
    }

    // Users koleksiyonunu güncelle
    const userRef = doc(db, 'users', userEmail);
    const userDoc = await getDoc(userRef);
    const userData = userDoc.data();

    // Tüm chapterlar tamamlandıysa kursu compsletedCourses'a ekle
    const isFullyCompleted = allChapterIds.length === chaptersLength;
    let updatedUserData = { ...userData };

    if (isFullyCompleted) {
      const completedCourses = Array.from(new Set([...(userData.completedCourses || []), courseId]));
      updatedUserData = {
        ...updatedUserData,
        completedCourses,
        // Mevcut enrolledCourses ve points değerlerini koru
        enrolledCourses: userData.enrolledCourses || [],
        points: userData.points || 0
      };
    }

    await setDoc(userRef, updatedUserData, { merge: true });

    return updatedUserData;
  } catch (error) {
    console.error("Error updating course progress:", error);
    throw error;
  }
};

export const updateUserProgress = async (
  courseId,
  userEmail,
  currentChapterId,
  currentIndex
) => {
  try {
    const userCourseRef = collection(db, "UserEnrolledCourse");
    const q = query(
      userCourseRef,
      where("courseId", "==", courseId),
      where("userEmail", "==", userEmail)
    );

    const querySnapshot = await getDocs(q);
    if (!querySnapshot.empty) {
      const docRef = doc(db, "UserEnrolledCourse", querySnapshot.docs[0].id);
      const currentData = querySnapshot.docs[0].data();
      const completedChapters = currentData.completedChapters || [];

      // Eğer bu chapter daha önce tamamlanmamışsa ekle
      if (!completedChapters.includes(currentChapterId)) {
        completedChapters.push(currentChapterId);
      }

      await updateDoc(docRef, {
        lastChapterId: currentChapterId,
        lastPosition: currentIndex,
        lastUpdated: new Date().toISOString(),
        completedChapters: completedChapters, // Tamamlanan chapter'ları güncelle
        progress: completedChapters.length, // Progress'i de güncelle
      });
    }
  } catch (error) {
    console.error("Error updating user progress:", error);
    throw error;
  }
};

export const checkCourseEnrollment = async (courseId, userEmail) => {
  try {
    const userCourseRef = collection(db, "UserEnrolledCourse");
    const q = query(
      userCourseRef,
      where("courseId", "==", courseId),
      where("userEmail", "==", userEmail)
    );

    const querySnapshot = await getDocs(q);
    const courses = [];
    querySnapshot.forEach((doc) => {
      courses.push(doc.data());
    });
    return courses;
  } catch (error) {
    console.error("Error checking course enrollment:", error);
    throw error;
  }
};
