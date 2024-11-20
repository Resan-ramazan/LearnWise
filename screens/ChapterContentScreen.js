import { StyleSheet, Text, View, ToastAndroid } from "react-native";
import React from "react";
import Content from "../components/ChapterContent/Content";
import { useRoute, useNavigation } from "@react-navigation/native";
import { updateUserEnrolledCourse } from "../services/courses";

const ChapterContentScreen = () => {
  const param = useRoute().params;
  const navigation = useNavigation();

  const onChapterComplete = () => {
    if (!param?.courseId || !param?.userEmail || !param?.content?.id) {
      return;
    }

    updateUserEnrolledCourse(param.courseId, param.userEmail, param.content.id)
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
        />
      </View>
    )
  );
};

export default ChapterContentScreen;

const styles = StyleSheet.create({});
