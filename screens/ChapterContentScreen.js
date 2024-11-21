import { StyleSheet, Text, View, ToastAndroid } from "react-native";
import React, { useEffect, useState } from "react";
import Content from "../components/ChapterContent/Content";
import { useRoute, useNavigation } from "@react-navigation/native";
import { updateUserEnrolledCourse } from "../services/courses";

const ChapterContentScreen = () => {
  const param = useRoute().params;
  const navigation = useNavigation();

  // Debug için paramları kontrol edelim
  useEffect(() => {
    console.log("ChapterContent Params:", {
      courseId: param?.courseId,
      userEmail: param?.userEmail,
      contentId: param?.content?.id
    });
  }, [param]);

  const onChapterComplete = () => {
    if (!param?.courseId || !param?.userEmail || !param?.content?.id) {
      console.log("Missing required params:", {
        courseId: param?.courseId,
        userEmail: param?.userEmail,
        contentId: param?.content?.id
      });
      return;
    }

    const allChapterIds = param.chaptersLength.map(chapter => chapter.id);

    updateUserEnrolledCourse(
      param.courseId, 
      param.userEmail, 
      param.content.id,
      allChapterIds
    )
      .then(() => {
        ToastAndroid.show("Course completed", ToastAndroid.SHORT);
        navigation.goBack();
      })
      .catch((err) => {
        console.error("Error completing chapter:", err);
      });
  };

  return (
    param.content && (
      <View>
        <Content
          chaptersLength={param.chaptersLength}
          content={param.content}
          onChapterComplete={() => onChapterComplete()}
          initialIndex={param.startIndex}
          courseId={param.courseId}
          userEmail={param.userEmail}
        />
      </View>
    )
  );
};

export default ChapterContentScreen;

const styles = StyleSheet.create({});
