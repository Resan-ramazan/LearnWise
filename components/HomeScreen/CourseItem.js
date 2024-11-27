import { StyleSheet, Text, View } from "react-native";
import React from "react";
import { Image } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import Color from "../../utils/Color";

const CourseItem = ({ item }) => {
  return (
    <View style={styles.courseContainer}>
      <Image source={{ uri: item?.banner }} style={styles.courseImage} />
      <View style={styles.overlay}>
        <Text style={styles.level}>{item.level}</Text>
      </View>
      <View style={styles.content}>
        <Text style={styles.courseName}>{item.name}</Text>
        <View style={styles.detailContainer}>
          <View style={styles.infoItem}>
            <Ionicons name="book" size={16} color={Color.ORANGE} />
            <Text style={styles.infoText}>{item.chapters.length || 0} Chapters</Text>
          </View>
          <View style={styles.infoItem}>
            <Ionicons name="time-outline" size={16} color={Color.ORANGE} />
            <Text style={styles.infoText}>{item.time}</Text>
          </View>
        </View>
        <View style={styles.footer}>
          <Text style={styles.freeText}>Free</Text>
          <View style={styles.ratingContainer}>
            <Ionicons name="star" size={14} color="#FFD700" />
            <Text style={styles.ratingText}>4.5</Text>
          </View>
        </View>
      </View>
    </View>
  );
};

export default CourseItem;

const styles = StyleSheet.create({
  courseContainer: {
    width: 280,
    backgroundColor: '#fff',
    borderRadius: 15,
    marginRight: 15,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 8,
    elevation: 5,
  },
  courseImage: {
    width: '100%',
    height: 160,
    borderTopLeftRadius: 15,
    borderTopRightRadius: 15,
  },
  overlay: {
    position: 'absolute',
    top: 10,
    right: 10,
    backgroundColor: 'rgba(0,0,0,0.5)',
    paddingHorizontal: 12,
    paddingVertical: 4,
    borderRadius: 20,
  },
  level: {
    color: '#fff',
    fontSize: 12,
    fontFamily: 'Poppins-Medium',
  },
  content: {
    padding: 15,
  },
  courseName: {
    fontSize: 16,
    fontFamily: 'Poppins-SemiBold',
    color: '#333',
    marginBottom: 8,
  },
  detailContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 12,
  },
  infoItem: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
  },
  infoText: {
    fontSize: 13,
    fontFamily: 'Poppins-Regular',
    color: '#666',
  },
  footer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginTop: 8,
  },
  freeText: {
    fontSize: 14,
    fontFamily: 'Poppins-Medium',
    color: Color.PRIMARTY_COLOR,
  },
  ratingContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
  },
  ratingText: {
    fontSize: 13,
    fontFamily: 'Poppins-Medium',
    color: '#666',
  },
});
