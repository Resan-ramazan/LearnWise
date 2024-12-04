import {
  Image,
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  Alert,
  Platform,
  BackHandler,
  Modal,
} from "react-native";
import React, { useEffect, useState } from "react";
import { Ionicons } from "@expo/vector-icons";
import Color from "../utils/Color";
import { useUser as useClerkUser } from "@clerk/clerk-expo";
import { useAuth } from "@clerk/clerk-expo";
import { useUser } from "../contexts/UserContext";
import coin from "../assets/images/coins.png";
import { LinearGradient } from "expo-linear-gradient";
import { useNavigation } from "@react-navigation/native";

const ProfileScreen = () => {
  const { userData } = useUser();
  const { signOut } = useAuth(); // Clerk'ten signOut'u import ediyoruz
  const [showLanguageModal, setShowLanguageModal] = useState(false);
  const navigation = useNavigation();

  const handleSignOut = () => {
    Alert.alert(
      "Sign Out",
      "Are you sure you want to sign out?",
      [
        {
          text: "Cancel",
          style: "cancel",
        },
        {
          text: "Sign Out",
          style: "destructive",
          onPress: async () => {
            try {
              await signOut();
              if (Platform.OS === "android") {
                BackHandler.exitApp();
              }
            } catch (error) {
              console.error("Error signing out:", error);
              Alert.alert("Error", "Could not sign out. Please try again.");
            }
          },
        },
      ],
      { cancelable: true }
    );
  };

  const languages = [
    { code: "en", name: "English", flag: "🇺🇸" },
    { code: "tr", name: "Türkçe", flag: "🇹🇷" },
    
  ];

  const menuItems = [
    {
      icon: "book-outline",
      label: "My Courses",
      color: "#4CAF50",
      onPress: () => navigation.navigate("mycourse"),
    },
    {
      icon: "diamond-outline",
      label: "Premium",
      color: "#2196F3",
      onPress: () => navigation.navigate("premium"),
    },
    {
      icon: "trophy-outline",
      label: "Ranking",
      color: "#FFC107",
      onPress: () => navigation.navigate("leaderboard"),
    },
    {
      icon: "language-outline",
      label: "Change Language",
      color: "#9C27B0",
      onPress: () => setShowLanguageModal(true),
    },
    {
      icon: "log-out-outline",
      label: "Logout",
      color: "#FF5252",
      onPress: handleSignOut,
    },
  ];

  const handleLanguageSelect = (langCode) => {
    // Burada dil değiştirme işlemini yapacak fonksiyonu çağırın

    setShowLanguageModal(false);
  };

  return (
    <View style={styles.container}>
      <LinearGradient
        colors={[Color.PRIMARTY_COLOR, "#7c4dff"]}
        style={styles.header}
      >
        <Image
          source={{ uri: userData?.profileImage }}
          style={styles.profileImage}
        />
        <Text style={styles.name}>{userData?.username}</Text>
        <View style={styles.pointsBox}>
          <Image source={coin} style={styles.coinIcon} />
          <Text style={styles.points}>{userData?.points} Points</Text>
        </View>
      </LinearGradient>

      <View style={styles.menuContainer}>
        {menuItems.map((item, index) => (
          <TouchableOpacity
            key={index}
            style={styles.menuItem}
            activeOpacity={0.7}
            onPress={item.onPress}
          >
            <View style={[styles.iconBox, { backgroundColor: item.color }]}>
              <Ionicons name={item.icon} size={22} color="white" />
            </View>
            <Text style={styles.menuText}>{item.label}</Text>
            <Ionicons name="chevron-forward" size={20} color="#999" />
          </TouchableOpacity>
        ))}
      </View>

      {/* Language Modal */}
      <Modal
        visible={showLanguageModal}
        transparent={true}
        animationType="slide"
        onRequestClose={() => setShowLanguageModal(false)}
      >
        <View style={styles.modalOverlay}>
          <View style={styles.modalContent}>
            <View style={styles.modalHeader}>
              <Text style={styles.modalTitle}>Select Language</Text>
              <TouchableOpacity
                onPress={() => setShowLanguageModal(false)}
                style={styles.closeButton}
              >
                <Ionicons name="close" size={24} color="#333" />
              </TouchableOpacity>
            </View>

            {languages.map((lang) => (
              <TouchableOpacity
                key={lang.code}
                style={styles.languageItem}
                onPress={() => handleLanguageSelect(lang.code)}
              >
                <Text style={styles.languageFlag}>{lang.flag}</Text>
                <Text style={styles.languageName}>{lang.name}</Text>
              </TouchableOpacity>
            ))}
          </View>
        </View>
      </Modal>
    </View>
  );
};

export default ProfileScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#f5f5f5",
  },
  header: {
    height: 260,
    alignItems: "center",
    justifyContent: "center",
    borderBottomLeftRadius: 25,
    borderBottomRightRadius: 25,
  },
  profileImage: {
    width: 100,
    height: 100,
    borderRadius: 50,
    borderWidth: 3,
    borderColor: "white",
  },
  name: {
    fontSize: 24,
    color: "white",
    fontFamily: "Poppins-Bold",
    marginTop: 12,
  },
  pointsBox: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "rgba(255,255,255,0.2)",
    paddingHorizontal: 16,
    paddingVertical: 8,
    borderRadius: 20,
    marginTop: 10,
  },
  coinIcon: {
    width: 24,
    height: 24,
  },
  points: {
    fontSize: 18,
    fontFamily: "Poppins-Medium",
    color: "white",
    marginLeft: 8,
  },
  menuContainer: {
    padding: 20,
    marginTop: -30,
    backgroundColor: "white",
    marginHorizontal: 20,
    borderRadius: 15,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 8,
    elevation: 5,
  },
  menuItem: {
    flexDirection: "row",
    alignItems: "center",
    paddingVertical: 15,
    borderBottomWidth: 1,
    borderBottomColor: "#f0f0f0",
  },
  iconBox: {
    width: 40,
    height: 40,
    borderRadius: 10,
    justifyContent: "center",
    alignItems: "center",
    marginRight: 15,
  },
  menuText: {
    flex: 1,
    fontSize: 16,
    fontFamily: "Poppins-Medium",
    color: "#333",
  },
  modalOverlay: {
    flex: 1,
    backgroundColor: "rgba(0,0,0,0.5)",
    justifyContent: "flex-end",
  },
  modalContent: {
    backgroundColor: "white",
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
    padding: 20,
    maxHeight: "70%",
  },
  modalHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 20,
    paddingBottom: 15,
    borderBottomWidth: 1,
    borderBottomColor: "#eee",
  },
  modalTitle: {
    fontSize: 18,
    fontFamily: "Poppins-Medium",
    color: "#333",
  },
  closeButton: {
    padding: 5,
  },
  languageItem: {
    flexDirection: "row",
    alignItems: "center",
    paddingVertical: 15,
    borderBottomWidth: 1,
    borderBottomColor: "#f0f0f0",
  },
  languageFlag: {
    fontSize: 24,
    marginRight: 15,
  },
  languageName: {
    fontSize: 16,
    fontFamily: "Poppins-Regular",
    color: "#333",
  },
});
