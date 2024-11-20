import { Dimensions, FlatList, StyleSheet, Text, View } from "react-native";
import React from "react";
import ProgressBar from "./ProgressBar";
import ContenItem from "./ContenItem";

const Content = ({ chaptersLength, content }) => {
  const renderContentItem = ({ item, index }) => {
    return (
      <View
        style={{
          width: Dimensions.get("screen").width,
          padding: 20,
        }}
      >
        <Text
          style={{
            fontFamily: "Poppins-Medium",
            fontSize: 22,
            marginTop: 15,
          }}
        >
          {item.heading}
        </Text>
        <ContenItem description={item.description} />
      </View>
    );
  };

  return (
    <View style={{ padding: 0 }}>
      <ProgressBar chaptersLength={chaptersLength.length} contentIndex={1} />
      <FlatList
        data={chaptersLength}
        horizontal={true}
        pagingEnabled={true}
        showsHorizontalScrollIndicator={false}
        renderItem={renderContentItem}
      />
    </View>
  );
};

export default Content;

const styles = StyleSheet.create({});
