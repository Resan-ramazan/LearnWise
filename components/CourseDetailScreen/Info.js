import { StyleSheet, Text, View } from "react-native";
import React from "react";
import Ionicons from "@expo/vector-icons/Ionicons";
import Color from "../../utils/Color";
import { useTranslation } from 'react-i18next';
import { useTheme } from "../../contexts/ThemeContext";

const Info = ({ icon, value }) => {
  const { t } = useTranslation();
  const { theme, colors } = useTheme();
  
  return (
    <View style={[styles.container, {
      backgroundColor: theme === 'dark' ? 'rgba(255,255,255,0.05)' : '#f8f8f8'
    }]}>
      <View style={[styles.iconContainer, {
        backgroundColor: theme === 'dark' ? 'rgba(255,255,255,0.1)' : '#fff'
      }]}>
        <Ionicons 
          name={icon} 
          size={20} 
          color={Color.ORANGE} 
        />
      </View>
      <Text style={[styles.text, { 
        color: theme === 'dark' ? colors.textSecondary : '#333' 
      }]}>
        {value}
      </Text>
    </View>
  );
};

export default Info;

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    alignItems: "center",
    padding: 10,
    borderRadius: 10,
    marginVertical: 5,
    width: "49%",
  },
  iconContainer: {
    padding: 8,
    borderRadius: 8,
    marginRight: 7,
  },
  text: {
    fontFamily: "Poppins-Medium",
    fontSize: 14,
  },
});
