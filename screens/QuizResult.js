import { StyleSheet, Text, View, TouchableOpacity } from "react-native";
import React from "react";
import { LinearGradient } from "expo-linear-gradient";
import Color from "../utils/Color";
import Ionicons from "react-native-vector-icons/Ionicons";
import LottieView from "lottie-react-native";

const QuizResult = ({ route, navigation }) => {
  const { score, totalQuestions, quizName } = route.params;
  const percentage = (score / totalQuestions) * 100;

  const renderMessage = () => {
    if (percentage >= 80) {
      return "Fantastic! You're a Star! 🌟";
    } else if (percentage >= 60) {
      return "Great Job! Keep Going! 🎉";
    } else {
      return "Nice Try! Let's Practice More! 💪";
    }
  };

  return (
    <View style={styles.container}>
      <LinearGradient
        colors={[Color.PRIMARTY_COLOR, "#7c4dff"]}
        style={styles.header}
      >
        <Text style={styles.title}>Quiz Complete!</Text>
        <LottieView
          source={require("../assets/animations/celebrate.json")}
          autoPlay
          loop
          style={styles.animation}
        />
      </LinearGradient>

      <View style={styles.resultContainer}>
        <View style={styles.scoreCard}>
          <Text style={styles.message}>{renderMessage()}</Text>
          <Text style={styles.quizName}>{quizName}</Text>

          <View style={styles.scoreCircle}>
            <Text style={styles.scoreText}>{score}</Text>
            <Text style={styles.totalText}>/ {totalQuestions}</Text>
          </View>

          <Text style={styles.percentageText}>
            {percentage.toFixed(0)}% Correct
          </Text>
        </View>

        <View style={styles.buttonContainer}>
          <TouchableOpacity
            style={[styles.button, styles.retryButton]}
            onPress={() => navigation.navigate("QuizHome")}
          >
            <Ionicons name="reload" size={24} color="#fff" />
            <Text style={styles.buttonText}>Try Another Quiz</Text>
          </TouchableOpacity>

          <TouchableOpacity
            style={[styles.button, styles.homeButton]}
            onPress={() => navigation.navigate("QuizHome")}
          >
            <Ionicons name="home" size={24} color="#fff" />
            <Text style={styles.buttonText}>Back to Home</Text>
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#f0f2f5",
  },
  header: {
    height: 300,
    alignItems: "center",
    justifyContent: "center",
    borderBottomLeftRadius: 30,
    borderBottomRightRadius: 30,
  },
  title: {
    fontSize: 32,
    color: "#fff",
    fontFamily: "Poppins-Bold",
    marginBottom: 20,
  },
  animation: {
    width: 200,
    height: 200,
  },
  resultContainer: {
    flex: 1,
    marginTop: -50,
    paddingHorizontal: 20,
  },
  scoreCard: {
    backgroundColor: "#fff",
    borderRadius: 20,
    padding: 20,
    alignItems: "center",
    elevation: 5,
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
  },
  message: {
    fontSize: 24,
    color: "#333",
    fontFamily: "Poppins-Bold",
    textAlign: "center",
    marginBottom: 10,
  },
  quizName: {
    fontSize: 16,
    color: "#666",
    fontFamily: "Poppins-Medium",
    marginBottom: 20,
  },
  scoreCircle: {
    width: 150,
    height: 150,
    borderRadius: 75,
    backgroundColor: Color.PRIMARTY_COLOR,
    alignItems: "center",
    justifyContent: "center",
    marginBottom: 20,
  },
  scoreText: {
    fontSize: 48,
    color: "#fff",
    fontFamily: "Poppins-Bold",
  },
  totalText: {
    fontSize: 20,
    color: "#fff",
    fontFamily: "Poppins-Medium",
  },
  percentageText: {
    fontSize: 20,
    color: "#333",
    fontFamily: "Poppins-SemiBold",
  },
  buttonContainer: {
    marginTop: 20,
    gap: 15,
  },
  button: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    padding: 15,
    borderRadius: 15,
    gap: 10,
  },
  retryButton: {
    backgroundColor: Color.PRIMARTY_COLOR,
  },
  homeButton: {
    backgroundColor: "#7c4dff",
  },
  buttonText: {
    color: "#fff",
    fontSize: 16,
    fontFamily: "Poppins-Medium",
  },
});

export default QuizResult;
