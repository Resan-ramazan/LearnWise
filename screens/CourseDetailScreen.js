import {
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import React, { useEffect } from "react";
import Ionicons from "@expo/vector-icons/Ionicons";
import { useNavigation, useRoute } from "@react-navigation/native";
import DetailSection from "../components/CourseDetailScreen/DetailSection";
import ChapterSection from "../components/CourseDetailScreen/ChapterSection";
import { enrollcourse } from "../services/courses";
import { useUser } from "@clerk/clerk-expo";

const CourseDetailScreen = () => {
  const navigation = useNavigation();
  const params = useRoute().params;
  const { user } = useUser();

  useEffect(() => {
    console.log(params.course);
  }, [params.course]);

  const UserEnrollCourse = () => {
    try {
      enrollcourse(params.course.id, user.primaryEmailAddress);
      console.log(
        "Course enrolled successfully",
        params.course.id,
        user.primaryEmailAddress
      );
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
        />
        <ChapterSection chapterList={params.course.chapters} />
      </ScrollView>
    )
  );
};

export default CourseDetailScreen;

const styles = StyleSheet.create({});
