import { StyleSheet, Text, View, TouchableOpacity } from "react-native";
import React, { useState, useCallback } from "react";
import Color from "../../utils/Color";
import { Ionicons } from "@expo/vector-icons";

const Description = ({ course }) => {
  const [isExpanded, setIsExpanded] = useState(false);
  const maxLength = 150; // Maksimum karakter sayısı

  const toggleExpand = () => {
    setIsExpanded(!isExpanded);
  };

  const renderDescription = useCallback(() => {
    if (course.description.length <= maxLength) {
      return <Text style={styles.description}>{course.description}</Text>;
    }

    if (isExpanded) {
      return (
        <>
          <Text style={styles.description}>{course.description}</Text>
          <TouchableOpacity 
            style={styles.readMoreButton} 
            onPress={toggleExpand}
          >
            <Text style={styles.readMoreText}>Show Less</Text>
            <Ionicons name="chevron-up" size={16} color={Color.PRIMARTY_COLOR} />
          </TouchableOpacity>
        </>
      );
    }

    return (
      <>
        <Text style={styles.description}>{course.description.slice(0, maxLength)}...</Text>
        <TouchableOpacity 
          style={styles.readMoreButton} 
          onPress={toggleExpand}
        >
          <Text style={styles.readMoreText}>Read More</Text>
          <Ionicons name="chevron-down" size={16} color={Color.PRIMARTY_COLOR} />
        </TouchableOpacity>
      </>
    );
  }, [course.description, isExpanded, maxLength]);

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Description</Text>
      {renderDescription()}
    </View>
  );
};

export default Description;

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#f8f8f8',
    padding: 15,
    borderRadius: 15,
    marginTop: 10,
  },
  title: {
    fontSize: 20,
    fontFamily: 'Poppins-SemiBold',
    color: '#333',
    marginBottom: 10,
  },
  description: {
    fontSize: 15,
    fontFamily: 'Poppins-Regular',
    color: '#666',
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
    color: Color.PRIMARTY_COLOR,
    marginRight: 5,
  },
});
