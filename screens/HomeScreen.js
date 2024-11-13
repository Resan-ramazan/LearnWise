import { StyleSheet, Text, View } from "react-native";
import React from "react";
import Header from "../components/HomeScreen/Header";
import Color from "../utils/Color";
import CourseList from "../components/HomeScreen/CourseList";

const HomeScreen = () => {
  return (
    <View>
      <View style={styles.header}>
        <Header />
      </View>
      <View style={{ padding: 20 }}>
        <View style={{ marginTop: -90 }}>
          <CourseList level={"basic"} />
        </View>
        <CourseList level={"advance"} />
      </View>
    </View>
  );
};

export default HomeScreen;

const styles = StyleSheet.create({
  header: {
    backgroundColor: Color.PRIMARTY_COLOR,
    borderBottomColor: "#f2f2f2",
    borderBottomWidth: 1,
    padding: 20,
    height: 250,
  },
});
