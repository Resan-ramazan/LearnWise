import {
  StyleSheet,
  Text,
  View,
  FlatList,
  Image,
  TouchableOpacity,
} from "react-native";
import React, { useState, useCallback } from "react";
import Color from "../utils/Color";
import { useUser } from "@clerk/clerk-expo";
import { useNavigation, useFocusEffect } from "@react-navigation/native";
import { useCourse } from "../contexts/CourseContext";
import { Ionicons } from "@expo/vector-icons";
import * as Progress from "react-native-progress";
import CourseProgItem from "../components/MyCourse/CourseProgItem";
import { LinearGradient } from 'expo-linear-gradient';

const MyCourse = () => {
  const { user } = useUser();
  const navigation = useNavigation();
  const { inProgressCourses, getInProgressCourses, handleCoursePress } =
    useCourse();

  useFocusEffect(
    useCallback(() => {
      const loadCourses = async () => {
        try {
          const email = user?.primaryEmailAddress?.emailAddress;
          if (email) {
            await getInProgressCourses(email);
          }
        } catch (error) {
          console.error("Error loading courses:", error);
        }
      };

      loadCourses();
    }, [user])
  );

  const onCoursePress = async (course) => {
    try {
      const courseData = await handleCoursePress(course);
      if (courseData) {
        navigation.navigate("CourseDetail", {
          course: courseData,
        });
      }
    } catch (error) {
      console.error("Error navigating to course:", error);
    }
  };
  const renderCourseItem = ({ item }) => (
    <TouchableOpacity
      onPress={() => onCoursePress(item)}
      style={styles.courseItemContainer}
    >
      <CourseProgItem item={item} />
    </TouchableOpacity>
  );

  if (inProgressCourses.length === 0) {
    return (
      <View style={styles.emptyContainer}>
        <Ionicons name="book" size={80} color={Color.PRIMARTY_COLOR} />
        <Text style={styles.emptyText}>No courses in progress</Text>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <LinearGradient
        colors={[Color.PRIMARTY_COLOR, '#7c4dff']}
        style={styles.header}
      >
        <View style={styles.titleContainer}>
          <Ionicons name="book" size={32} color="white" style={styles.icon} />
          <Text style={styles.title}>My Learning Journey</Text>
        </View>
        <Text style={styles.subtitle}>
          {inProgressCourses.length} Courses in Progress
        </Text>
      </LinearGradient>

      <View style={styles.listContainer}>
        <FlatList
          data={inProgressCourses}
          renderItem={renderCourseItem}
          keyExtractor={(item) => item.id}
          showsVerticalScrollIndicator={false}
          contentContainerStyle={styles.listContent}
        />
      </View>
    </View>
  );
};

export default MyCourse;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f5f5f5',
  },
  header: {
    height: 180,
    borderBottomLeftRadius: 30,
    borderBottomRightRadius: 30,
    paddingTop: 20,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.2,
    shadowRadius: 8,
    elevation: 7,
  },
  titleContainer: {
    flexDirection: "row",
    alignItems: "center",
    paddingHorizontal: 25,
    marginBottom: 10,
  },
  icon: {
    marginRight: 15,
  },
  title: {
    fontSize: 28,
    fontFamily: 'Poppins-Bold',
    color: "#FFFFFF",
    letterSpacing: 0.5,
  },
  subtitle: {
    fontSize: 16,
    fontFamily: 'Poppins-Regular',
    color: "rgba(255,255,255,0.9)",
    paddingHorizontal: 25,
  },
  listContainer: {
    flex: 1,
    marginTop: -30,
    paddingHorizontal: 20,
  },
  listContent: {
    paddingBottom: 20,
  },
  courseItemContainer: {
    backgroundColor: '#ffffff',
    borderRadius: 15,
    marginBottom: 15,
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
    transform: [{ scale: 0.98 }],
  },
  emptyContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#f5f5f5',
  },
  emptyText: {
    marginTop: 20,
    fontSize: 18,
    fontFamily: 'Poppins-Medium',
    color: '#666',
  },
});
