import { StyleSheet, Text, TouchableOpacity, View } from "react-native";
import React, { useEffect } from "react";
import Ionicons from "@expo/vector-icons/Ionicons";
import { useNavigation, useRoute } from "@react-navigation/native";
import DetailSection from "../components/CourseDetailScreen/DetailSection";
import ChapterSection from "../components/CourseDetailScreen/ChapterSection";

const CourseDetailScreen = () => {
  const navigation = useNavigation();
  const params = useRoute().params;

  useEffect(() => {
    console.log(params.course);
  });

  return (
    params.course && (
      <View style={{ padding: 20 }}>
        <TouchableOpacity onPress={() => navigation.goBack()}>
          <Ionicons name="arrow-back-circle-sharp" size={40} color="black" />
        </TouchableOpacity>
        <DetailSection course={params.course} />
        <ChapterSection />
      </View>
    )
  );
};

export default CourseDetailScreen;

const styles = StyleSheet.create({});
