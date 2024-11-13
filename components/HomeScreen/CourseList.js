import { StyleSheet, Text, View } from "react-native";
import { collection, getDocs, query, where } from "firebase/firestore";
import { db } from "../../services/firebaseConfig";
import React, { useEffect } from "react";
import { getCourseList } from "../../services/courses";

const CourseList = () => {
  useEffect(() => {
    getCourses();
  }, []);

  const getCourses = async () => {
    getCourseList().then((resp) => {
      console.log(resp);
    });
  };

  return (
    <View>
      <Text>CourseList</Text>
    </View>
  );
};

export default CourseList;

const styles = StyleSheet.create({});
