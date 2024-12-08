import React from "react";
import { createStackNavigator } from "@react-navigation/stack";
import MyCourse from "../screens/MyCourse";
import CourseDetailScreen from "../screens/CourseDetailScreen";

import ChapterContentScreen from "../screens/ChapterContentScreen";

const Stack = createStackNavigator();

export default function MyCourseNavigation() {
  return (
    <Stack.Navigator screenOptions={{ headerShown: false }}>
      <Stack.Screen name="MyCourse" component={MyCourse} />
      <Stack.Screen name="CourseDetail" component={CourseDetailScreen} />
      <Stack.Screen name="ChapterContent" component={ChapterContentScreen} />
    </Stack.Navigator>
  );
} 