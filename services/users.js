import { db } from './firebaseConfig';
import { doc, setDoc, getDoc } from 'firebase/firestore';

export const createOrUpdateUser = async (userData) => {
  try {
    const userRef = doc(db, 'users', userData.email);
    
    // Önce kullanıcının var olup olmadığını kontrol et
    const userDoc = await getDoc(userRef);
    
    if (!userDoc.exists()) {
      // Yeni kullanıcı oluştur
      const newUser = {
        email: userData.email,
        username: userData.username || '',
        profileImage: userData.profileImage || '',
        points: 0,
        completedCourses: [],
        enrolledCourses: [],
        createdAt: new Date().toISOString(),
        lastLogin: new Date().toISOString(),
      };
      
      await setDoc(userRef, newUser);
      return newUser;
    } else {
      // Sadece son giriş tarihini güncelle
      const updatedData = {
        ...userDoc.data(),
        lastLogin: new Date().toISOString(),
      };
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