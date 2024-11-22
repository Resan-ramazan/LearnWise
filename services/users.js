import { db } from './firebaseConfig';
import { doc, setDoc, getDoc } from 'firebase/firestore';

export const createOrUpdateUser = async (userData) => {
  try {
    const userRef = doc(db, 'users', userData.email);
    const userDoc = await getDoc(userRef);
    
    const sanitizedData = {
      email: userData.email,
      username: userData.username || '',
      profileImage: userData.profileImage || '',
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
      
      Object.keys(updatedData).forEach(key => {
        if (updatedData[key] === undefined) {
          delete updatedData[key];
        }
      });
      
      await setDoc(userRef, updatedData);
      return updatedData;
    }
  } catch (error) {
    console.error('Error creating/updating user:', error);
    throw error;
  }
};

export const getUserData = async (email) => {
  try {
    const userRef = doc(db, 'users', email);
    const userDoc = await getDoc(userRef);
    
    if (userDoc.exists()) {
      return userDoc.data();
    }
    return null;
  } catch (error) {
    console.error('Error getting user data:', error);
    throw error;
  }
}; 