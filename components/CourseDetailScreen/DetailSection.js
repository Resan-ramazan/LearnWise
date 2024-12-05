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
import { useTranslation } from 'react-i18next';

const DetailSection = ({ course, enrollCourse, userEnrolledCourses }) => {
  const { t } = useTranslation();

  return (
    <View style={styles.container}>
      <Image source={{ uri: course?.banner }} style={styles.bannerImage} />
      <View style={styles.contentWrapper}>
        <Text style={styles.courseTitle}>{course.name}</Text>
        <View>
          <View style={styles.rowStyle}>
            <Info
              icon="book-outline"
              value={`${course.chapters.length} ${t('Chapters')}`}
            />
            <Info icon="time-outline" value={course.time} />
          </View>
          <View style={styles.rowStyle}>
            <Info icon="person-circle-outline" value={course.author} />
            <Info icon="cellular-outline" value={t(course.level)} />
          </View>
        </View>

        <Description course={course} />
        <View>
          {userEnrolledCourses == 0 ? (
            <TouchableOpacity
              onPress={() => enrollCourse()}
              style={styles.enrollButton}
            >
              <Text style={styles.buttonText}>{t('Enroll For Free')}</Text>
            </TouchableOpacity>
          ) : (
            <View style={styles.continueButton}>
              <Text style={styles.buttonText}>{t('Continue Learning')}</Text>
            </View>
          )}
        </View>
      </View>
    </View>
  );
};

export default DetailSection;

const styles = StyleSheet.create({
  container: {
    padding: 10,
    borderRadius: 15,
    backgroundColor: Color.TEXT_WHITE,
  },
  bannerImage: {
    width: "100%",
    height: 190,
    borderRadius: 15,
  },
  contentWrapper: {
    padding: 10,
  },
  courseTitle: {
    fontSize: 24,
    fontFamily: "Poppins-Medium",
    marginTop: 10,
  },
  rowStyle: {
    display: "flex",
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: 10,
  },
  enrollButton: {
    backgroundColor: Color.PRIMARTY_COLOR,
    borderRadius: 12,
    padding: 16,
    marginTop: 20,
    shadowColor: Color.PRIMARTY_COLOR,
    shadowOffset: {
      width: 0,
      height: 4,
    },
    shadowOpacity: 0.3,
    shadowRadius: 8,
    elevation: 5,
  },
  continueButton: {
    padding: 15,
    backgroundColor: Color.ORANGE,
    borderRadius: 15,
    marginTop: 10,
  },
  buttonText: {
    textAlign: "center",
    fontFamily: "Poppins-Medium",
    color: Color.TEXT_WHITE,
    fontSize: 16,
  },
});
