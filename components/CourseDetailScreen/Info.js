import { StyleSheet, Text, View } from "react-native";
import React from "react";
import Ionicons from "@expo/vector-icons/Ionicons";
import Color from "../../utils/Color";

const Info = ({ icon, value }) => {
  return (
    <View style={styles.container}>
      <View style={styles.iconContainer}>
        <Ionicons name={icon} size={20} color={Color.ORANGE} />
      </View>
      <Text style={styles.text}>{value}</Text>
    </View>
  );
};

export default Info;

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#f8f8f8",
    padding: 10,
    borderRadius: 10,
    marginVertical: 5,
    width: "49%",
  },
  iconContainer: {
    backgroundColor: "#fff",
    padding: 8,
    borderRadius: 8,
    marginRight: 7,
  },
  text: {
    fontFamily: "Poppins-Medium",
    fontSize: 14,
    color: "#333",
  },
});
