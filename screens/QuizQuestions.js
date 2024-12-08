import { StyleSheet, Text, View, TouchableOpacity, Animated } from "react-native";
import React, { useState, useRef, useEffect } from "react";
import Ionicons from "react-native-vector-icons/Ionicons";
import Color from "../utils/Color";
import { LinearGradient } from 'expo-linear-gradient';

const QuizQuestions = ({ route, navigation }) => {
  const { quiz } = route.params;
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [score, setScore] = useState(0);
  const [timeLeft, setTimeLeft] = useState(30);
  const fadeAnim = useRef(new Animated.Value(1)).current;
  const timerRef = useRef(null);

  const currentQuestion = quiz.questions[currentQuestionIndex];

  useEffect(() => {
    startTimer();
    return () => clearInterval(timerRef.current);
  }, [currentQuestionIndex]);

  const startTimer = () => {
    setTimeLeft(30);
    clearInterval(timerRef.current);
    
    timerRef.current = setInterval(() => {
      setTimeLeft((prevTime) => {
        if (prevTime <= 1) {
          clearInterval(timerRef.current);
          handleTimeUp();
          return 0;
        }
        return prevTime - 1;
      });
    }, 1000);
  };

  const handleTimeUp = () => {
    if (currentQuestionIndex < quiz.questions.length - 1) {
      setCurrentQuestionIndex(currentQuestionIndex + 1);
    } else {
      navigation.navigate('QuizResult', {
        score,
        totalQuestions: quiz.questions.length,
        quizName: quiz.name
      });
    }
  };

  const handleAnswer = (selectedAnswer) => {
    clearInterval(timerRef.current);

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
        navigation.navigate('QuizResult', {
          score: score + (selectedAnswer === currentQuestion.correctAnswer ? 1 : 0),
          totalQuestions: quiz.questions.length,
          quizName: quiz.name
        });
      }
    }, 200);
  };

  return (
    <View style={styles.container}>
      <LinearGradient
        colors={[Color.PRIMARTY_COLOR, "#7c4dff"]}
        style={styles.header}
      >
        <View style={styles.headerTop}>
          <TouchableOpacity
            style={styles.backButton}
            onPress={() => navigation.goBack()}
          >
            <Ionicons name="arrow-back-circle" size={40} color="#fff" />
          </TouchableOpacity>

          <View style={styles.timerContainer}>
            <Ionicons name="timer-outline" size={24} color="#fff" />
            <Text style={styles.timerText}>{timeLeft}s</Text>
          </View>
        </View>
        
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
          <View style={styles.questionBadge}>
            <Text style={styles.questionNumber}>Question {currentQuestionIndex + 1}</Text>
          </View>
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
                <View style={styles.optionLetterContainer}>
                  <Text style={styles.optionLetter}>
                    {String.fromCharCode(65 + index)}
                  </Text>
                </View>
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
  headerTop: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 15,
  },
  timerContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: 'rgba(255,255,255,0.2)',
    paddingHorizontal: 15,
    paddingVertical: 8,
    borderRadius: 20,
    gap: 8,
  },
  timerText: {
    color: '#fff',
    fontSize: 18,
    fontFamily: 'Poppins-Bold',
  },
  progressContainer: {
    marginTop: -5,
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
  questionBadge: {
    backgroundColor: Color.PRIMARTY_COLOR,
    alignSelf: 'flex-start',
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 12,
    marginBottom: 12,
  },
  questionNumber: {
    color: '#fff',
    fontSize: 14,
    fontFamily: 'Poppins-Medium',
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
    backgroundColor: '#fff',
  },
  optionGradient: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 15,
    borderRadius: 15,
    gap: 15,
  },
  optionLetterContainer: {
    width: 35,
    height: 35,
    backgroundColor: Color.PRIMARTY_COLOR,
    borderRadius: 18,
    alignItems: 'center',
    justifyContent: 'center',
  },
  optionLetter: {
    color: '#fff',
    fontSize: 18,
    fontFamily: "Poppins-Bold",
  },
  optionText: {
    flex: 1,
    fontSize: 16,
    color: "#333",
    fontFamily: "Poppins-Regular",
  },
});
