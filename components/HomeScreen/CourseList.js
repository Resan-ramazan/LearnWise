import { FlatList, Image, StyleSheet, Text, View } from "react-native";
import { collection, getDocs, query, where } from "firebase/firestore";
import { db } from "../../services/firebaseConfig";
import React, { useEffect, useState } from "react";
import { getCourseList, getCoursesByLevel } from "../../services/courses";
import SubHeading from "../SubHeading";
import Color from "../../utils/Color";
import { Ionicons } from "@expo/vector-icons";

const CourseList = ({ level }) => {
  const [courseList, setCourseList] = useState([]);

  useEffect(() => {
    getCourses();
  }, []);

  const getCourses = async () => {
    getCoursesByLevel(level).then((resp) => {
      setCourseList(resp);
    });
  };

  const renderItem = ({ item }) => {
    return (
      <View
        style={{
          padding: 10,
          backgroundColor: Color.TEXT_WHITE,
          marginRight: 15,
          borderRadius: 12,
        }}
      >
        <Image
          source={{ uri: item?.banner }}
          style={{ width: 210, height: 120, borderRadius: 12 }}
        />
        <View style={{ padding: 7 }}>
          <Text style={{ fontFamily: "Poppins-Medium", fontSize: 17 }}>
            {item.name}
          </Text>
          <View
            style={{
              display: "flex",
              flexDirection: "row",
              alignItems: "center",
              justifyContent: "space-between",
              marginTop: 5,
            }}
          >
            <View
              style={{
                display: "flex",
                flexDirection: "row",
                alignItems: "center",
                gap: 5,
                marginTop: 5,
              }}
            >
              <Text style={{ fontFamily: "Poppins-Regular" }}>Chapters</Text>
              <Ionicons name="book" size={18} color={Color.ORANGE} />
            </View>
            <View>
              <View
                style={{
                  display: "flex",
                  flexDirection: "row",
                  alignItems: "center",
                  gap: 5,
                  marginTop: 5,
                }}
              >
                <Text style={{ fontFamily: "Poppins-Regular" }}>
                  {item.time}
                </Text>
                <Ionicons name="time" size={18} color={Color.ORANGE} />
              </View>
            </View>
          </View>
          <Text
            style={{
              marginTop: 5,
              color: Color.PRIMARTY_COLOR,
              fontFamily: "Poppins-Medium",
            }}
          >
            Free
          </Text>
        </View>
      </View>
    );
  };

  return (
    <View>
      <SubHeading
        text={level.toUpperCase() + " Courses ⛳️"}
        color={level == "basic" && Color.TEXT_WHITE}
      />
      <FlatList
        data={courseList}
        keyExtractor={(item) => item.id}
        renderItem={renderItem}
        horizontal={true}
        showsHorizontalScrollIndicator={false}
      />
    </View>
  );
};

export default CourseList;

const styles = StyleSheet.create({});
