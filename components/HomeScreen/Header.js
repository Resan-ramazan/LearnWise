import { Image, StyleSheet, Text, TextInput, View } from "react-native";
import React from "react";
import { useUser } from "@clerk/clerk-react";
import Color from "../../utils/Color";
import coin from "../../assets/images/coins.png";
import Ionicons from "@expo/vector-icons/Ionicons";
const Header = () => {
  const { isLoaded, isSignedIn, user } = useUser();
  return (
    isLoaded && (
      <View>
        <View style={[styles.rowStyle, styles.container]}>
          <View style={styles.rowStyle}>
            <Image source={{ uri: user?.imageUrl }} style={styles.image} />
            <View>
              <Text style={styles.text}>Welcome,</Text>
              <Text style={styles.text}>{user?.fullName}</Text>
            </View>
          </View>
          <View style={[styles.rowStyle, styles.coinContainer]}>
            <Image source={coin} style={styles.coin} />
            <Text style={styles.text}>3450</Text>
          </View>
        </View>
        <View style={styles.inputContainer}>
          <TextInput placeholder="Search" />
          <Ionicons name="search" size={24} color="black" />
        </View>
      </View>
    )
  );
};

export default Header;

const styles = StyleSheet.create({
  container: {
    justifyContent: "space-between",
  },
  image: {
    height: 50,
    width: 50,
    borderRadius: 99,
  },
  rowStyle: {
    display: "flex",
    flexDirection: "row",
    alignItems: "center",
    gap: 10,
  },
  text: {
    color: Color.TEXT_WHITE,
    fontFamily: "Poppins-Regular",
    fontSize: 20,
  },
  userName: {
    fontSize: 20,
  },
  coin: {
    height: 35,
    width: 35,
  },
  inputContainer: {
    backgroundColor: Color.TEXT_WHITE,
    padding: 15,
    display: "flex",
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    borderRadius: 10,
    margin: 20,

    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,

    elevation: 5,
  },
  coinContainer: {
    flexDirection: "row",
    alignItems: "center",
    gap: 8,
    backgroundColor: "rgba(255,255,255,0.1)",
    padding: 8,
    borderRadius: 20,
  },
});
