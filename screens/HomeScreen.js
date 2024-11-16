import { ActivityIndicator, StyleSheet, Text, View } from "react-native";
import React from "react";
import Header from "../components/HomeScreen/Header";
import Color from "../utils/Color";
import CourseList from "../components/HomeScreen/CourseList";
import { useState } from "react";
import { useEffect } from "react";

const HomeScreen = () => {
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    setTimeout(() => {
      setLoading(false);
    }, 1000);
  }, []);

  return (
    <View>
      <View style={styles.header}>
        <Header />
      </View>
      {loading ? (
        <ActivityIndicator size="large" color={Color.PRIMARTY_COLOR} />
      ) : (
        <View style={{ padding: 20 }}>
          <View style={{ marginTop: -100 }}>
            <CourseList level={"basic"} />
          </View>
          <CourseList level={"advance"} />
        </View>
      )}
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
