import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet, Image, Animated, TouchableOpacity, Alert } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { Ionicons } from "@expo/vector-icons";
import { submitCourseRating } from '../services/courses';

const ScoreScreen = ({ route, navigation }) => {
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

  const renderStars = () => {
    return [1, 2, 3, 4, 5].map((star) => (
      <TouchableOpacity 
        key={star} 
        onPress={() => handleRating(star)}
        style={styles.starButton}
      >
        <Ionicons 
          name={rating >= star ? "star" : "star-outline"} 
          size={35} 
          color={rating >= star ? "#FFD700" : "#BCC6CC"}
        />
      </TouchableOpacity>
    ));
  };

  return (
    <LinearGradient
      colors={['#4c669f', '#3b5998', '#192f6a']}
      style={styles.container}
    >
      <Animated.View style={[
        styles.scoreContainer,
        {
          transform: [{ scale: scaleAnim }],
        }
      ]}>
        <Image 
          source={require("../assets/images/coins.png")} 
          style={styles.coin}
        />
        <Text style={styles.points}>{points}</Text>
        <Text style={styles.text}>Points Earned!</Text>
        
        <View style={styles.ratingContainer}>
          <Text style={styles.ratingText}>Rate this course:</Text>
          <View style={styles.starsContainer}>
            {renderStars()}
          </View>
        </View>

        <TouchableOpacity 
          style={styles.button}
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
    backgroundColor: 'rgba(255, 255, 255, 0.9)',
    borderRadius: 20,
    padding: 30,
    alignItems: 'center',
    shadowColor: "#000",
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
    fontWeight: 'bold',
    color: '#192f6a',
    marginTop: 10,
  },
  text: {
    fontSize: 24,
    fontWeight: '600',
    color: '#4c669f',
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
    color: '#4c669f',
    marginBottom: 10,
    fontWeight: '500',
  },
  starsContainer: {
    flexDirection: 'row',
    marginBottom: 20,
  },
  starButton: {
    padding: 5,
  },
  button: {
    backgroundColor: '#4c669f',
    paddingHorizontal: 30,
    paddingVertical: 12,
    borderRadius: 25,
    marginTop: 10,
  },
  buttonText: {
    color: 'white',
    fontSize: 16,
    fontWeight: '600',
  },
});

export default ScoreScreen; 