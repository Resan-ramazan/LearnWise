import { db } from "./firebaseConfig";
import { doc, setDoc, getDoc, getDocs, collection, query, where } from "firebase/firestore";

export const createOrUpdateUser = async (userData) => {
  try {
    const userRef = doc(db, "users", userData.email);
    const userDoc = await getDoc(userRef);

    const sanitizedData = {
      email: userData.email,
      username: userData.username || "",
      profileImage: userData.profileImage || userData.imageUrl || "",
      points: userData.points || 0,
      completedCourses: userData.completedCourses || [],
      enrolledCourses: userData.enrolledCourses || [],
      lastLogin: new Date().toISOString(),
    };

    if (!userDoc.exists()) {
      const newUser = {
        ...sanitizedData,
        createdAt: new Date().toISOString(),
      };

      await setDoc(userRef, newUser);
      return newUser;
    } else {
      // Mevcut verileri koru ve yeni verileri birleştir
      const existingData = userDoc.data();
      const updatedData = {
        ...existingData,
        ...sanitizedData,
      };

      Object.keys(updatedData).forEach((key) => {
        if (updatedData[key] === undefined) {
          delete updatedData[key];
        }
      });

      await setDoc(userRef, updatedData);
      return updatedData;
    }
  } catch (error) {
    console.error("Error creating/updating user:", error);
    throw error;
  }
};

export const getUserData = async (email) => {
  try {
    const userRef = doc(db, "users", email);
    const userDoc = await getDoc(userRef);

    if (userDoc.exists()) {
      return userDoc.data();
    }
    return null;
  } catch (error) {
    console.error("Error getting user data:", error);
    throw error;
  }
};

export const getAllUsers = async () => {
  try {
    const querySnapshot = await getDocs(collection(db, "users"));
    const users = [];
    querySnapshot.forEach((doc) => {
      users.push({ id: doc.id, ...doc.data() });
    });
    return users;
  } catch (error) {
    console.error("Error getting users:", error);
    throw error;
  }
};

export const getUserCourseProgress = async (userEmail) => {
  if (!userEmail) {
    console.error("User email is required");
    return null;
  }

  try {
    // 1. UserEnrolledCourse'dan kullanıcının tüm kurslarını al
    const userCourseRef = collection(db, "UserEnrolledCourse");
    const courseQuery = query(
      userCourseRef,
      where("userEmail", "==", userEmail)
    );
    
    const enrolledCoursesSnapshot = await getDocs(courseQuery);
    
    if (enrolledCoursesSnapshot.empty) {
      return {
        userEmail,
        totalEnrolledCourses: 0,
        totalCompletedCourses: 0,
        totalPoints: 0,
        overallProgress: 0,
        courseProgressDetails: [],
        courseLevelStats: {},
        recentlyUpdatedCourses: []
      };
    }

    // 2. User dokümanından kullanıcı bilgilerini al
    const userDocRef = doc(db, 'users', userEmail);
    const userDocSnap = await getDoc(userDocRef);
    const userData = userDocSnap.data() || {};

    // 3. Enrolled ve completed kursları al
    const enrolledCourses = userData?.enrolledCourses || [];
    const completedCourses = userData?.completedCourses || [];

    // 4. Her kurs için detaylı ilerleme bilgisini al
    const courseProgressDetails = await Promise.all(
      enrolledCoursesSnapshot.docs.map(async (docSnapshot) => {
        const courseData = docSnapshot.data();
        
        // Kurs detaylarını al
        const courseDocRef = doc(db, "Courses", courseData.courseId);
        const courseDocSnap = await getDoc(courseDocRef);
        const courseDetails = courseDocSnap.data() || {};
        
        // Chapter'ları al
        const chaptersRef = collection(db, "Courses", courseData.courseId, "chapters");
        const chaptersSnapshot = await getDocs(chaptersRef);

        const totalChapters = chaptersSnapshot.docs.length;
        const completedChapters = courseData.completedChapters?.length || 0;
        const progressPercentage = totalChapters > 0 
          ? Math.round((completedChapters / totalChapters) * 100) 
          : 0;

        return {
          courseId: courseData.courseId,
          courseName: courseDetails?.name || 'Unnamed Course',
          courseLevel: courseDetails?.level || 'unknown',
          banner: courseDetails?.banner,
          totalChapters,
          completedChapters,
          progressPercentage,
          lastChapterId: courseData.lastChapterId,
          lastPosition: courseData.lastPosition,
          lastUpdated: courseData.lastUpdated || new Date().toISOString(),
          isCompleted: completedCourses.includes(courseData.courseId)
        };
      })
    );

    // 5. Özet istatistikleri hesapla
    const totalEnrolledCourses = enrolledCourses.length;
    const totalCompletedCourses = completedCourses.length;
    const totalPoints = userData?.points || 0;
    
    const overallProgress = courseProgressDetails.reduce((acc, course) => 
      acc + course.progressPercentage, 0) / (totalEnrolledCourses || 1);

    return {
      userEmail,
      totalEnrolledCourses,
      totalCompletedCourses,
      totalPoints,
      overallProgress: Math.round(overallProgress),
      courseProgressDetails,
      courseLevelStats: courseProgressDetails.reduce((acc, course) => {
        acc[course.courseLevel] = (acc[course.courseLevel] || 0) + 1;
        return acc;
      }, {}),
      recentlyUpdatedCourses: courseProgressDetails
        .sort((a, b) => new Date(b.lastUpdated) - new Date(a.lastUpdated))
        .slice(0, 3)
    };

  } catch (error) {
    console.error("Error getting user course progress:", error);
    throw error;
  }
};
