import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet, Image, Animated, TouchableOpacity, Alert } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { Ionicons } from "@expo/vector-icons";
import { submitCourseRating } from '../services/courses';
import { useTheme } from "../contexts/ThemeContext";
import Color from "../utils/Color";

const ScoreScreen = ({ route, navigation }) => {
  const { theme, colors } = useTheme();
  const { points, courseId, userEmail } = route.params;
  console.log("Score Screen Params:", { points, courseId, userEmail });
  
  const [rating, setRating] = useState(0);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const scaleAnim = new Animated.Value(0);
  
  useEffect(() => {
    Animated.spring(scaleAnim, {
      toValue: 1,
      friction: 5,
      tension: 40,
      useNativeDriver: true,
    }).start();
  }, []);

  const handleRating = async (selectedRating) => {
    if (!courseId || !userEmail) {
      Alert.alert("Error", "Missing required information");
      return;
    }

    try {
      setIsSubmitting(true);
      setRating(selectedRating);
      
      const result = await submitCourseRating(courseId, userEmail, selectedRating);
      
      Alert.alert(
        "Thank You!",
        "Your rating has been submitted successfully.",
        [
          {
            text: "OK",
            onPress: () => navigation.navigate("Home")
          }
        ]
      );
    } catch (error) {
      console.error("Rating error:", error);
      Alert.alert("Error", "Failed to submit rating. Please try again.");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <LinearGradient
      colors={theme === 'dark' 
        ? ['#1a1a1a', '#2d2d2d']
        : ['#4c669f', '#3b5998', '#192f6a']}
      style={styles.container}
    >
      <Animated.View style={[
        styles.scoreContainer,
        {
          backgroundColor: theme === 'dark' 
            ? colors.surface 
            : 'rgba(255, 255, 255, 0.9)',
          shadowColor: colors.shadowColor,
        },
        {
          transform: [{ scale: scaleAnim }],
        }
      ]}>
        <Image 
          source={require("../assets/images/coins.png")} 
          style={styles.coin}
        />
        <Text style={[styles.points, {
          color: theme === 'dark' ? Color.ORANGE : '#192f6a'
        }]}>
          {points}
        </Text>
        <Text style={[styles.text, {
          color: theme === 'dark' ? '#e0e0e0' : '#4c669f'
        }]}>
          Points Earned!
        </Text>
        
        <View style={styles.ratingContainer}>
          <Text style={[styles.ratingText, {
            color: theme === 'dark' ? '#e0e0e0' : '#4c669f'
          }]}>
            Rate this course:
          </Text>
          <View style={styles.starsContainer}>
            {[1, 2, 3, 4, 5].map((star) => (
              <TouchableOpacity 
                key={star} 
                onPress={() => handleRating(star)}
                style={styles.starButton}
              >
                <Ionicons 
                  name={rating >= star ? "star" : "star-outline"} 
                  size={35} 
                  color={rating >= star 
                    ? theme === 'dark' ? Color.ORANGE : "#FFD700"
                    : theme === 'dark' ? '#666' : "#BCC6CC"
                  }
                />
              </TouchableOpacity>
            ))}
          </View>
        </View>

        <TouchableOpacity 
          style={[styles.button, {
            backgroundColor: theme === 'dark' ? Color.ORANGE : '#4c669f'
          }]}
          onPress={() => navigation.navigate("Home")}
        >
          <Text style={styles.buttonText}>Back to Home</Text>
        </TouchableOpacity>
      </Animated.View>
    </LinearGradient>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  scoreContainer: {
    borderRadius: 20,
    padding: 30,
    alignItems: 'center',
    shadowOffset: {
      width: 0,
      height: 4,
    },
    shadowOpacity: 0.30,
    shadowRadius: 4.65,
    elevation: 8,
  },
  points: {
    fontSize: 48,
    fontFamily: 'Poppins-Bold',
    marginTop: 10,
  },
  text: {
    fontSize: 24,
    fontFamily: 'Poppins-SemiBold',
  },
  coin: {
    width: 120,
    height: 120,
    marginBottom: 10,
  },
  ratingContainer: {
    marginTop: 20,
    alignItems: 'center',
  },
  ratingText: {
    fontSize: 18,
    marginBottom: 10,
    fontFamily: 'Poppins-Medium',
  },
  starsContainer: {
    flexDirection: 'row',
    marginBottom: 20,
  },
  starButton: {
    padding: 5,
  },
  button: {
    paddingHorizontal: 30,
    paddingVertical: 12,
    borderRadius: 25,
    marginTop: 10,
  },
  buttonText: {
    color: 'white',
    fontSize: 16,
    fontFamily: 'Poppins-SemiBold',
  },
});

export default ScoreScreen; 