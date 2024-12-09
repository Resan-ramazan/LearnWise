import React, { createContext, useContext, useState, useEffect } from "react";
import { getUserData, createOrUpdateUser, getAllUsers } from "../services/users";

// Import'u test edelim
console.log("getAllUsers function:", getAllUsers);

// Create Context for User Management
const UserContext = createContext();

export const UserProvider = ({ children }) => {
  // State for user data and loading status
  const [userData, setUserData] = useState(null);
  const [loading, setLoading] = useState(true);

  // Initialize user after authentication with Clerk
  const initializeUser = async (clerkUser) => {
    try {
      setLoading(true);
      const email = clerkUser.primaryEmailAddress?.emailAddress;

      if (!email) {
        throw new Error("User email is required");
      }

      // Check if user exists in database
      let existingUser = await getUserData(email);

      // Create new user if doesn't exist
      if (!existingUser) {
        const userInfo = {
          email: email,
          username: clerkUser.username || clerkUser.firstName || "",
          profileImage: clerkUser.profileImageUrl || "",
          points: 0,
          completedCourses: [],
          enrolledCourses: [],
        };
        existingUser = await createOrUpdateUser(userInfo);
      }

      setUserData(existingUser);
    } catch (error) {
      console.error("Error initializing user:", error);
    } finally {
      setLoading(false);
    }
  };

  // Function to update user points
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
      console.error("Error updating user points:", error);
    }
  };

  // Function to refresh user data from database
  const refreshUserData = async () => {
    if (!userData?.email) return;

    try {
      const freshUserData = await getUserData(userData.email);
      if (freshUserData) {
        setUserData(freshUserData);
      }
    } catch (error) {
      console.error("Error refreshing user data:", error);
    }
  };

  // Function to get all users sorted by points (for leaderboard)
  const getAllUsersByPoints = async () => {
    try {
      const users = await getAllUsers();
      return users.sort((a, b) => b.points - a.points);
    } catch (error) {
      console.error("Error getting users by points:", error);
      throw error;
    }
  };

  // Function to update user's profile image
  const updateUserProfileImage = async (imageUrl) => {
    if (!userData?.email) return;

    try {
      const updatedUser = {
        ...userData,
        profileImage: imageUrl,
      };

      const updatedUserData = await createOrUpdateUser(updatedUser);
      setUserData(updatedUserData);
    } catch (error) {
      console.error("Error updating profile image:", error);
    }
  };

  // Provide user context to child components
  return (
    <UserContext.Provider
      value={{
        userData,
        loading,
        initializeUser,
        updateUserPoints,
        refreshUserData,
        getAllUsersByPoints,
        updateUserProfileImage,
      }}
    >
      {children}
    </UserContext.Provider>
  );
};

// Custom hook for using user context
export const useUser = () => {
  const context = useContext(UserContext);
  if (!context) {
    throw new Error("useUser must be used within a UserProvider");
  }
  return context;
};
