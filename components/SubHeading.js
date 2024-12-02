import { StyleSheet, Text, View } from "react-native";
import React from "react";
import Color from "../utils/Color";

// Custom SubHeading component
const SubHeading = ({ text, color = Color.TEXT_BLACK }) => {
  const capitalizedText = text.charAt(0).toUpperCase() + text.slice(1);
  return (
    <View style={styles.container}>
      <Text
        style={[
          styles.headerText,
          { color },
          // Add shadow only for light backgrounds
          color === Color.TEXT_WHITE && styles.lightTextShadow,
        ]}
      >
        {capitalizedText}
      </Text>
    </View>
  );
};

export default SubHeading;

const styles = StyleSheet.create({
  container: {
    marginVertical: 16,
    paddingHorizontal: 8,
  },
  headerText: {
    fontSize: 24,
    fontFamily: "Poppins-Bold",
  },
  lightTextShadow: {
    textShadowColor: "rgba(0, 0, 0, 0.2)",
    textShadowOffset: { width: 0, height: 1 },
    textShadowRadius: 2,
  },
});
