import { StyleSheet, Text, View } from "react-native";
import React from "react";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import HomeScreen from "../screens/HomeScreen";
import MyCourse from "../screens/MyCourse";
import LeaderBoard from "../screens/LeaderBoard";
import ProfileScreen from "../screens/ProfileScreen";
import Ionicons from "@expo/vector-icons/Ionicons";
import HomeScreenNavigation from "./HomeScreenNavigation";

import Color from "../utils/Color";
const Tab = createBottomTabNavigator();

const TabNavigation = () => {
  return (
    <Tab.Navigator
      screenOptions={{
        headerShown: false,
        tabBarStyle: {
          backgroundColor: Color.TEXT_WHITE,
          paddingBottom: 10,
          paddingTop: 10,
          borderTopWidth: 1,
          borderTopColor: "#f0f0f0",
        },
        tabBarActiveTintColor: Color.ORANGE,
        tabBarInactiveTintColor: Color.TEXT_GRAY,
        tabBarLabelStyle: {
          fontSize: 12,
          fontWeight: "500",
        },
      }}
    >
      <Tab.Screen
        name="home"
        component={HomeScreenNavigation}
        options={{
          tabBarIcon: ({ color, size }) => (
            <Ionicons name="home" color={color} size={size} />
          ),
          tabBarLabel: "Home",
        }}
      />
      <Tab.Screen
        name="mycourse"
        component={MyCourse}
        options={{
          tabBarIcon: ({ color, size }) => (
            <Ionicons name="book" color={color} size={size} />
          ),
        }}
      />
      <Tab.Screen
        name="leaderboard"
        component={LeaderBoard}
        options={{
          tabBarIcon: ({ color, size }) => (
            <Ionicons name="podium" color={color} size={size} />
          ),
          tabBarLabel: "Leaderboard",
        }}
      />
      <Tab.Screen
        name="profile"
        component={ProfileScreen}
        options={{
          tabBarIcon: ({ color, size }) => (
            <Ionicons name="person" color={color} size={size} />
          ),
          tabBarLabel: "Profile",
        }}
      />
    </Tab.Navigator>
  );
};

export default TabNavigation;

const styles = StyleSheet.create({});
