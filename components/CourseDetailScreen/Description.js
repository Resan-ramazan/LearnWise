import { StyleSheet, Text, View, TouchableOpacity } from "react-native";
import React, { useState, useCallback } from "react";
import Color from "../../utils/Color";
import { Ionicons } from "@expo/vector-icons";
import { useTranslation } from 'react-i18next';
import { useTheme } from "../../contexts/ThemeContext";

const Description = ({ course }) => {
  const { t } = useTranslation();
  const { theme, colors } = useTheme();
  const [isExpanded, setIsExpanded] = useState(false);
  const maxLength = 150;

  const toggleExpand = () => {
    setIsExpanded(!isExpanded);
  };

  const renderDescription = useCallback(() => {
    if (course.description.length <= maxLength) {
      return <Text style={[styles.description, { color: colors.textSecondary }]}>
        {course.description}
      </Text>;
    }

    if (isExpanded) {
      return (
        <>
          <Text style={[styles.description, { color: colors.textSecondary }]}>
            {course.description}
          </Text>
          <TouchableOpacity style={styles.readMoreButton} onPress={toggleExpand}>
            <Text style={[styles.readMoreText, { 
              color: theme === 'dark' ? Color.ORANGE : Color.PRIMARTY_COLOR 
            }]}>
              {t('Show Less')}
            </Text>
            <Ionicons 
              name="chevron-up" 
              size={16} 
              color={theme === 'dark' ? Color.ORANGE : Color.PRIMARTY_COLOR} 
            />
          </TouchableOpacity>
        </>
      );
    }

    return (
      <>
        <Text style={[styles.description, { color: colors.textSecondary }]}>
          {course.description.slice(0, maxLength)}...
        </Text>
        <TouchableOpacity style={styles.readMoreButton} onPress={toggleExpand}>
          <Text style={[styles.readMoreText, { 
            color: theme === 'dark' ? Color.ORANGE : Color.PRIMARTY_COLOR 
          }]}>
            {t('Read More')}
          </Text>
          <Ionicons 
            name="chevron-down" 
            size={16} 
            color={theme === 'dark' ? Color.ORANGE : Color.PRIMARTY_COLOR} 
          />
        </TouchableOpacity>
      </>
    );
  }, [course.description, isExpanded, maxLength, theme, colors]);

  return (
    <View style={[styles.container, {
      backgroundColor: theme === 'dark' ? 'rgba(255,255,255,0.05)' : '#f8f8f8'
    }]}>
      <Text style={[styles.title, { color: colors.text }]}>{t('Description')}</Text>
      {renderDescription()}
    </View>
  );
};

export default Description;

const styles = StyleSheet.create({
  container: {
    padding: 15,
    borderRadius: 15,
    marginTop: 10,
  },
  title: {
    fontSize: 20,
    fontFamily: 'Poppins-SemiBold',
    marginBottom: 10,
  },
  description: {
    fontSize: 15,
    fontFamily: 'Poppins-Regular',
    lineHeight: 24,
  },
  readMoreButton: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 10,
  },
  readMoreText: {
    fontSize: 15,
    fontFamily: 'Poppins-Regular',
    marginRight: 5,
  },
});
