import React, { createContext, useContext, useState, useEffect } from 'react';
import { getUserData, createOrUpdateUser } from '../services/users';

const UserContext = createContext();

export const UserProvider = ({ children }) => {
  const [userData, setUserData] = useState(null);
  const [loading, setLoading] = useState(true);

  const initializeUser = async (clerkUser) => {
    try {
      setLoading(true);
      const email = clerkUser.primaryEmailAddress?.emailAddress;
      
      if (!email) {
        throw new Error('User email is required');
      }

      // Önce mevcut kullanıcı verilerini getir
      let existingUser = await getUserData(email);
      
      if (!existingUser) {
        // Kullanıcı yoksa yeni oluştur
        const userInfo = {
          email: email,
          username: clerkUser.username || clerkUser.firstName || '',
          profileImage: clerkUser.profileImageUrl || '',
          points: 0,
          completedCourses: [],
          enrolledCourses: [],
        };
        existingUser = await createOrUpdateUser(userInfo);
      }

      setUserData(existingUser);
    } catch (error) {
      console.error('Error initializing user:', error);
    } finally {
      setLoading(false);
    }
  };

  const updateUserPoints = async (points) => {
    if (!userData?.email) return;
    
    try {
      const updatedUser = {
        ...userData,
        points: (userData.points || 0) + points,
      };
      
      const updatedUserData = await createOrUpdateUser(updatedUser);
      setUserData(updatedUserData);
    } catch (error) {
      console.error('Error updating user points:', error);
    }
  };

  const refreshUserData = async () => {
    if (!userData?.email) return;
    
    try {
      const freshUserData = await getUserData(userData.email);
      if (freshUserData) {
        setUserData(freshUserData);
      }
    } catch (error) {
      console.error('Error refreshing user data:', error);
    }
  };

  return (
    <UserContext.Provider
      value={{
        userData,
        loading,
        initializeUser,
        updateUserPoints,
        refreshUserData,
      }}
    >
      {children}
    </UserContext.Provider>
  );
};

export const useUser = () => {
  const context = useContext(UserContext);
  if (!context) {
    throw new Error('useUser must be used within a UserProvider');
  }
  return context;
}; 