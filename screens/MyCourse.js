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
      style={{ margin: 8, padding: 5 }}
    >
      <CourseProgItem item={item} />
    </TouchableOpacity>
  );

  if (inProgressCourses.length === 0) return null;

  return (
    <View>
      <View style={styles.header}>
        <View style={styles.titleContainer}>
          <Ionicons name="book" size={32} color="white" style={styles.icon} />
          <Text style={styles.title}>My Courses</Text>
        </View>
      </View>
      <FlatList
        data={inProgressCourses}
        renderItem={renderCourseItem}
        keyExtractor={(item) => item.id}
        showsHorizontalScrollIndicator={false}
      />
    </View>
  );
};

export default MyCourse;
const COURSE_CONSTANTS = {
  CARD_WIDTH: 250,
  IMAGE_HEIGHT: 140,
  BORDER_RADIUS: 12,
  SPACING: {
    SMALL: 8,
    MEDIUM: 12,
    LARGE: 16,
  },
  SHADOW_OPACITY: 0.1,
};
const styles = StyleSheet.create({
  header: {
    height: 160,
    backgroundColor: Color.PRIMARTY_COLOR,
    justifyContent: "center",
    alignItems: "center",
    borderBottomLeftRadius: 20,
    borderBottomRightRadius: 20,
    marginBottom: 20,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
    marginLeft: 10,
    marginRight: 10,
  },
  titleContainer: {
    flexDirection: "row",
    alignItems: "center",
    paddingVertical: 16,
    paddingHorizontal: 20,
  },
  icon: {
    marginRight: 12,
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
    color: "#FFFFFF",
    letterSpacing: 0.5,
  },
  container: {
    marginVertical: 15,
    marginTop: -1,
  },
  courseContainer: {
    padding: 10,
    backgroundColor: Color.TEXT_WHITE,
    marginRight: COURSE_CONSTANTS.SPACING.LARGE,
    borderRadius: COURSE_CONSTANTS.BORDER_RADIUS,
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: COURSE_CONSTANTS.SHADOW_OPACITY,
    shadowRadius: 4,
    elevation: 3,
  },
  courseImage: {
    width: COURSE_CONSTANTS.CARD_WIDTH,
    height: COURSE_CONSTANTS.IMAGE_HEIGHT,
    borderRadius: COURSE_CONSTANTS.BORDER_RADIUS,
  },
  courseName: {
    fontFamily: "Poppins-Medium",
    fontSize: 17,
  },
  detailContaier: {
    display: "flex",
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    marginTop: 5,
  },
  chapterBox: {
    display: "flex",
    flexDirection: "row",
    alignItems: "center",
    gap: 5,
    marginTop: 5,
  },
  timeBox: {
    display: "flex",
    flexDirection: "row",
    alignItems: "center",
    gap: 5,
    marginTop: 5,
  },
  text: {
    fontFamily: "Poppins-Regular",
  },
  progressBar: {
    marginTop: 10,
  },
});
