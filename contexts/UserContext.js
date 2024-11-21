import React, { createContext, useContext, useState } from 'react';
import { createOrUpdateUser, getUserData } from '../services/users';

const UserContext = createContext();

export const UserProvider = ({ children }) => {
  const [userData, setUserData] = useState(null);
  const [loading, setLoading] = useState(false);

  const initializeUser = async (clerkUser) => {
    try {
      setLoading(true);
      const userInfo = {
        email: clerkUser.primaryEmailAddress.emailAddress,
        username: clerkUser.username || clerkUser.firstName,
        profileImage: clerkUser.profileImageUrl,
      };
      
      const user = await createOrUpdateUser(userInfo);
      setUserData(user);
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
      
      await createOrUpdateUser(updatedUser);
      setUserData(updatedUser);
    } catch (error) {
      console.error('Error updating user points:', error);
    }
  };

  return (
    <UserContext.Provider
      value={{
        userData,
        loading,
        initializeUser,
        updateUserPoints,
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