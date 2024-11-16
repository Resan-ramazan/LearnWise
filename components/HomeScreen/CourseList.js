import { FlatList, Image, StyleSheet, Text, View } from "react-native";
import React, { useEffect, useState } from "react";
import { getCourseList, getCoursesByLevel } from "../../services/courses";
import SubHeading from "../SubHeading";
import Color from "../../utils/Color";
import CourseItem from "./CourseItem";

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

  return (
    <View>
      <SubHeading
        text={level.toUpperCase() + " Courses ⛳️"}
        color={level == "basic" && Color.TEXT_WHITE}
      />
      <FlatList
        data={courseList}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => <CourseItem item={item} />}
        horizontal={true}
        showsHorizontalScrollIndicator={false}
      />
    </View>
  );
};

export default CourseList;

const styles = StyleSheet.create({});
