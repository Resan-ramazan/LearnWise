import {
  ActivityIndicator,
  FlatList,
  Image,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import React, { useEffect, useState } from "react";
import { getCourseList, getCoursesByLevel } from "../../services/courses";
import SubHeading from "../SubHeading";
import Color from "../../utils/Color";
import CourseItem from "./CourseItem";
import { useNavigation } from "@react-navigation/native";
import { useCourse } from "../../contexts/CourseContext";

const CourseList = ({ level }) => {
  const [courseList, setCourseList] = useState([]);
  const [loading, setLoading] = useState(true);
  const navigation = useNavigation();
  const { inProgressCourses } = useCourse();

  useEffect(() => {
    getCourses();
  }, []);

  const getCourses = async () => {
    try {
      const coursesWithChapters = await getCoursesByLevel(level);
      setCourseList(coursesWithChapters);
      setLoading(false);
    } catch (error) {
      console.error("Error:", error);
      setLoading(false);
    }
  };

  return (
    <View>
      <SubHeading
        text={level + " Courses"}
        color={
          level == "basic" && inProgressCourses.length === 0
            ? Color.TEXT_WHITE
            : Color.TEXT_BLACK
        }
      />
      <FlatList
        data={courseList}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <TouchableOpacity
            onPress={() =>
              navigation.navigate("CourseDetail", {
                course: item,
              })
            }
          >
            <CourseItem item={item} />
          </TouchableOpacity>
        )}
        horizontal={true}
        showsHorizontalScrollIndicator={false}
      />
    </View>
  );
};

export default CourseList;

const styles = StyleSheet.create({});
