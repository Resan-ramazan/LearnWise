import {
  ScrollView,
  StyleSheet,
  Text,
  ToastAndroid,
  TouchableOpacity,
  View,
} from "react-native";
import React, { useCallback, useEffect } from "react";
import Ionicons from "@expo/vector-icons/Ionicons";
import { useNavigation, useRoute } from "@react-navigation/native";
import DetailSection from "../components/CourseDetailScreen/DetailSection";
import ChapterSection from "../components/CourseDetailScreen/ChapterSection";
import { enrollcourse, checkCourseEnrollment } from "../services/courses";
import { useUser as useClerkUser } from "@clerk/clerk-expo";
import { useFocusEffect } from "@react-navigation/native";
import { useCourse } from "../contexts/CourseContext";
import { useUser } from "../contexts/UserContext";

const CourseDetailScreen = () => {
  const navigation = useNavigation();
  const params = useRoute().params;
  const { user } = useClerkUser();
  const { userEnrolledCourses, updateEnrolledCourses, updateCurrentCourse } = useCourse();
  const { refreshUserData } = useUser();

  useFocusEffect(
    useCallback(() => {
      const checkEnrollment = async () => {
        if (params.course && user) {
          try {
            const courses = await checkCourseEnrollment(
              params.course.id, 
              user.primaryEmailAddress.emailAddress
            );
            updateEnrolledCourses(courses);
            updateCurrentCourse(params.course);
          } catch (error) {
            console.error("Error checking course enrollment:", error);
          }
        }
      };
      checkEnrollment();
    }, [params.course, user])
  );

  const UserEnrollCourse = async () => {
    try {
      const result = await enrollcourse(params.course.id, user.primaryEmailAddress);
      ToastAndroid.show("Course enrolled successfully", ToastAndroid.SHORT);
      
      // UserContext'i güncelle
      await refreshUserData();
      
      // CourseContext'i güncelle
      updateEnrolledCourses([
        ...userEnrolledCourses,
        {
          courseId: params.course.id,
          userEmail: user.primaryEmailAddress.emailAddress,
          completedChapters: [],
          progress: 0,
        },
      ]);
    } catch (error) {
      console.error("Error enrolling course:", error);
      ToastAndroid.show("Error enrolling in course", ToastAndroid.SHORT);
    }
  };

  return (
    params.course && (
      <View style={styles.container}>
        <TouchableOpacity 
          style={styles.backButton} 
          onPress={() => navigation.goBack()}
        >
          <Ionicons name="arrow-back-circle" size={40} color="#fff" />
        </TouchableOpacity>
        
        <ScrollView showsVerticalScrollIndicator={false}>
          <DetailSection
            enrollCourse={() => UserEnrollCourse()}
            course={params.course}
            userEnrolledCourses={userEnrolledCourses}
          />
          <ChapterSection />
        </ScrollView>
      </View>
    )
  );
};

export default CourseDetailScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f5f5f5',
  },
  backButton: {
    position: 'absolute',
    top: 40,
    left: 20,
    zIndex: 1,
    backgroundColor: 'rgba(0,0,0,0.3)',
    borderRadius: 20,
  },
});
