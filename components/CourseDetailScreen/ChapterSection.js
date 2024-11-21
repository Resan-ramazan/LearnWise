import {
  StyleSheet,
  Text,
  ToastAndroid,
  TouchableOpacity,
  View,
  ScrollView,
  Animated,
} from "react-native";
import React, { useEffect, useRef } from "react";
import Ionicons from "@expo/vector-icons/Ionicons";
import Color from "../../utils/Color";
import { useNavigation } from "@react-navigation/native";
import { useCourse } from '../../contexts/CourseContext';

const ChapterSection = () => {
  const navigation = useNavigation();
  const { userEnrolledCourses, currentCourse } = useCourse();
  const fadeAnim = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    Animated.timing(fadeAnim, {
      toValue: 1,
      duration: 1000,
      useNativeDriver: true,
    }).start();
  }, []);

  const onChapterPress = (content, index) => {
    return () => {
      if (userEnrolledCourses.length == 0) {
        ToastAndroid.show(
          "Please enroll in the course to view chapters",
          ToastAndroid.SHORT
        );
      } else {
        const enrolledCourse = userEnrolledCourses[0];

        navigation.navigate("ChapterContent", {
          content: content,
          chaptersLength: currentCourse.chapters,
          courseId: enrolledCourse.courseId,
          userEmail: enrolledCourse.userEmail,
          startIndex: index,
        });
      }
    };
  };

  const checkIsChapterCompleted = (chapter) => {
    if (!userEnrolledCourses || userEnrolledCourses.length === 0) return false;
    
    const enrolledCourse = userEnrolledCourses[0];
    return enrolledCourse?.completedChapters?.includes(chapter.id);
  };

  return (
    currentCourse && currentCourse.chapters && (
      <View style={styles.container}>
        <Text style={styles.title}>Chapters</Text>
        <ScrollView style={styles.chapterList}>
          {currentCourse.chapters.map((item, index) => (
            <TouchableOpacity
              onPress={onChapterPress(item, index)}
              key={index}
              style={[
                styles.chapterItem,
                checkIsChapterCompleted(item)
                  ? styles.completeChapter
                  : styles.inCompleteChapter,
              ]}
            >
              <View style={styles.chapterContent}>
                <Text
                  style={[
                    styles.chapterNumber,
                    checkIsChapterCompleted(item) && styles.completedText,
                  ]}
                >
                  {index + 1}
                </Text>
                <Text
                  style={[
                    styles.chapterTitle,
                    checkIsChapterCompleted(item) && styles.completedText,
                  ]}
                >
                  {item.heading}
                </Text>
              </View>
              {userEnrolledCourses.length == 0 ? (
                <Ionicons name="lock-closed" size={25} color={Color.TEXT_GRAY} />
              ) : (
                <Ionicons
                  name={
                    checkIsChapterCompleted(item) ? "checkmark-circle" : "play-circle"
                  }
                  size={28}
                  color={
                    checkIsChapterCompleted(item) ? Color.GREEN : Color.PRIMARY
                  }
                />
              )}
            </TouchableOpacity>
          ))}
        </ScrollView>
      </View>
    )
  );
};

export default ChapterSection;

const styles = StyleSheet.create({
  container: {
    marginTop: 20,
    padding: 15,
    borderRadius: 20,
    backgroundColor: Color.TEXT_WHITE,
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.1,
    shadowRadius: 3,
    elevation: 5,
  },
  title: {
    fontSize: 24,
    fontFamily: "Poppins-SemiBold",
    color: Color.TEXT_DARK,
    marginBottom: 15,
  },
  chapterList: {
    maxHeight: 400,
  },
  chapterItem: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    padding: 15,
    borderRadius: 12,
    marginBottom: 12,
  },
  chapterContent: {
    flexDirection: "row",
    alignItems: "center",
    flex: 1,
  },
  chapterNumber: {
    fontSize: 22,
    fontFamily: "Poppins-Medium",
    color: Color.TEXT_GRAY,
    marginRight: 15,
  },
  chapterTitle: {
    fontSize: 18,
    fontFamily: "Poppins-Regular",
    color: Color.TEXT_DARK,
    flex: 1,
  },
  inCompleteChapter: {
    backgroundColor: "#fff",
    borderLeftWidth: 4,
    borderLeftColor: Color.PRIMARY,
  },
  completeChapter: {
    backgroundColor: Color.LIGHT_GREEN,
    borderLeftWidth: 4,
    borderLeftColor: Color.GREEN,
  },
  completedText: {
    color: Color.GREEN,
  },
});
