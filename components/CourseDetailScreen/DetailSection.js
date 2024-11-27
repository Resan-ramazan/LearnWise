import {
  Dimensions,
  Image,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import React from "react";
import Color from "../../utils/Color";
import Info from "./Info";
import Description from "./Description";
import { LinearGradient } from "expo-linear-gradient";

const DetailSection = ({ course, enrollCourse, userEnrolledCourses }) => {
  return (
    <View style={styles.container}>
      <Image
        source={{ uri: course?.banner }}
        style={styles.banner}
      />
      <LinearGradient
        colors={['transparent', 'rgba(0,0,0,0.8)']}
        style={styles.gradient}
      >
        <Text style={styles.courseTitle}>{course.name}</Text>
      </LinearGradient>

      <View style={styles.content}>
        <View style={styles.infoContainer}>
          <Info icon="book-outline" value={`${course.chapters.length} Chapters`} />
          <Info icon="time-outline" value={course.time} />
          <Info icon="person-circle-outline" value={course.author} />
          <Info icon="cellular-outline" value={course.level} />
        </View>

        <Description course={course} />

        <TouchableOpacity
          onPress={() => enrollCourse()}
          style={[
            styles.button,
            userEnrolledCourses == 0 
              ? styles.enrollButton 
              : styles.continueButton
          ]}
        >
          <Text style={styles.buttonText}>
            {userEnrolledCourses == 0 ? 'Enroll For Free' : 'Continue Learning'}
          </Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default DetailSection;

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#fff',
    borderRadius: 20,
    overflow: 'hidden',
    marginBottom: 20,
  },
  banner: {
    width: '100%',
    height: 220,
  },
  gradient: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    height: '50%',
    justifyContent: 'flex-end',
    padding: 20,
  },
  courseTitle: {
    fontSize: 24,
    fontFamily: 'Poppins-Bold',
    color: '#fff',
    textShadowColor: 'rgba(0, 0, 0, 0.75)',
    textShadowOffset: {width: -1, height: 1},
    textShadowRadius: 10
  },
  content: {
    padding: 20,
  },
  infoContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
    marginBottom: 20,
  },
  button: {
    padding: 15,
    borderRadius: 12,
    marginTop: 20,
  },
  enrollButton: {
    backgroundColor: Color.PRIMARTY_COLOR,
  },
  continueButton: {
    backgroundColor: Color.ORANGE,
  },
  buttonText: {
    textAlign: 'center',
    fontFamily: 'Poppins-Medium',
    color: '#fff',
    fontSize: 16,
  },
});
