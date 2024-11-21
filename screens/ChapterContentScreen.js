import { StyleSheet, Text, View, ToastAndroid } from "react-native";
import React, { useEffect, useState } from "react";
import Content from "../components/ChapterContent/Content";
import { useRoute, useNavigation } from "@react-navigation/native";
import { updateUserEnrolledCourse } from "../services/courses";
import { useCourse } from '../contexts/CourseContext';
import { ScrollView } from "react-native-gesture-handler";
import { useUser } from '../contexts/UserContext';

const ChapterContentScreen = () => {
  const param = useRoute().params;
  const navigation = useNavigation();
  const { currentCourse, refreshCourseData } = useCourse();
  const { updateUserPoints } = useUser();

  

  // Debug için paramları kontrol edelim
  useEffect(() => {
    console.log("ChapterContent Params:", {
      courseId: param?.courseId,
      userEmail: param?.userEmail,
      contentId: param?.content?.id
    });
  }, [param]);

  const onChapterComplete = async () => {
    if (!param?.courseId || !param?.userEmail || !param?.content?.id) {
      return;
    }

    const allChapterIds = currentCourse.chapters.map(chapter => chapter.id);

    updateUserEnrolledCourse(
      param.courseId, 
      param.userEmail, 
      param.content.id,
      allChapterIds
    )
      .then(() => {
        ToastAndroid.show("Course completed", ToastAndroid.SHORT);
        refreshCourseData();
        updateUserPoints(50);
        ToastAndroid.show("Chapter completed! +50 points", ToastAndroid.SHORT);
        navigation.goBack();
      })
      .catch((err) => {
        console.error("Error completing chapter:", err);
      });
  };

  return (
    param.content && (
      <ScrollView>
        <Content
          chaptersLength={param.chaptersLength}
          content={param.content}
          onChapterComplete={onChapterComplete}
          initialIndex={param.startIndex}
          courseId={param.courseId}
          userEmail={param.userEmail}
        />
      </ScrollView>
    )
  );
};

export default ChapterContentScreen;

const styles = StyleSheet.create({});
