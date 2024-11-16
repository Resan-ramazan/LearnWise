import { Dimensions, Image, StyleSheet, Text, View } from "react-native";
import React from "react";
import Color from "../../utils/Color";

const DetailSection = ({ course }) => {
  return (
    <View
      style={{
        padding: 10,
        borderRadius: 15,
        backgroundColor: Color.TEXT_WHITE,
      }}
    >
      <Image
        source={{ uri: course?.banner }}
        style={{
          width: Dimensions.get("window").width * 0.86,
          height: 190,
          borderRadius: 15,
        }}
      />
      <Text
        style={{ fontSize: 24, fontFamily: "Poppins-Medium", marginTop: 10 }}
      >
        {course.name}
      </Text>
    </View>
  );
};

export default DetailSection;

const styles = StyleSheet.create({});
