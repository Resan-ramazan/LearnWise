import { StyleSheet, Text, View } from "react-native";
import React from "react";
import Ionicons from "@expo/vector-icons/Ionicons";
import Color from "../../utils/Color";

const Info = ({ icon, value }) => {
  return (
    <View>
      <View style={styles.chapterBox}>
        <Ionicons name={icon} size={18} color={Color.ORANGE} />
        <Text style={styles.text}>{value}</Text>
      </View>
    </View>
  );
};

export default Info;

const styles = StyleSheet.create({
  chapterBox: {
    display: "flex",
    flexDirection: "row",
    alignItems: "center",
    gap: 5,
    marginTop: 5,
  },
  text: {
    fontFamily: "Poppins-Regular",
  },
});
