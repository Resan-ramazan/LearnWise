import React, { useEffect } from 'react';
import { Animated, StyleSheet, Text, View } from 'react-native';
import Color from '../utils/Color';

const CustomToast = ({ message, type = 'success', visible, onHide }) => {
  const translateY = new Animated.Value(-100);

  useEffect(() => {
    if (visible) {
      // Toast'u göster
      Animated.spring(translateY, {
        toValue: 50,
        useNativeDriver: true,
      }).start();

      // 2 saniye sonra gizle
      const timer = setTimeout(() => {
        Animated.timing(translateY, {
          toValue: -100,
          duration: 300,
          useNativeDriver: true,
        }).start(() => onHide());
      }, 2000);

      return () => clearTimeout(timer);
    }
  }, [visible]);

  const backgroundColor = type === 'success' ? Color.GREEN : Color.RED;

  return (
    <Animated.View
      style={[
        styles.container,
        { transform: [{ translateY }], backgroundColor },
      ]}
    >
      <Text style={styles.text}>{message}</Text>
    </Animated.View>
  );
};

const styles = StyleSheet.create({
  container: {
    position: 'absolute',
    top: 0,
    left: 20,
    right: 20,
    padding: 15,
    borderRadius: 8,
    elevation: 5,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    zIndex: 1000,
  },
  text: {
    color: '#fff',
    textAlign: 'center',
    fontFamily: 'Poppins-Medium',
    fontSize: 14,
  },
});

export default CustomToast; 