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

const CourseList = ({ level }) => {
  const [courseList, setCourseList] = useState([]);
  const [loading, setLoading] = useState(true);

  const navigation = useNavigation();

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

  if (loading) {
    return <ActivityIndicator size="large" />;
  }

  return (
    <View>
      <SubHeading
        text={level.toUpperCase() + " Courses ⛳️"}
        color={level == "basic" && Color.TEXT_WHITE}
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
