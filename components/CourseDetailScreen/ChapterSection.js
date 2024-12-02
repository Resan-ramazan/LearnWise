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
      <Animated.View style={[styles.container, { opacity: fadeAnim }]}>
        <Text style={styles.title}>Course Content</Text>
        <ScrollView style={styles.chapterList}>
          {currentCourse.chapters.map((item, index) => (
            <TouchableOpacity
              onPress={onChapterPress(item, index)}
              key={index}
              style={[
                styles.chapterItem,
                checkIsChapterCompleted(item) && styles.completeChapter,
              ]}
            >
              <View style={styles.chapterContent}>
                <View style={[
                  styles.numberContainer,
                  checkIsChapterCompleted(item) && styles.completedNumberContainer
                ]}>
                  <Text style={[
                    styles.chapterNumber,
                    checkIsChapterCompleted(item) && styles.completedText
                  ]}>
                    {index + 1}
                  </Text>
                </View>
                <View style={styles.textContainer}>
                  <Text style={[
                    styles.chapterTitle,
                    checkIsChapterCompleted(item) && styles.completedText
                  ]}>
                    {item.heading}
                  </Text>
                </View>
              </View>
              {userEnrolledCourses.length == 0 ? (
                <View style={styles.iconContainer}>
                  <Ionicons name="lock-closed" size={22} color={Color.TEXT_GRAY} />
                </View>
              ) : (
                <View style={[
                  styles.iconContainer,
                  checkIsChapterCompleted(item) && styles.completedIcon
                ]}>
                  <Ionicons
                    name={checkIsChapterCompleted(item) ? "checkmark-circle" : "chevron-forward-circle"}
                    size={24}
                    color={checkIsChapterCompleted(item) ? "#4CAF50" : Color.PRIMARY}
                  />
                </View>
              )}
            </TouchableOpacity>
          ))}
        </ScrollView>
      </Animated.View>
    )
  );
};

export default ChapterSection;

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#fff',
    borderRadius: 15,
    padding: 20,
    marginBottom: 20,
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 4,
    },
    shadowOpacity: 0.1,
    shadowRadius: 8,
    elevation: 5,
  },
  title: {
    fontSize: 24,
    fontFamily: 'Poppins-Bold',
    color: '#2D3436',
    marginBottom: 20,
  },
  chapterList: {
    maxHeight: 400,
  },
  chapterItem: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    padding: 16,
    borderRadius: 12,
    marginBottom: 12,
    backgroundColor: '#fff',
    borderWidth: 1,
    borderColor: '#E8E8E8',
  },
  chapterContent: {
    flexDirection: 'row',
    alignItems: 'center',
    flex: 1,
  },
  numberContainer: {
    width: 36,
    height: 36,
    borderRadius: 18,
    backgroundColor: '#F5F5F5',
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 15,
  },
  completedNumberContainer: {
    backgroundColor: '#E8F5E9',
  },
  chapterNumber: {
    fontSize: 16,
    fontFamily: 'Poppins-SemiBold',
    color: '#666',
  },
  textContainer: {
    flex: 1,
  },
  chapterTitle: {
    fontSize: 16,
    fontFamily: 'Poppins-Medium',
    color: '#2D3436',
  },
  iconContainer: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: '#F5F5F5',
    justifyContent: 'center',
    alignItems: 'center',
  },
  completeChapter: {
    backgroundColor: '#F8FFF9',
    borderColor: '#4CAF50',
    borderWidth: 1,
  },
  completedText: {
    color: '#4CAF50',
  },
  completedIcon: {
    backgroundColor: '#E8F5E9',
  },
});
