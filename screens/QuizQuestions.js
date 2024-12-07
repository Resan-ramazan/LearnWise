import { StyleSheet, Text, View, TouchableOpacity, Animated } from "react-native";
import React, { useState, useRef } from "react";
import Ionicons from "react-native-vector-icons/Ionicons";
import Color from "../utils/Color";
import { LinearGradient } from 'expo-linear-gradient';

const QuizQuestions = ({ route, navigation }) => {
  const { quiz } = route.params;
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [score, setScore] = useState(0);
  const fadeAnim = useRef(new Animated.Value(1)).current;

  const currentQuestion = quiz.questions[currentQuestionIndex];

  const handleAnswer = (selectedAnswer) => {
    // Fade out animasyonu
    Animated.sequence([
      Animated.timing(fadeAnim, {
        toValue: 0,
        duration: 200,
        useNativeDriver: true,
      }),
      Animated.timing(fadeAnim, {
        toValue: 1,
        duration: 200,
        useNativeDriver: true,
      }),
    ]).start();

    if (selectedAnswer === currentQuestion.correctAnswer) {
      setScore(score + 1);
    }

    setTimeout(() => {
      if (currentQuestionIndex < quiz.questions.length - 1) {
        setCurrentQuestionIndex(currentQuestionIndex + 1);
      } else {
        // Quiz bitti, sonuç ekranına yönlendir
        console.log("Quiz bitti! Skor:", score);
      }
    }, 200);
  };

  return (
    <View style={styles.container}>
      <LinearGradient
        colors={[Color.PRIMARTY_COLOR, "#7c4dff"]}
        style={styles.header}
      >
        <TouchableOpacity
          style={styles.backButton}
          onPress={() => navigation.goBack()}
        >
          <Ionicons name="arrow-back-circle" size={40} color="#fff" />
        </TouchableOpacity>
        
        <View style={styles.progressContainer}>
          <View style={styles.progressInfo}>
            <Ionicons name="help-circle" size={24} color="#fff" />
            <Text style={styles.progressText}>
              Question {currentQuestionIndex + 1} of {quiz.questions.length}
            </Text>
          </View>
          <View style={styles.progressBar}>
            <View 
              style={[
                styles.progressFill, 
                { width: `${((currentQuestionIndex + 1) / quiz.questions.length) * 100}%` }
              ]} 
            />
          </View>
        </View>
      </LinearGradient>

      <Animated.View 
        style={[styles.contentContainer, { opacity: fadeAnim }]}
      >
        <View style={styles.questionContainer}>
          <Text style={styles.questionText}>{currentQuestion.question}</Text>
        </View>

        <View style={styles.optionsContainer}>
          {currentQuestion.options.map((option, index) => (
            <TouchableOpacity
              key={index}
              style={styles.optionButton}
              onPress={() => handleAnswer(option)}
            >
              <LinearGradient
                colors={['#fff', '#f8f9fa']}
                style={styles.optionGradient}
              >
                <Text style={styles.optionLetter}>
                  {String.fromCharCode(65 + index)}
                </Text>
                <Text style={styles.optionText}>{option}</Text>
              </LinearGradient>
            </TouchableOpacity>
          ))}
        </View>
      </Animated.View>
    </View>
  );
};

export default QuizQuestions;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#f0f2f5",
  },
  header: {
    height: 160,
    paddingTop: 40,
    paddingHorizontal: 20,
    borderBottomLeftRadius: 30,
    borderBottomRightRadius: 30,
  },
  backButton: {
    marginBottom: 15,
  },
  progressContainer: {
    marginTop: 10,
  },
  progressInfo: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 10,
    gap: 10,
  },
  progressText: {
    fontSize: 16,
    color: "#fff",
    fontFamily: "Poppins-Medium",
  },
  progressBar: {
    height: 8,
    backgroundColor: 'rgba(255,255,255,0.3)',
    borderRadius: 4,
  },
  progressFill: {
    height: '100%',
    backgroundColor: '#fff',
    borderRadius: 4,
  },
  contentContainer: {
    flex: 1,
    padding: 20,
    marginTop: -30,
  },
  questionContainer: {
    backgroundColor: "#fff",
    padding: 25,
    borderRadius: 20,
    elevation: 5,
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    marginBottom: 20,
  },
  questionText: {
    fontSize: 18,
    color: "#333",
    lineHeight: 26,
    fontFamily: "Poppins-Medium",
  },
  optionsContainer: {
    gap: 12,
  },
  optionButton: {
    borderRadius: 15,
    elevation: 3,
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 1,
    },
    shadowOpacity: 0.22,
    shadowRadius: 2.22,
  },
  optionGradient: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 15,
    borderRadius: 15,
    gap: 15,
  },
  optionLetter: {
    width: 35,
    height: 35,
    backgroundColor: Color.PRIMARTY_COLOR,
    borderRadius: 18,
    textAlign: 'center',
    textAlignVertical: 'center',
    color: '#fff',
    fontSize: 18,
    fontFamily: "Poppins-Bold",
    lineHeight: 35,
  },
  optionText: {
    flex: 1,
    fontSize: 16,
    color: "#333",
    fontFamily: "Poppins-Regular",
  },
});
