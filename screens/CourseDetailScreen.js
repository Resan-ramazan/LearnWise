import {
  ScrollView,
  StyleSheet,
  Text,
  ToastAndroid,
  TouchableOpacity,
  View,
} from "react-native";
import React, { useCallback, useEffect, useState } from "react";
import Ionicons from "@expo/vector-icons/Ionicons";
import { useNavigation, useRoute } from "@react-navigation/native";
import DetailSection from "../components/CourseDetailScreen/DetailSection";
import ChapterSection from "../components/CourseDetailScreen/ChapterSection";
import { enrollcourse, checkCourseEnrollment } from "../services/courses";
import { useUser } from "@clerk/clerk-expo";
import { collection, query, where, getDocs } from "firebase/firestore";
import { db } from "../services/firebaseConfig";
import { useFocusEffect } from "@react-navigation/native";
import { useCourse } from "../contexts/CourseContext";

const CourseDetailScreen = () => {
  const navigation = useNavigation();
  const params = useRoute().params;
  const { user } = useUser();
  const { userEnrolledCourses, updateEnrolledCourses, updateCurrentCourse } =
    useCourse();

  /*
  useFocusEffect, React Navigation'da ekran her odaklandığında (yani ekrana her dönüldüğünde) çalışmasını istediğimiz kodlar için kullanılır
  */
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
      await enrollcourse(params.course.id, user.primaryEmailAddress);
      ToastAndroid.show("Course enrolled successfully", ToastAndroid.SHORT);
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
      throw error;
    }
  };

  console.log("Course Detail params:", {
    courseId: params?.course?.id,
    userEmail: user?.primaryEmailAddress?.emailAddress,
  });

  return (
    params.course && (
      <ScrollView style={{ padding: 10 }}>
        <TouchableOpacity onPress={() => navigation.goBack()}>
          <Ionicons name="arrow-back-circle-sharp" size={40} color="black" />
        </TouchableOpacity>
        <DetailSection
          enrollCourse={() => UserEnrollCourse()}
          course={params.course}
          userEnrolledCourses={userEnrolledCourses}
        />
        <ChapterSection
          userEnrolledCourses={userEnrolledCourses}
          chapterList={params.course.chapters}
          courseId={params.course?.id || ""}
          userEmail={user?.primaryEmailAddress?.emailAddress || ""}
        />
      </ScrollView>
    )
  );
};

export default CourseDetailScreen;

const styles = StyleSheet.create({});
