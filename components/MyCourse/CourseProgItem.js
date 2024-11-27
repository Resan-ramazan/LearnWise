import { StyleSheet, Text, View } from "react-native";
import React from "react";
import { Image } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import Color from "../../utils/Color";
import * as Progress from "react-native-progress";

const CourseProgItem = ({ item }) => {
  return (
    <View style={styles.courseContainer}>
      <Image source={{ uri: item?.banner }} style={styles.courseImage} />
      <View style={{ padding: 7 }}>
        <Text style={styles.courseName}>{item.name}</Text>
        <View style={styles.detailContaier}>
          <View style={styles.chapterBox}>
            <Ionicons name="book" size={18} color={Color.ORANGE} />
            <Text style={styles.text}>{item.totalChapters || 0} Chapters</Text>
          </View>
          <View>
            <View style={styles.timeBox}>
              <Ionicons name="time-outline" size={18} color={Color.ORANGE} />
              <Text style={styles.text}>{item.time}</Text>
            </View>
          </View>
        </View>
        <Text style={styles.freeText}>Free</Text>
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
    padding: 10,
    backgroundColor: Color.TEXT_WHITE,
    marginRight: 15,
    borderRadius: COURSE_CONSTANTS.BORDER_RADIUS,
    marginRight: COURSE_CONSTANTS.SPACING.LARGE,
    borderRadius: COURSE_CONSTANTS.BORDER_RADIUS,
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: COURSE_CONSTANTS.SHADOW_OPACITY,
    shadowRadius: 4,
    elevation: 3,
  },
  courseImage: {
    width: "100%",
    height: 170,
    borderRadius: COURSE_CONSTANTS.BORDER_RADIUS,
  },
  courseName: {
    fontFamily: "Poppins-Medium",
    fontSize: 17,
  },
  detailContaier: {
    display: "flex",
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    marginTop: 5,
  },
  chapterBox: {
    display: "flex",
    flexDirection: "row",
    alignItems: "center",
    gap: 5,
    marginTop: 5,
  },
  timeBox: {
    display: "flex",
    flexDirection: "row",
    alignItems: "center",
    gap: 5,
    marginTop: 5,
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
  },
});
