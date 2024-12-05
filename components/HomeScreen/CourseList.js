import {
  ActivityIndicator,
  FlatList,
  Image,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import React, { useEffect, useState } from "react";
import { getCourseList, getCoursesByLevel } from "../../services/courses";
import SubHeading from "../SubHeading";
import Color from "../../utils/Color";
import CourseItem from "./CourseItem";
import { useNavigation } from "@react-navigation/native";
import { useCourse } from "../../contexts/CourseContext";
import { useTranslation } from 'react-i18next';

const CourseList = ({ level }) => {
  const { t } = useTranslation();
  const [courseList, setCourseList] = useState([]);
  const [loading, setLoading] = useState(true);
  const navigation = useNavigation();
  const { inProgressCourses } = useCourse();

  useEffect(() => {
    getCourses();
  }, []);

  const getCourses = async () => {
    try {
      const coursesWithChapters = await getCoursesByLevel(level);
      setCourseList(coursesWithChapters);
      setLoading(false);
    } catch (error) {
      console.error("Error:", error);
      setLoading(false);
    }
  };

  const getTitle = () => {
    if (level === "basic") {
      return t("Basic Courses");
    } else if (level === "advanced") {
      return t("Advanced Courses");
    }
    return "";
  };

  return (
    <View>
      <SubHeading
        text={getTitle()}
        color={
          level == "basic" && inProgressCourses.length === 0
            ? Color.TEXT_WHITE
            : Color.TEXT_BLACK
        }
      />
      {loading ? (
        <ActivityIndicator size="large" color={Color.PRIMARY_COLOR} />
      ) : (
        <FlatList
          data={courseList}
          keyExtractor={(item) => item.id}
          renderItem={({ item }) => (
            <TouchableOpacity
              onPress={() =>
                navigation.navigate("CourseDetail", {
                  course: item,
                })
              }
            >
              <CourseItem 
                item={{
                  ...item,
                  chapters: item.chapters.map(chapter => ({
                    ...chapter,
                    title: t('Chapters')  // Chapters kelimesini çeviriyoruz
                  }))
                }} 
              />
            </TouchableOpacity>
          )}
          horizontal={true}
          showsHorizontalScrollIndicator={false}
          ListEmptyComponent={() => (
            <Text style={styles.emptyText}>{t('No courses available')}</Text>
          )}
        />
      )}
    </View>
  );
};

export default CourseList;

const styles = StyleSheet.create({
  emptyText: {
    fontSize: 16,
    fontWeight: 'bold',
    textAlign: 'center',
    marginTop: 20,
  },
});
