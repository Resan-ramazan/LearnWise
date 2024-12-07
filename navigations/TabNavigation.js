import { Platform, StyleSheet, Text, View } from "react-native";
import React from "react";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import HomeScreen from "../screens/HomeScreen";
import MyCourse from "../screens/MyCourse";
import LeaderBoard from "../screens/LeaderBoard";
import ProfileScreen from "../screens/ProfileScreen";
import Ionicons from "@expo/vector-icons/Ionicons";
import HomeScreenNavigation from "./HomeScreenNavigation";
import MyCourseNavigation from "./MyCourseNavigation";
import QuizNavigator from "./QuizNavigator";
import Color from "../utils/Color";
import { useTranslation } from "react-i18next";
const Tab = createBottomTabNavigator();

const TabNavigation = () => {
  const { t } = useTranslation();

  return (
    <Tab.Navigator
      screenOptions={{
        headerShown: false,
        tabBarStyle: styles.tabBar,
        tabBarShowLabel: true,
        tabBarActiveTintColor: Color.PRIMARTY_COLOR,
        tabBarInactiveTintColor: "#999",
        tabBarLabelStyle: styles.tabLabel,
      }}
    >
      <Tab.Screen
        name="home"
        component={HomeScreenNavigation}
        options={{
          tabBarLabel: t("Home"),
          tabBarIcon: ({ color, size, focused }) => (
            <View style={styles.iconContainer}>
              <Ionicons
                name={focused ? "home" : "home-outline"}
                color={color}
                size={size}
              />
            </View>
          ),
        }}
      />
      <Tab.Screen
        name="mycourse"
        component={MyCourseNavigation}
        options={{
          tabBarLabel: t("My Courses"),
          tabBarIcon: ({ color, size, focused }) => (
            <View style={styles.iconContainer}>
              <Ionicons
                name={focused ? "book" : "book-outline"}
                color={color}
                size={size}
              />
            </View>
          ),
        }}
      />

      <Tab.Screen
        name="QuizTab"
        component={QuizNavigator}
        options={{
          headerShown: false,
          tabBarLabel: t("Quiz"),
          tabBarIcon: ({ color, size, focused }) => (
            <View style={styles.iconContainer}>
              <Ionicons
                name={focused ? "trophy" : "trophy-outline"}
                color={color}
                size={size}
              />
            </View>
          ),
        }}
      />
      <Tab.Screen
        name="leaderboard"
        component={LeaderBoard}
        options={{
          tabBarLabel: t("Leaderboard"),
          tabBarIcon: ({ color, size, focused }) => (
            <View style={styles.iconContainer}>
              <Ionicons
                name={focused ? "podium" : "podium-outline"}
                color={color}
                size={size}
              />
            </View>
          ),
        }}
      />
      <Tab.Screen
        name="profile"
        component={ProfileScreen}
        options={{
          tabBarLabel: t("Profile"),
          tabBarIcon: ({ color, size, focused }) => (
            <View style={styles.iconContainer}>
              <Ionicons
                name={focused ? "person" : "person-outline"}
                color={color}
                size={size}
              />
            </View>
          ),
        }}
      />
    </Tab.Navigator>
  );
};

export default TabNavigation;

const styles = StyleSheet.create({
  tabBar: {
    position: "absolute",
    bottom: Platform.OS === "ios" ? 24 : 16,
    left: 16,
    right: 16,
    elevation: 0,
    backgroundColor: "#fff",
    borderRadius: 20,
    height: 65,
    paddingBottom: 8,
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.15,
    shadowRadius: 8,
    elevation: 8,
    borderTopWidth: 0,
  },
  tabLabel: {
    fontFamily: "Poppins-Medium",
    fontSize: 12,
    marginTop: -5,
  },
  iconContainer: {
    alignItems: "center",
    justifyContent: "center",
    paddingTop: 10,
  },
});
