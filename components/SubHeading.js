import { StyleSheet, Text, View } from "react-native";
import React from "react";
import Color from "../utils/Color";

// Custom SubHeading component
const SubHeading = ({ text, color = Color.TEXT_BLACK }) => {
  return (
    <View>
      <Text
        style={{
          ...styles.headerText,
          color: color,
        }}
      >
        {text}
      </Text>
    </View>
  );
};

export default SubHeading;

const styles = StyleSheet.create({
  headerText: {
    fontSize: 24,
    fontFamily: "Poppins-Bold",
  },
});
