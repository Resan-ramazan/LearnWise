import { StyleSheet, Text, View } from "react-native";
import React from "react";
import ProgressBar from "./ProgressBar";

const Content = ({ chaptersLength, content }) => {
  console.log("Content:", content);
  console.log("Chapters Length:", chaptersLength);
  return (
    <View>
      <ProgressBar chaptersLength={chaptersLength.length} contentIndex={1} />
      <Text>Content</Text>
    </View>
  );
};

export default Content;

const styles = StyleSheet.create({});
