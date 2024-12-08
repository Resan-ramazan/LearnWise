import React, { createContext, useContext, useState } from 'react';
import Color from '../utils/Color';

// Tema renkleri için sabit değerler
const themes = {
  light: {
    theme: 'light',
    background: '#ffffff',
    surface: '#ffffff',
    text: '#333333',
    textSecondary: '#666666',
    border: '#f0f0f0',
    primary: Color.PRIMARTY_COLOR,
    secondary: Color.SECONDARY_COLOR,
    orange: Color.ORANGE,
    lightGreen: Color.LIGHT_GREEN,
    green: Color.GREEN,
    borderColor: Color.BORDER_COLOR,
    textColor: Color.TEXT_COLOR,
    textLight: Color.TEXT_LIGHT,
    textDark: Color.TEXT_DARK,
    textWhite: Color.TEXT_WHITE,
    textBlack: Color.TEXT_BLACK,
    textGray: Color.TEXT_GRAY,
    textRed: Color.TEXT_RED,
    cardBackground: '#ffffff',
    modalBackground: '#ffffff',
    shadowColor: '#000000',
    inputBackground: '#f5f5f5',
    headerBackground: '#ffffff',
    coinContainerBackground: 'rgba(0,0,0,0.05)',
    gradientStart: '#ffffff',
    gradientEnd: '#f5f5f5',
    cardShadow: {
      shadowColor: "#000",
      shadowOffset: {
        width: 0,
        height: 2,
      },
      shadowOpacity: 0.1,
      shadowRadius: 3.84,
      elevation: 5,
    },
    searchInputBackground: '#f5f5f5',
    progressBarBackground: 'rgba(0,0,0,0.1)',
    courseItemGradient: ['transparent', 'rgba(0,0,0,0.8)'],
  },
  dark: {
    theme: 'dark',
    background: '#121212',
    surface: '#1e1e1e',
    text: '#ffffff',
    textSecondary: '#aaaaaa',
    border: '#2c2c2c',
    primary: Color.PRIMARTY_COLOR,
    secondary: Color.SECONDARY_COLOR,
    orange: Color.ORANGE,
    lightGreen: Color.LIGHT_GREEN,
    green: Color.GREEN,
    borderColor: Color.BORDER_COLOR,
    textColor: Color.TEXT_WHITE,
    textLight: Color.TEXT_LIGHT,
    textDark: Color.TEXT_WHITE,
    textWhite: Color.TEXT_WHITE,
    textBlack: Color.TEXT_BLACK,
    textGray: Color.TEXT_GRAY,
    textRed: Color.TEXT_RED,
    cardBackground: '#1e1e1e',
    modalBackground: '#242424',
    shadowColor: '#000000',
    inputBackground: '#242424',
    headerBackground: '#121212',
    coinContainerBackground: 'rgba(255,255,255,0.1)',
    gradientStart: '#1a1a1a',
    gradientEnd: '#121212',
    cardShadow: {
      shadowColor: "#000",
      shadowOffset: {
        width: 0,
        height: 2,
      },
      shadowOpacity: 0.25,
      shadowRadius: 3.84,
      elevation: 5,
    },
    searchInputBackground: '#242424',
    progressBarBackground: 'rgba(255,255,255,0.1)',
    courseItemGradient: ['transparent', 'rgba(0,0,0,0.9)'],
  }
};

const ThemeContext = createContext();

export const ThemeProvider = ({ children }) => {
  const [theme, setTheme] = useState('light');

  const toggleTheme = () => {
    setTheme(prevTheme => prevTheme === 'light' ? 'dark' : 'light');
  };

  // Mevcut tema renklerini döndüren yardımcı fonksiyon
  const getColors = () => themes[theme];

  return (
    <ThemeContext.Provider value={{ theme, toggleTheme, colors: getColors() }}>
      {children}
    </ThemeContext.Provider>
  );
};

export const useTheme = () => {
  const context = useContext(ThemeContext);
  if (!context) {
    throw new Error('useTheme must be used within a ThemeProvider');
  }
  return context;
}; 