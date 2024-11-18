import { StyleSheet, Text, View } from "react-native";
import React from "react";
import Content from "../components/ChapterContent/Content";
import { useRoute } from "@react-navigation/native";

const ChapterContentScreen = () => {
  const param = useRoute().params;

  //console.log("Content:", param.content); // This should now show the full item with heading, description, etc.
  //console.log("Chapters Length:", param.chaptersLength);
  // console.log(chaptersLength, "chaptersLength");
  // console.log(content);

  return (
    param.content && (
      <View>
        <Content
          chaptersLength={param.chaptersLength}
          content={param.content}
        />
      </View>
    )
  );
};

export default ChapterContentScreen;

const styles = StyleSheet.create({});
