import { StyleSheet, Text, View } from "react-native";
import React from "react";
import ProgressBar from "./ProgressBar";

const Content = ({ chaptersLength, content }) => {
  return (
    <View style={{ padding: 20 }}>
      <ProgressBar chaptersLength={chaptersLength.length} contentIndex={1} />
      <Text>Content</Text>
    </View>
  );
};

export default Content;

const styles = StyleSheet.create({});
