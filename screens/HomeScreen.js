import { ActivityIndicator, StyleSheet, Text, View } from "react-native";
import React, { useEffect } from "react";
import Header from "../components/HomeScreen/Header";
import Color from "../utils/Color";
import CourseList from "../components/HomeScreen/CourseList";
import { useUser as useClerkUser } from "@clerk/clerk-expo";
import { useUser } from "../contexts/UserContext";
import { useNavigation } from "@react-navigation/native";
import CourseProgress from "../components/HomeScreen/CourseProgress";
import { ScrollView } from "react-native-gesture-handler";


const HomeScreen = () => {
  const navigation = useNavigation();
  const { user: clerkUser } = useClerkUser();
  const { userData, initializeUser, loading, refreshUserData } = useUser();

  useEffect(() => {
    if (clerkUser) {
      initializeUser(clerkUser);
    }
  }, [clerkUser]);

  // Ekran her odaklandığında verileri yenile
  useEffect(() => {
    const unsubscribe = navigation.addListener('focus', () => {
      if (userData?.email) {
        refreshUserData();
      }
    });

    return unsubscribe;
  }, [navigation, userData]);

  if (loading) {
    return (
      <View style={styles.loadingContainer}>
        <ActivityIndicator size="large" color={Color.PRIMARY} />
      </View>
    );
  }

  return (
    <ScrollView>
      {userData && (
        <>
          <View style={styles.header}>
            <Header userData={userData} />
          </View>
          <View style={{ padding: 20 }}>
            <View style={{ marginTop: -100 }}>
              <CourseProgress text="Course Progress"  />
              <CourseList level={"basic"} />
            </View>
            <CourseList level={"advance"} />
          </View>
        </>
      )}
    </ScrollView>
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
  loadingContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
});
