import { StyleSheet, Text, View } from "react-native";
import React from "react";
import Color from "../../utils/Color";

const ProgressBar = ({ chaptersLength, contentIndex }) => {
  const arrSize = Array.from({ length: chaptersLength }, (_, i) => i + 1);
  const width = 100 / chaptersLength;

  return (
    <View
      style={{
        display: "flex",
        flexDirection: "row",
        justifyContent: "space-between",
        alignItems: "center",
      }}
    >
      {arrSize.map((item, index) => (
        <View
          key={index}
          style={{
            flex: 1,
            width: width + "%",
            height: 5,
            backgroundColor: Color.PRIMARTY_COLOR,
            borderRadius: 10,
            height: 10,
            margin: 5,
          }}
        ></View>
      ))}
    </View>
  );
};

export default ProgressBar;

const styles = StyleSheet.create({});
