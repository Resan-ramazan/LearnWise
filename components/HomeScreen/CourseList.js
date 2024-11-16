import { FlatList, Image, StyleSheet, Text, View } from "react-native";
import { collection, getDocs, query, where } from "firebase/firestore";
import { db } from "../../services/firebaseConfig";
import React, { useEffect, useState } from "react";
import { getCourseList, getCoursesByLevel } from "../../services/courses";
import SubHeading from "../SubHeading";
import Color from "../../utils/Color";
import { Ionicons } from "@expo/vector-icons";

const CourseList = ({ level }) => {
  const [courseList, setCourseList] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    getCourses();
  }, []);

  const getCourses = async () => {
    getCoursesByLevel(level).then((resp) => {
      setCourseList(resp);
    });
  };

  const renderItem = ({ item }) => {
    return (
      <View style={styles.courseContainer}>
        <Image source={{ uri: item?.banner }} style={styles.courseImage} />
        <View style={{ padding: 7 }}>
          <Text style={styles.courseName}>{item.name}</Text>
          <View style={styles.detailContaier}>
            <View style={styles.chapterBox}>
              <Ionicons name="book" size={18} color={Color.ORANGE} />
              <Text style={styles.text}>Chapters</Text>
            </View>
            <View>
              <View style={styles.timeBox}>
                <Ionicons name="time" size={18} color={Color.ORANGE} />
                <Text style={styles.text}>{item.time}</Text>
              </View>
            </View>
          </View>
          <Text style={styles.freeText}>Free</Text>
        </View>
      </View>
    );
  };

  return (
    <View>
      <SubHeading
        text={level.toUpperCase() + " Courses ⛳️"}
        color={level == "basic" && Color.TEXT_WHITE}
      />
      <FlatList
        data={courseList}
        keyExtractor={(item) => item.id}
        renderItem={renderItem}
        horizontal={true}
        showsHorizontalScrollIndicator={false}
      />
    </View>
  );
};

export default CourseList;

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
    width: COURSE_CONSTANTS.CARD_WIDTH,
    height: COURSE_CONSTANTS.IMAGE_HEIGHT,
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
});
