import { ActivityIndicator, StyleSheet, Text, View } from "react-native";
import React, { useEffect, useState } from "react";
import Header from "../components/HomeScreen/Header";
import Color from "../utils/Color";
import CourseList from "../components/HomeScreen/CourseList";
import { useUser as useClerkUser } from "@clerk/clerk-expo";
import { useUser } from "../contexts/UserContext";
import { useNavigation } from "@react-navigation/native";
import CourseProgress from "../components/HomeScreen/CourseProgress";
import { ScrollView } from "react-native-gesture-handler";
import { LinearGradient } from "expo-linear-gradient";
import { useTheme } from "../contexts/ThemeContext";

const HomeScreen = () => {
  // Navigation and user management hooks
  const navigation = useNavigation();
  const { user: clerkUser } = useClerkUser();
  const { userData, initializeUser, loading, refreshUserData } = useUser();
  const [searchQuery, setSearchQuery] = useState("");
  const { theme, colors } = useTheme();

  // Initialize user data when Clerk user is available
  useEffect(() => {
    if (clerkUser) {
      initializeUser(clerkUser);
    }
  }, [clerkUser]);

  // Refresh user data when screen comes into focus
  useEffect(() => {
    const unsubscribe = navigation.addListener("focus", () => {
      if (userData?.email) {
        refreshUserData();
      }
    });

    return unsubscribe;
  }, [navigation, userData]);

  // Search handler for course filtering
  const handleSearch = (query) => {
    setSearchQuery(query);
  };

  // Loading state display
  if (loading) {
    return (
      <View style={[styles.loadingContainer, { backgroundColor: colors.background }]}>
        <ActivityIndicator size="large" color={theme === 'dark' ? Color.ORANGE : Color.PRIMARY} />
      </View>
    );
  }

  return (
    <ScrollView 
      style={[styles.container, { backgroundColor: colors.background }]} 
      contentContainerStyle={{ paddingBottom: 100 }}
    >
      {userData && (
        <>
          {/* Header section with gradient background */}
          <LinearGradient
            colors={theme === 'dark' 
              ? ['#1a1a1a', '#2d2d2d']
              : [Color.PRIMARTY_COLOR, "#7c4dff"]}
            style={styles.header}
          >
            <Header 
              userData={userData} 
              onSearch={handleSearch}
              theme={theme}
              colors={colors}
            />
          </LinearGradient>

          {/* Main content section */}
          <View style={[styles.content, {
            backgroundColor: 'transparent'
          }]}>
            {/* Course progress overview */}
            <View style={styles.progressSection}>
              <CourseProgress theme={theme} colors={colors} />
            </View>

            {/* Course lists section */}
            <View style={styles.coursesSection}>
              {/* Basic level courses */}
              <CourseList 
                level="basic" 
                searchQuery={searchQuery}
                theme={theme}
                colors={colors}
              />
              {/* Advanced level courses */}
              <CourseList 
                level="advanced" 
                searchQuery={searchQuery}
                theme={theme}
                colors={colors}
              />
            </View>
          </View>
        </>
      )}
    </ScrollView>
  );
};

export default HomeScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingBottom: 100,
  },
  header: {
    height: 280,
    padding: 20,
    borderBottomLeftRadius: 30,
    borderBottomRightRadius: 30,
  },
  content: {
    flex: 1,
    marginTop: -80,
  },
  progressSection: {
    marginHorizontal: 20,
    marginBottom: 20,
  },
  coursesSection: {
    marginTop: -40,
    padding: 20,
  },
  loadingContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
});
