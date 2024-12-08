import {
  StyleSheet,
  Text,
  View,
  FlatList,
  TouchableOpacity,
  ActivityIndicator,
} from "react-native";
import React, { useState, useCallback } from "react";
import Color from "../../utils/Color";
import { useUser } from "@clerk/clerk-expo";
import { useNavigation, useFocusEffect } from "@react-navigation/native";
import * as Progress from "react-native-progress";
import { useCourse } from "../../contexts/CourseContext";
import { Ionicons } from "@expo/vector-icons";
import { Image } from "react-native";
import { LinearGradient } from "expo-linear-gradient";
import { useTranslation } from "react-i18next";
import { Image as ExpoImage } from "expo-image";
const CourseProgress = () => {
  const { t } = useTranslation();
  const { user } = useUser();
  const navigation = useNavigation();
  const [isLoading, setIsLoading] = useState(true);
  const { inProgressCourses, getInProgressCourses, handleCoursePress } =
    useCourse();

  useFocusEffect(
    useCallback(() => {
      const loadCourses = async () => {
        try {
          setIsLoading(true);
          const email = user?.primaryEmailAddress?.emailAddress;
          if (email) {
            await getInProgressCourses(email);
          }
        } catch (error) {
          console.error("Error loading courses:", error);
        } finally {
          setIsLoading(false);
        }
      };

      loadCourses();
    }, [user])
  );

  if (isLoading) {
    return (
      <View style={styles.container}>
        <Text style={styles.sectionTitle}>{t("Continue Learning")}</Text>
        <View style={[styles.courseContainer, styles.loadingContainer]}>
          <ActivityIndicator size="large" color={Color.ORANGE} />
        </View>
      </View>
    );
  }

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
    <View>
      <TouchableOpacity
        onPress={() => onCoursePress(item)}
        style={styles.courseContainer}
        activeOpacity={0.7}
      >
        <ExpoImage
          source={{ uri: item?.banner }}
          style={styles.courseImage}
          contentFit="cover"
          transition={200}
          cachePolicy="memory-disk"
        />
        <LinearGradient
          colors={["transparent", "rgba(0,0,0,0.8)"]}
          style={styles.gradient}
        >
          <Text style={styles.courseName}>{item.name}</Text>
          <View style={styles.progressInfo}>
            <Text style={styles.progressText}>
              {item.completedChapters}/{item.totalChapters} {t("Chapters")}
            </Text>
            <Text style={styles.progressPercent}>
              {Math.round(item.progressPercentage)}%
            </Text>
          </View>
          <Progress.Bar
            progress={item.progressPercentage / 100}
            width={null}
            height={4}
            color={Color.ORANGE}
            unfilledColor="rgba(255,255,255,0.3)"
            borderWidth={0}
            style={styles.progressBar}
          />
        </LinearGradient>
      </TouchableOpacity>
    </View>
  );

  if (inProgressCourses.length === 0) return null;

  return (
    <View style={styles.container}>
      <Text style={styles.sectionTitle}>{t("Continue Learning")}</Text>
      <FlatList
        data={inProgressCourses}
        renderItem={renderCourseItem}
        keyExtractor={(item) => item.id}
        horizontal
        showsHorizontalScrollIndicator={false}
        contentContainerStyle={styles.listContainer}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    marginBottom: 25,
  },
  sectionTitle: {
    fontSize: 24,
    fontFamily: "Poppins-Bold",
    color: "#fff",
    marginBottom: 15,
    marginLeft: 10,
  },
  courseContainer: {
    width: 300,
    height: 180,
    marginRight: 15,
    borderRadius: 15,
    overflow: "hidden",
    backgroundColor: "#fff",
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.15,
    shadowRadius: 8,
    elevation: 5,
  },
  courseImage: {
    width: "100%",
    height: "100%",
  },
  gradient: {
    position: "absolute",
    bottom: 0,
    left: 0,
    right: 0,
    height: "60%",
    padding: 15,
    justifyContent: "flex-end",
  },
  courseName: {
    fontSize: 16,
    fontFamily: "Poppins-SemiBold",
    color: "#fff",
    marginBottom: 8,
  },
  progressInfo: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 8,
  },
  progressText: {
    fontSize: 13,
    fontFamily: "Poppins-Medium",
    color: "#fff",
  },
  progressPercent: {
    fontSize: 14,
    fontFamily: "Poppins-Bold",
    color: Color.ORANGE,
  },
  progressBar: {
    marginTop: 5,
  },
  listContainer: {
    paddingLeft: 5,
    paddingRight: 5,
  },
  loadingContainer: {
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(255,255,255,0.1)',
  },
});

export default CourseProgress;
