import React, { useEffect } from 'react';
import { View, Text, StyleSheet, Image, Animated } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';

const ScoreScreen = ({ route, navigation }) => {
  const { points } = route.params;
  const scaleAnim = new Animated.Value(0);
  
  useEffect(() => {
    // Animasyon efekti
    Animated.spring(scaleAnim, {
      toValue: 1,
      friction: 5,
      tension: 40,
      useNativeDriver: true,
    }).start();

    const timer = setTimeout(() => {
      navigation.navigate("Home");
    }, 2000);

    return () => clearTimeout(timer);
  }, []);

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
});

export default ScoreScreen; 