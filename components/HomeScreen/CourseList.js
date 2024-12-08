import {
  ActivityIndicator,
  FlatList,
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
import { useTheme } from "../../contexts/ThemeContext";

const CourseList = ({ level, searchQuery }) => {
  const { t } = useTranslation();
  const { theme, colors } = useTheme();
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

  const getFilteredCourses = () => {
    if (!searchQuery) return courseList;
    
    return courseList.filter(course => 
      course.name.toLowerCase().includes(searchQuery.toLowerCase())
    );
  };

  const getHeadingColor = () => {
    if (level === "basic" && inProgressCourses.length === 0) {
      return theme === 'dark' ? colors.textLight : Color.TEXT_WHITE;
    }
    return theme === 'dark' ? colors.text : Color.TEXT_BLACK;
  };

  return (
    <View style={{ backgroundColor: 'transparent' }}>
      <SubHeading
        text={getTitle()}
        color={getHeadingColor()}
      />
      {loading ? (
        <ActivityIndicator 
          size="large" 
          color={theme === 'dark' ? Color.ORANGE : Color.PRIMARY_COLOR} 
        />
      ) : (
        <FlatList
          data={getFilteredCourses()}
          keyExtractor={(item) => item.id}
          renderItem={({ item }) => (
            <TouchableOpacity
              onPress={() =>
                navigation.navigate("CourseDetail", {
                  course: item,
                })
              }
            >
              <CourseItem item={item} theme={theme} colors={colors} />
            </TouchableOpacity>
          )}
          horizontal={true}
          showsHorizontalScrollIndicator={false}
          ListEmptyComponent={() => (
            <Text style={[styles.emptyText, { 
              color: theme === 'dark' ? colors.textSecondary : '#333'
            }]}>
              {searchQuery ? t('No matching courses found') : t('No courses available')}
            </Text>
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
    fontFamily: 'Poppins-SemiBold',
    textAlign: 'center',
    marginTop: 20,
  },
});
