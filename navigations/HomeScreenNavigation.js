import { Platform } from "react-native";
import React from "react";
import { createStackNavigator } from "@react-navigation/stack";
import { TransitionPresets } from '@react-navigation/stack';
import HomeScreen from "../screens/HomeScreen";
import CourseDetailScreen from "../screens/CourseDetailScreen";
import ChapterContentScreen from "../screens/ChapterContentScreen";
import Color from "../utils/Color";
import ScoreScreen from "../screens/ScoreScreen";
const Stack = createStackNavigator();

export default function HomeScreenNavigation() {
  return (
    <Stack.Navigator
      screenOptions={{
        headerShown: false,
        ...Platform.OS === 'ios' 
          ? TransitionPresets.SlideFromRightIOS
          : TransitionPresets.ScaleFromCenterAndroid,
        cardStyle: { backgroundColor: Color.LIGHT },
        gestureEnabled: true,
        gestureDirection: 'horizontal',
        cardStyleInterpolator: ({ current: { progress } }) => ({
          cardStyle: {
            opacity: progress,
          },
        }),
        transitionSpec: {
          open: {
            animation: 'timing',
            config: {
              duration: 300,
            },
          },
          close: {
            animation: 'timing',
            config: {
              duration: 300,
            },
          },
        },
      }}
    >
      <Stack.Screen 
        name="Home" 
        component={HomeScreen}
        options={{
          animationEnabled: true,
        }}
      />
      <Stack.Screen 
        name="CourseDetail" 
        component={CourseDetailScreen}
        options={{
          animationEnabled: true,
        }}
      />
      <Stack.Screen 
        name="ChapterContent" 
        component={ChapterContentScreen}
        options={{
          animationEnabled: true,
        }}
      />
      <Stack.Screen 
        name="ScoreScreen" 
        component={ScoreScreen}
        options={{
          animationEnabled: true,
        }}
      />
    </Stack.Navigator>
  );
}
