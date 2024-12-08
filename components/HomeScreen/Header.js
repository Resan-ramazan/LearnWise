import {
  Image,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";
import React, { useEffect, useState } from "react";
import { useUser as useClerkUser } from "@clerk/clerk-expo";
import { useUser } from "../../contexts/UserContext";
import Color from "../../utils/Color";
import coin from "../../assets/images/coins.png";
import Ionicons from "@expo/vector-icons/Ionicons";
import { useNavigation } from "@react-navigation/native";
import { useTranslation } from "react-i18next";
import { Image as ExpoImage } from "expo-image";
const Header = ({ userData, onSearch }) => {
  const { user } = useClerkUser();
  const { updateUserProfileImage } = useUser();
  const { t } = useTranslation();
  const [searchQuery, setSearchQuery] = useState("");

  const navigation = useNavigation();

  useEffect(() => {
    if (user?.imageUrl && userData?.profileImage !== user.imageUrl) {
      updateUserProfileImage(user.imageUrl);
    }
  }, []);

  const onProfilePress = () => {
    navigation.navigate("profile");
  };

  const handleSearch = (text) => {
    setSearchQuery(text);
    onSearch(text);
  };

  return (
    <View>
      <View style={[styles.rowStyle, styles.container]}>
        <View style={styles.rowStyle}>
          <TouchableOpacity onPress={onProfilePress}>
            <ExpoImage
              source={{ uri: user?.imageUrl }}
              style={styles.image}
              contentFit="cover"
              transition={200}
              cachePolicy="memory-disk"
            />
          </TouchableOpacity>
          <View>
            <Text style={styles.text}>{t("Hello")},</Text>
            <Text style={styles.text}>{userData.username}</Text>
          </View>
        </View>
        <View style={[styles.rowStyle, styles.coinContainer]}>
          <Image source={coin} style={styles.coin} />
          <Text style={styles.text}>{userData.points}</Text>
        </View>
      </View>
      <View style={styles.inputContainer}>
        <TextInput
          placeholder={t("Search")}
          value={searchQuery}
          onChangeText={handleSearch}
          style={styles.input}
        />
        <View style={styles.searchIcon}>
          <Ionicons name="search" size={24} color="white" />
        </View>
      </View>
    </View>
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
  searchIcon: {
    backgroundColor: Color.ORANGE,
    borderRadius: 20,
    padding: 10,
  },
  input: {
    flex: 1,
    fontFamily: "Poppins-Regular",
  },
});
