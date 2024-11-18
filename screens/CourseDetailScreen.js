import {
  ScrollView,
  StyleSheet,
  Text,
  ToastAndroid,
  TouchableOpacity,
  View,
} from "react-native";
import React, { useEffect, useState } from "react";
import Ionicons from "@expo/vector-icons/Ionicons";
import { useNavigation, useRoute } from "@react-navigation/native";
import DetailSection from "../components/CourseDetailScreen/DetailSection";
import ChapterSection from "../components/CourseDetailScreen/ChapterSection";
import { enrollcourse } from "../services/courses";
import { useUser } from "@clerk/clerk-expo";
import { collection, query, where, getDocs } from "firebase/firestore";
import { db } from "../services/firebaseConfig";

const CourseDetailScreen = () => {
  const navigation = useNavigation();
  const params = useRoute().params;
  const { user } = useUser();
  const [userEnrolledCourses, setUserEnrolledCourses] = useState([]);

  useEffect(() => {
    const checkEnrollment = async () => {
      if (params.course && user) {
        try {
          const userCourseRef = collection(db, "UserEnrolledCourse");
          const q = query(
            userCourseRef,
            where("courseId", "==", params.course.id),
            where("userEmail", "==", user.primaryEmailAddress.emailAddress)
          );

          const querySnapshot = await getDocs(q);
          const courses = [];
          querySnapshot.forEach((doc) => {
            courses.push(doc.data());
          });
          setUserEnrolledCourses(courses);
        } catch (error) {
          console.error("Error checking course enrollment:", error);
        }
      }
    };
    checkEnrollment();
  }, [params.course, user]);

  const UserEnrollCourse = async () => {
    try {
      await enrollcourse(params.course.id, user.primaryEmailAddress);
      ToastAndroid.show("Course enrolled successfully", ToastAndroid.SHORT);
      setUserEnrolledCourses([
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
        />
      </ScrollView>
    )
  );
};

export default CourseDetailScreen;

const styles = StyleSheet.create({});
