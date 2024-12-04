import React from "react";
import { createStackNavigator } from "@react-navigation/stack";
import MyCourse from "../screens/MyCourse";
import CourseDetailScreen from "../screens/CourseDetailScreen";

const Stack = createStackNavigator();

export default function MyCourseNavigation() {
  return (
    <Stack.Navigator screenOptions={{ headerShown: false }}>
      <Stack.Screen name="MyCourse" component={MyCourse} />
      <Stack.Screen name="CourseDetail" component={CourseDetailScreen} />
    </Stack.Navigator>
  );
} 