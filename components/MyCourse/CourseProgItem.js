import { StyleSheet, Text, View } from "react-native";
import React from "react";
import { Image } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import Color from "../../utils/Color";
import * as Progress from "react-native-progress";
import { useTranslation } from "react-i18next";
import { Image as ExpoImage } from "expo-image";

const CourseProgItem = ({ item, isCompleted }) => {
  const { t } = useTranslation();

  return (
    <View style={styles.courseContainer}>
      <ExpoImage source={{ uri: item?.banner }} style={styles.courseImage} contentFit="cover" transition={200}  cachePolicy="memory-disk" />
      <View style={styles.contentWrapper}>
        <Text style={styles.courseName}>{item.name}</Text>
        <View style={styles.detailContaier}>
          <View style={styles.chapterBox}>
            <Ionicons name="book" size={18} color={Color.ORANGE} />
            <Text style={styles.text}>
              {item.totalChapters || 0} {t('Chapters')}
            </Text>
          </View>
          <View style={styles.timeBox}>
            <Ionicons name="time-outline" size={18} color={Color.ORANGE} />
            <Text style={styles.text}>{item.time}</Text>
          </View>
        </View>
        <Text style={styles.freeText}>{t('Free')}</Text>

        <Text style={styles.status}>
          {isCompleted
            ? t('Course Completed')
            : item.progress > 0
            ? t('Continue Learning')
            : t('Start Course')}
        </Text>
      </View>
      <Progress.Bar
        progress={item.progressPercentage / 100}
        width={null}
        height={3}
        color={Color.ORANGE}
        unfilledColor="#E0E0E0"
        borderWidth={0}
        style={styles.progressBar}
      />
    </View>
  );
};

export default CourseProgItem;

const COURSE_CONSTANTS = {
  CARD_WIDTH: 250,
  IMAGE_HEIGHT: 140,
  BORDER_RADIUS: 12,
  SPACING: {
    SMALL: 8,
    MEDIUM: 12,
    LARGE: 16,
  },
  SHADOW_OPACITY: 0.1,
};

const styles = StyleSheet.create({
  courseContainer: {
    width: "100%",
    backgroundColor: Color.TEXT_WHITE,
    borderRadius: COURSE_CONSTANTS.BORDER_RADIUS,
    overflow: "hidden",
  },
  courseImage: {
    width: "100%",
    height: 170,
    borderTopLeftRadius: COURSE_CONSTANTS.BORDER_RADIUS,
    borderTopRightRadius: COURSE_CONSTANTS.BORDER_RADIUS,
  },
  contentWrapper: {
    padding: 12,
  },
  courseName: {
    fontFamily: "Poppins-Medium",
    fontSize: 17,
  },
  detailContaier: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    marginTop: 5,
  },
  chapterBox: {
    flexDirection: "row",
    alignItems: "center",
    gap: 5,
  },
  timeBox: {
    flexDirection: "row",
    alignItems: "center",
    gap: 5,
  },
  text: {
    fontFamily: "Poppins-Regular",
  },
  freeText: {
    fontFamily: "Poppins-Regular",
    color: Color.PRIMARTY_COLOR,
    marginTop: 5,
  },
  progressBar: {
    marginTop: 10,
    marginHorizontal: 12,
    marginBottom: 12,
  },
  lessonCount: {
    fontFamily: "Poppins-Regular",
    color: Color.PRIMARTY_COLOR,
    marginTop: 5,
  },
  status: {
    fontFamily: "Poppins-Regular",
    color: Color.PRIMARTY_COLOR,
    marginTop: 5,
  },
});
