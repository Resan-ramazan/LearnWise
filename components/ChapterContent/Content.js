import { Dimensions, FlatList, StyleSheet, Text, View } from "react-native";
import React, { useState } from "react";
import ProgressBar from "./ProgressBar";
import ContenItem from "./ContenItem";
import { TouchableOpacity } from "react-native-gesture-handler";
import { useNavigation } from "@react-navigation/native";

const Content = ({ chaptersLength, content }) => {
  let flatListRef;
  const navigation = useNavigation();
  const [activeIndex, setActiveIndex] = useState(0);

  const onNextBtnPress = (index) => {
    if (index < chaptersLength.length - 1) {
      setActiveIndex(index + 1);
      flatListRef.scrollToIndex({ index: index + 1, animted: true });
    } else {
      navigation.goBack();
    }
  };

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
        <ContenItem description={item.description} output={item.output} />
        <TouchableOpacity
          style={{ marginTop: 10 }}
          onPress={() => {
            onNextBtnPress(index);
          }}
        >
          <Text
            style={{
              backgroundColor: "#FFA500",
              padding: 15,
              fontSize: 17,
              borderRadius: 10,
              fontFamily: "Poppins-Regular",
              color: "#fff",
              marginVertical: 10,
              textAlign: "center",
            }}
          >
            {index === chaptersLength.length - 1 ? "Finish" : "Next"}
          </Text>
        </TouchableOpacity>
      </View>
    );
  };

  return (
    <View style={{ padding: 0, height: "100%" }}>
      <ProgressBar chaptersLength={chaptersLength.length} contentIndex={activeIndex} />
      <FlatList
        data={chaptersLength}
        horizontal={true}
        pagingEnabled={true}
        showsHorizontalScrollIndicator={false}
        renderItem={renderContentItem}
        ref={(ref) => {
          flatListRef = ref;
        }}
        keyExtractor={(item) => item.id}
      />
    </View>
  );
};

export default Content;

const styles = StyleSheet.create({});
