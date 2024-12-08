import { createStackNavigator } from "@react-navigation/stack";
import Quiz from "../screens/Quiz";
import QuizQuestions from "../screens/QuizQuestions";
import Color from "../utils/Color";
import { Platform } from "react-native";
import { TransitionPresets } from "@react-navigation/stack";
import QuizResult from '../screens/QuizResult';

const Stack = createStackNavigator();

const QuizNavigator = () => {
  return (
    <Stack.Navigator
      screenOptions={{
        headerShown: false,
        ...(Platform.OS === "ios"
          ? TransitionPresets.SlideFromRightIOS
          : TransitionPresets.ScaleFromCenterAndroid),
        cardStyle: { backgroundColor: Color.LIGHT },
        gestureEnabled: true,
        gestureDirection: "horizontal",
        cardStyleInterpolator: ({ current: { progress } }) => ({
          cardStyle: {
            opacity: progress,
          },
        }),
        transitionSpec: {
          open: {
            animation: "timing",
            config: {
              duration: 300,
            },
          },
          close: {
            animation: "timing",
            config: {
              duration: 300,
            },
          },
        },
      }}
    >
      <Stack.Screen
        name="QuizHome"
        component={Quiz}
        options={{
          animationEnabled: true,
        }}
      />
      <Stack.Screen
        name="QuizQuestions"
        component={QuizQuestions}
        options={({ route }) => ({
          title: route.params.quiz.name,
          headerStyle: {
            backgroundColor: "#f5f5f5",
          },
          headerTintColor: "#333",
          headerTitleStyle: {
            fontWeight: "bold",
          },
          animationEnabled: true,
        })}
      />
      <Stack.Screen
        name="QuizResult"
        component={QuizResult}
        options={{ headerShown: false }}
      />
    </Stack.Navigator>
  );
};

export default QuizNavigator;
