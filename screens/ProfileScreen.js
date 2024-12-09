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
  ScrollView,
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
import { useTranslation } from "react-i18next";
import "../i18n";
import { useTheme } from "../contexts/ThemeContext";

const ProfileScreen = () => {
  const { userData } = useUser();
  const { signOut } = useAuth(); // Clerk'ten signOut'u import ediyoruz
  const [showLanguageModal, setShowLanguageModal] = useState(false);
  const navigation = useNavigation();
  const { t, i18n } = useTranslation();
  const { theme, toggleTheme, colors } = useTheme();

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
    { code: "pl", name: "Polski", flag: "🇵🇱" },
  ];

  const menuItems = [
    {
      icon: "book-outline",
      label: t("My Courses"),
      color: "#4CAF50",
      onPress: () => navigation.navigate("mycourse"),
    },

    {
      icon: "trophy-outline",
      label: t("Ranking"),
      color: "#FFC107",
      onPress: () => navigation.navigate("leaderboard"),
    },
    {
      icon: "language-outline",
      label: t("Change Language"),
      color: "#9C27B0",
      onPress: () => setShowLanguageModal(true),
    },
    {
      icon: theme === "dark" ? "sunny" : "moon",
      label: theme === "dark" ? t("Light Mode") : t("Dark Mode"),
      color: "#2196F3",
      onPress: toggleTheme,
      rightElement: (
        <View style={styles.themeToggle}>
          <Ionicons
            name={theme === "dark" ? "sunny" : "moon"}
            size={22}
            color={theme === "dark" ? "#2196F3" : "#999"}
          />
        </View>
      ),
    },
    {
      icon: "log-out-outline",
      label: t("Logout"),
      color: "#FF5252",
      onPress: handleSignOut,
    },
  ];

  const handleLanguageSelect = (langCode) => {
    i18n.changeLanguage(langCode);
    setShowLanguageModal(false);
  };

  return (
    <ScrollView
      style={[styles.container, { backgroundColor: colors.background }]}
      showsVerticalScrollIndicator={false}
      contentContainerStyle={{ paddingBottom: 100 }}
    >
      <LinearGradient
        colors={
          theme === "dark"
            ? [colors.primary, "#4a2e9b"] // Koyu tema için daha koyu renkler
            : [Color.PRIMARTY_COLOR, "#7c4dff"]
        } // Açık tema için mevcut renkler
        style={styles.header}
      >
        <Image
          source={{ uri: userData?.profileImage }}
          style={[
            styles.profileImage,
            {
              borderColor: theme === "dark" ? colors.border : "white",
            },
          ]}
        />
        <Text style={[styles.name]}>{userData?.username}</Text>
        <View
          style={[
            styles.pointsBox,
            {
              backgroundColor:
                theme === "dark" ? "rgba(0,0,0,0.2)" : "rgba(255,255,255,0.2)",
            },
          ]}
        >
          <Image source={coin} style={styles.coinIcon} />
          <Text style={[styles.points]}>
            {userData?.points} {t("Points")}
          </Text>
        </View>
      </LinearGradient>

      <View
        style={[
          styles.menuContainer,
          {
            backgroundColor: colors.surface,
            shadowColor: colors.shadowColor,
          },
        ]}
      >
        {menuItems.map((item, index) => (
          <TouchableOpacity
            key={index}
            style={[styles.menuItem, { borderBottomColor: colors.border }]}
            activeOpacity={0.7}
            onPress={item.onPress}
          >
            <View style={[styles.iconBox, { backgroundColor: item.color }]}>
              <Ionicons name={item.icon} size={22} color="white" />
            </View>
            <Text style={[styles.menuText, { color: colors.text }]}>
              {item.label}
            </Text>
            {item.rightElement && (
              <View style={styles.themeToggle}>{item.rightElement}</View>
            )}
            <Ionicons
              name="chevron-forward"
              size={20}
              color={colors.textSecondary}
            />
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
          <View
            style={[
              styles.modalContent,
              {
                backgroundColor: colors.modalBackground,
              },
            ]}
          >
            <View
              style={[
                styles.modalHeader,
                {
                  borderBottomColor: colors.border,
                },
              ]}
            >
              <Text style={[styles.modalTitle, { color: colors.text }]}>
                {t("Select Language")}
              </Text>
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
                <Text
                  style={[
                    styles.languageFlag,
                    {
                      color: colors.text,
                    },
                  ]}
                >
                  {lang.flag}
                </Text>
                <Text
                  style={[
                    styles.languageName,
                    {
                      color: colors.text,
                    },
                  ]}
                >
                  {lang.name}
                </Text>
              </TouchableOpacity>
            ))}
          </View>
        </View>
      </Modal>
    </ScrollView>
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
  themeToggle: {
    marginRight: 10,
  },
});
