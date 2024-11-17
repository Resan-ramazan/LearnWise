import { StyleSheet, Text, View } from "react-native";
import React from "react";
import Ionicons from "@expo/vector-icons/Ionicons";
import Color from "../../utils/Color";

const ChapterSection = ({ chapterList }) => {
  return (
    chapterList && (
      <View
        style={{
          marginTop: 20,
          padding: 10,
          borderRadius: 10,
          backgroundColor: Color.TEXT_WHITE,
          borderRadius: 15,
        }}
      >
        <Text
          style={{
            fontSize: 22,
            fontFamily: "Poppins-Regular",
          }}
        >
          Chapters
        </Text>
        {chapterList.map((chapter, index) => (
          <View
            key={index}
            style={{
              display: "flex",
              flexDirection: "row",
              alignItems: "center",
              justifyContent: "space-between",
              padding: 15,
              borderWidth: 1,
              borderRadius: 10,
              marginTop: 10,
              borderBottomColor: "lightgray",
              borderBlockColor: Color.TEXT_DARK,
            }}
          >
            <View
              style={{
                display: "flex",
                flexDirection: "row",
                alignItems: "center",
                gap: 10,
                padding: 15,
              }}
            >
              <Text
                style={{
                  fontSize: 25,
                  fontFamily: "Poppins-Medium",
                  color: Color.TEXT_GRAY,
                }}
              >
                {index + 1}
              </Text>
              <Text
                style={{
                  fontSize: 21,
                  marginLeft: 10,
                  fontFamily: "Poppins-Regular",
                  color: Color.TEXT_GRAY,
                }}
              >
                {chapter.heading}
              </Text>
            </View>
            <Ionicons name="lock-closed" size={25} color={Color.TEXT_GRAY} />
          </View>
        ))}
      </View>
    )
  );
};

export default ChapterSection;

const styles = StyleSheet.create({});
