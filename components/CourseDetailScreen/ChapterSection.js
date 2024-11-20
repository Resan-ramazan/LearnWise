import {
  StyleSheet,
  Text,
  ToastAndroid,
  TouchableOpacity,
  View,
} from "react-native";
import React, { useEffect } from "react";
import Ionicons from "@expo/vector-icons/Ionicons";
import Color from "../../utils/Color";
import { useNavigation } from "@react-navigation/native";

const ChapterSection = ({
  chapterList,
  userEnrolledCourses,
  courseId,
  userEmail,
}) => {
  const navigation = useNavigation();

  const onChapterPress = (content) => {
    return () => {
      if (userEnrolledCourses.length == 0) {
        ToastAndroid.show(
          "Please enroll in the course to view chapters",
          ToastAndroid.SHORT
        );
      } else {
        const enrolledCourse = userEnrolledCourses[0];

        if (!enrolledCourse?.courseId || !enrolledCourse?.userEmail) {
          ToastAndroid.show(
            "Error: Missing course enrollment data",
            ToastAndroid.SHORT
          );
          return;
        }

        navigation.navigate("ChapterContent", {
          content: content,
          chaptersLength: chapterList,
          courseId: enrolledCourse.courseId,
          userEmail: enrolledCourse.userEmail,
        });
      }
    };
  };

  useEffect(() => {    
    console.log("userEnrolledCourses", userEnrolledCourses[0]?.completedChapters);
  }, [userEnrolledCourses]);

  const checkIsChapterCompleted = (chapter) => {
    return userEnrolledCourses[0]?.completedChapters.includes(chapter.id);
  };

  return (
    chapterList && (
      <View
        style={{
          marginTop: 20,
          padding: 10,
          borderRadius: 10,
          backgroundColor: Color.TEXT_WHITE,

          borderRadius: 15,
        }}
      >
        <Text
          style={{
            fontSize: 22,
            fontFamily: "Poppins-Regular",
          }}
        >
          Chapters
        </Text>
        {chapterList.map((item, index) => (
          <TouchableOpacity
            onPress={onChapterPress(item)}
            key={index}
            style={
              checkIsChapterCompleted(item)
                ? styles.completeChapter
                : styles.inCompleteChapter
            }
          >
            <View
              style={{
                display: "flex",
                flexDirection: "row",
                alignItems: "center",
                gap: 10,
                padding: 15,
              }}
            >
              <Text
                style={{
                  fontSize: 25,
                  fontFamily: "Poppins-Medium",
                  color: checkIsChapterCompleted(item)
                    ? Color.GREEN
                    : Color.TEXT_GRAY,
                }}
              >
                {index + 1}
              </Text>
              <Text
                style={{
                  fontSize: 21,
                  marginLeft: 10,
                  fontFamily: "Poppins-Regular",
                  color: checkIsChapterCompleted(item)
                    ? Color.GREEN
                    : Color.TEXT_GRAY,
                }}
              >
                {item.heading}
              </Text>
            </View>
            {userEnrolledCourses.length == 0 ? (
              <Ionicons name="lock-closed" size={25} color={Color.TEXT_GRAY} />
            ) : (
              <Ionicons
                name={
                  checkIsChapterCompleted(item) ? "checkmark-circle" : "play"
                }
                size={25}
                color={
                  checkIsChapterCompleted(item) ? Color.GREEN : Color.TEXT_GRAY
                }
              />
            )}
          </TouchableOpacity>
        ))}
      </View>
    )
  );
};

export default ChapterSection;

const styles = StyleSheet.create({
  inCompleteChapter: {
    display: "flex",

    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    padding: 15,
    borderWidth: 1,
    borderRadius: 10,
    marginTop: 10,
    borderBottomColor: Color.BORDER_COLOR,
    borderBlockColor: Color.TEXT_DARK,
  },
  completeChapter: {
    display: "flex",
    flexDirection: "row",
    backgroundColor: Color.LIGHT_GREEN,
    alignItems: "center",
    justifyContent: "space-between",
    padding: 15,
    borderWidth: 1,
    borderRadius: 10,
    marginTop: 10,
    borderColor: Color.GREEN,
  },
});
