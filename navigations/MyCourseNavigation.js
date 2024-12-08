import React from "react";
import { createStackNavigator } from "@react-navigation/stack";
import MyCourse from "../screens/MyCourse";
import CourseDetailScreen from "../screens/CourseDetailScreen";
import ScoreScreen from "../screens/ScoreScreen";
import ChapterContentScreen from "../screens/ChapterContentScreen";
import HomeScreen from "../screens/HomeScreen";
const Stack = createStackNavigator();

export default function MyCourseNavigation() {
  return (
    <Stack.Navigator screenOptions={{ headerShown: false }}>
      <Stack.Screen name="MyCourse" component={MyCourse} />
      <Stack.Screen name="CourseDetail" component={CourseDetailScreen} />
      <Stack.Screen name="ChapterContent" component={ChapterContentScreen} />
      <Stack.Screen name="ScoreScreen" component={ScoreScreen} />
      <Stack.Screen name="Home" component={HomeScreen} />
    </Stack.Navigator>
  );
} 