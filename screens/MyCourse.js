import {
  StyleSheet,
  Text,
  View,
  FlatList,
  Image,
  TouchableOpacity,
} from "react-native";
import React, { useState, useCallback } from "react";
import Color from "../utils/Color";
import { useUser } from "@clerk/clerk-expo";
import { useNavigation, useFocusEffect } from "@react-navigation/native";
import { useCourse } from "../contexts/CourseContext";
import { Ionicons } from "@expo/vector-icons";
import * as Progress from "react-native-progress";
import CourseProgItem from "../components/MyCourse/CourseProgItem";
import { LinearGradient } from 'expo-linear-gradient';

const MyCourse = () => {
  const { user } = useUser();
  const navigation = useNavigation();
  const { 
    inProgressCourses = [], 
    completedCourses = [], 
    getInProgressCourses, 
    getCompletedCourses, 
    handleCoursePress 
  } = useCourse();
  const [activeTab, setActiveTab] = useState('inProgress');

  useFocusEffect(
    useCallback(() => {
      const loadCourses = async () => {
        try {
          const email = user?.primaryEmailAddress?.emailAddress;
          if (email) {
            await Promise.all([
              getInProgressCourses(email),
              getCompletedCourses(email)
            ]);
          }
        } catch (error) {
          console.error("Error loading courses:", error);
        }
      };

      loadCourses();
    }, [user])
  );

  const onCoursePress = async (course) => {
    try {
      const courseData = await handleCoursePress(course);
      if (courseData) {
        navigation.navigate("CourseDetail", {
          course: courseData,
        });
      }
    } catch (error) {
      console.error("Error navigating to course:", error);
    }
  };

  const renderCourseItem = ({ item }) => (
    <TouchableOpacity
      onPress={() => onCoursePress(item)}
      style={[
        styles.courseItemContainer,
        activeTab === 'completed' && styles.completedCourseItem
      ]}
    >
      <CourseProgItem 
        item={item} 
        isCompleted={activeTab === 'completed'}
      />
    </TouchableOpacity>
  );

  const currentCourses = activeTab === 'inProgress' ? inProgressCourses : completedCourses;

  const renderEmptyState = () => (
    <View style={styles.emptyContainer}>
      <Ionicons name="book" size={80} color={Color.PRIMARTY_COLOR} />
      <Text style={styles.emptyText}>
        {activeTab === 'inProgress' 
          ? 'No courses in progress' 
          : 'No completed courses'}
      </Text>
    </View>
  );

  return (
    <View style={styles.container}>
      <LinearGradient
        colors={[Color.PRIMARTY_COLOR, '#7c4dff']}
        style={styles.header}
      >
        <View style={styles.titleContainer}>
          <Ionicons name="book" size={32} color="white" style={styles.icon} />
          <Text style={styles.title}>My Learning Journey</Text>
        </View>
        <View style={styles.statsContainer}>
          <Text style={styles.subtitle}>
            {inProgressCourses?.length || 0} In Progress • {completedCourses?.length || 0} Completed
          </Text>
        </View>
      </LinearGradient>

      <View style={styles.contentContainer}>
        <View style={styles.tabContainer}>
          <TouchableOpacity 
            style={[styles.tab, activeTab === 'inProgress' && styles.activeTab]}
            onPress={() => setActiveTab('inProgress')}
          >
            <Text style={[styles.tabText, activeTab === 'inProgress' && styles.activeTabText]}>
              In Progress
            </Text>
          </TouchableOpacity>
          <TouchableOpacity 
            style={[styles.tab, activeTab === 'completed' && styles.activeTab]}
            onPress={() => setActiveTab('completed')}
          >
            <Text style={[styles.tabText, activeTab === 'completed' && styles.activeTabText]}>
              Completed
            </Text>
          </TouchableOpacity>
        </View>

        <FlatList
          data={currentCourses}
          renderItem={renderCourseItem}
          keyExtractor={(item) => item.courseId?.toString() || item.id?.toString()}
          showsVerticalScrollIndicator={false}
          contentContainerStyle={styles.listContent}
          ListEmptyComponent={renderEmptyState}
        />
      </View>
    </View>
  );
};

export default MyCourse;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f5f5f5',
  },
  header: {
    paddingTop: 20,
    paddingBottom: 30,
    borderBottomLeftRadius: 30,
    borderBottomRightRadius: 30,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.2,
    shadowRadius: 8,
    elevation: 7,
  },
  titleContainer: {
    flexDirection: "row",
    alignItems: "center",
    paddingHorizontal: 25,
    marginBottom: 10,
  },
  icon: {
    marginRight: 15,
  },
  title: {
    fontSize: 28,
    fontFamily: 'Poppins-Bold',
    color: "#FFFFFF",
    letterSpacing: 0.5,
  },
  subtitle: {
    fontSize: 16,
    fontFamily: 'Poppins-Regular',
    color: "rgba(255,255,255,0.9)",
    paddingHorizontal: 25,
  },
  contentContainer: {
    flex: 1,
    marginTop: -20,
  },
  tabContainer: {
    flexDirection: 'row',
    marginHorizontal: 20,
    backgroundColor: 'white',
    borderRadius: 25,
    padding: 5,
    marginBottom: 20,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  tab: {
    flex: 1,
    paddingVertical: 10,
    alignItems: 'center',
    borderRadius: 20,
  },
  activeTab: {
    backgroundColor: Color.PRIMARTY_COLOR,
  },
  tabText: {
    fontFamily: 'Poppins-Medium',
    fontSize: 14,
    color: '#666',
  },
  activeTabText: {
    color: 'white',
  },
  listContent: {
    paddingHorizontal: 20,
    paddingBottom: 20,
  },
  courseItemContainer: {
    backgroundColor: '#ffffff',
    borderRadius: 15,
    marginBottom: 15,
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  emptyContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingTop: 50,
  },
  emptyText: {
    marginTop: 20,
    fontSize: 18,
    fontFamily: 'Poppins-Medium',
    color: '#666',
  },
});
