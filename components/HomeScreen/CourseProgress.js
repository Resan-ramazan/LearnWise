import {
  StyleSheet,
  Text,
  View,
  FlatList,
  TouchableOpacity,
} from "react-native";
import React, { useState, useCallback } from "react";
import SubHeading from "../SubHeading";
import Color from "../../utils/Color";
import { useUser } from "@clerk/clerk-expo";
import { useNavigation, useFocusEffect } from "@react-navigation/native";
import * as Progress from "react-native-progress";
import { useCourse } from "../../contexts/CourseContext";
import { Ionicons } from "@expo/vector-icons";
import { Image } from "react-native";

const CourseProgress = () => {
  const { user } = useUser();
  const navigation = useNavigation();
  const { inProgressCourses, getInProgressCourses, handleCoursePress } = useCourse();

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
    <TouchableOpacity onPress={() => onCoursePress(item)}>
      <View style={styles.courseContainer}>
        <Image source={{ uri: item?.banner }} style={styles.courseImage} />
        <View style={{ padding: 7 }}>
          <Text style={styles.courseName}>{item.name}</Text>
          <View style={styles.detailContaier}>
            <View style={styles.chapterBox}>
              <Ionicons name="book" size={18} color={Color.ORANGE} />
              <Text style={styles.text}>
                {item.completedChapters} / {item.totalChapters} Chapters
              </Text>
            </View>
            <View style={styles.timeBox}>
              <Ionicons name="time-outline" size={18} color={Color.ORANGE} />
              <Text style={styles.text}>{item.time}</Text>
            </View>
          </View>
          <Progress.Bar
            progress={item.progressPercentage / 100}
            width={null}
            height={3}
            color={Color.ORANGE}
            unfilledColor="#E0E0E0"
            borderWidth={0}
            style={styles.progressBar}
          />
        </View>
      </View>
    </TouchableOpacity>
  );

  if (inProgressCourses.length === 0) return null;

  return (
    <View style={styles.container}>
      <SubHeading text="IN PROGRESS 🎯" color={Color.TEXT_WHITE} />
      <FlatList
        data={inProgressCourses}
        renderItem={renderCourseItem}
        keyExtractor={(item) => item.id}
        horizontal={true}
        showsHorizontalScrollIndicator={false}
      />
    </View>
  );
};

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

export default CourseProgress;
