import { ActivityIndicator, StyleSheet, Text, View } from "react-native";
import React from "react";
import Header from "../components/HomeScreen/Header";
import Color from "../utils/Color";
import CourseList from "../components/HomeScreen/CourseList";
import { useState } from "react";
import { useEffect } from "react";
import { useUser as useClerkUser } from "@clerk/clerk-expo";
import { useUser } from "../contexts/UserContext";

const HomeScreen = () => {
  const { user: clerkUser } = useClerkUser();
  const { userData, initializeUser, loading } = useUser();

  useEffect(() => {
    if (clerkUser && !userData) {
      initializeUser(clerkUser);
    }
  }, [clerkUser]);

  if (loading) {
    return <ActivityIndicator size="large" />;
  }

  return (
    <View>
      {userData && (
        <>
          <View style={styles.header}>
            <Header userData={userData} />
          </View>
          <View style={{ padding: 20 }}>
            <View style={{ marginTop: -100 }}>
              <CourseList level={"basic"} />
            </View>
            <CourseList level={"advance"} />
          </View>
        </>
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
