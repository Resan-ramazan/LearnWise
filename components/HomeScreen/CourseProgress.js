import { StyleSheet, Text, View } from "react-native";
import React from "react";
import SubHeading from "../SubHeading";
import Color from "../../utils/Color";
const CourseProgress = () => {
  return (
    <View>
      <SubHeading text="Course Progress" color={Color.TEXT_WHITE} />
    </View>
  );
};

export default CourseProgress;

const styles = StyleSheet.create({});
