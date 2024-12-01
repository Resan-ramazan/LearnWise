import React, { useEffect } from 'react';
import { View, Text, StyleSheet } from 'react-native';

const ScoreScreen = ({ route, navigation }) => {
  const { points} = route.params;

  useEffect(() => {
    // 2 saniye sonra otomatik olarak geri dön
    const timer = setTimeout(() => {
        navigation.navigate("Home"); // Direkt navigation nesnesini kullan
      }, 2000);
  

    return () => clearTimeout(timer);
  }, []);

  return (
    <View style={styles.container}>
      <Text style={styles.text}>{points} Puan Kazandınız!</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#fff',
  },
  text: {
    fontSize: 24,
    fontWeight: 'bold',
  },
});

export default ScoreScreen; 