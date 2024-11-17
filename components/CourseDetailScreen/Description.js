import { StyleSheet, Text, View } from "react-native";
import React from "react";
import Color from "../../utils/Color";

const Description = ({ course }) => {
  return (
    <View>
      <Text
        style={{
          fontSize: 20,
          fontFamily: "Poppins-Medium",
          marginTop: 10,
        }}
      >
        Description
      </Text>
      <Text
        style={{
          fontSize: 16,
          fontFamily: "Poppins-Regular",
          marginTop: 10,
          color: Color.TEXT_GRAY,
          lineHeight: 23,
        }}
      >
        {course.description}
      </Text>
    </View>
  );
};

export default Description;

const styles = StyleSheet.create({});
