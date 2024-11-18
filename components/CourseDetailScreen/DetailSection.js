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

const DetailSection = ({ course,enrollCourse }) => {
  return (
    <View
      style={{
        padding: 10,
        borderRadius: 15,
        backgroundColor: Color.TEXT_WHITE,
      }}
    >
      <Image
        source={{ uri: course?.banner }}
        style={{
          width: Dimensions.get("window").width * 0.86,
          height: 190,
          borderRadius: 15,
        }}
      />
      <View style={{ padding: 10 }}>
        <Text
          style={{ fontSize: 24, fontFamily: "Poppins-Medium", marginTop: 10 }}
        >
          {course.name}
        </Text>
        <View>
          <View style={styles.rowStyle}>
            <Info
              icon="book-outline"
              value={course.chapters.length + " Chapters"}
            />
            <Info icon="time-outline" value={course.time} />
          </View>
          <View style={styles.rowStyle}>
            <Info icon="person-circle-outline" value={course.author} />
            <Info icon="cellular-outline" value={course.level} />
          </View>
        </View>

        <Description course={course} />
        <View>
          <TouchableOpacity
          onPress={() => enrollCourse()}
            style={{
              padding: 15,
              backgroundColor: Color.PRIMARTY_COLOR,
              borderRadius: 15,
              marginTop: 10,
            }}
          >
            <Text
              style={{
                textAlign: "center",
                fontFamily: "Poppins-Medium",
                color: Color.TEXT_WHITE,
                fontSize: 16,
              }}
            >
              Enroll For Free
            </Text>
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );
};

export default DetailSection;

const styles = StyleSheet.create({
  rowStyle: {
    display: "flex",
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: 10,
  },
});
