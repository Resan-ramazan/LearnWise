import { StyleSheet, Text, View, ToastAndroid } from "react-native";
import React, { useEffect, useState } from "react";
import Content from "../components/ChapterContent/Content";
import { useRoute, useNavigation } from "@react-navigation/native";
import { updateUserEnrolledCourse } from "../services/courses";
import { useCourse } from "../contexts/CourseContext";
import { ScrollView } from "react-native-gesture-handler";
import { useUser } from "../contexts/UserContext";

const ChapterContentScreen = () => {
  const param = useRoute().params;
  const navigation = useNavigation();
  const { currentCourse, refreshCourseData } = useCourse();
  const { updateUserPoints, refreshUserData, userData } = useUser();

  // Debug için paramları kontrol edelim
  useEffect(() => {
    console.log("ChapterContent Params:", {
      courseId: param?.courseId,
      userEmail: param?.userEmail,
      contentId: param?.content?.id,
    });
  }, [param]);

  const onChapterComplete = async () => {
    if (!param?.courseId || !param?.userEmail || !param?.content?.id) {
      return;
    }

    const allChapterIds = currentCourse.chapters.map((chapter) => chapter.id);

    try {
      // Kullanıcının bu kursu daha önce tamamlayıp tamamlamadığını kontrol et
      const userCompletedCourses = userData?.completedCourses || [];
      const hasCompletedBefore = userCompletedCourses.includes(param.courseId);

      // Sadece ilk kez tamamlıyorsa puan ver
      if (!hasCompletedBefore) {
        await updateUserPoints(50);
        ToastAndroid.show("Chapter completed! +50 points", ToastAndroid.SHORT);
      } else {
        ToastAndroid.show("Chapter completed!", ToastAndroid.SHORT);
      }

      // Kurs ilerlemesini güncelle
      const updatedUserData = await updateUserEnrolledCourse(
        param.courseId,
        param.userEmail,
        param.content.id,
        allChapterIds,
        currentCourse.chapters.length
      );

      // UserContext'i güncelle
      await refreshUserData();

      if (allChapterIds.length === currentCourse.chapters.length) {
        ToastAndroid.show("Course completed!", ToastAndroid.SHORT);
      }
      if (hasCompletedBefore) {
        navigation.navigate("Home");
      } else {
        navigation.navigate("ScoreScreen", {
          points: hasCompletedBefore ? 0 : 50,
          courseId: param.courseId,
          userEmail: param.userEmail,
        });
      }
    } catch (err) {
      console.error("Error completing chapter:", err);
      ToastAndroid.show("Error completing chapter", ToastAndroid.SHORT);
    }
  };

  return (
    param.content && (
      <View style={[styles.container, { paddingBottom: 0 }]}>
        <Content
          chaptersLength={param.chaptersLength}
          content={param.content}
          onChapterComplete={onChapterComplete}
          initialIndex={param.startIndex}
          courseId={param.courseId}
          userEmail={param.userEmail}
        />
      </View>
    )
  );
};

export default ChapterContentScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
  },
});
