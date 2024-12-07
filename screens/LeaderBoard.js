import {
  StyleSheet,
  Text,
  View,
  FlatList,
  Image,
  ActivityIndicator,
  ScrollView,
} from "react-native";
import React, { useEffect, useState, useCallback } from "react";
import Gold from "../assets/images/gold-cup.png";
import Silver from "../assets/images/silver-cup.png";
import Bronze from "../assets/images/bronze-cup.png";
import Ionicons from "@expo/vector-icons/Ionicons";
import { useUser as useClerkUser } from "@clerk/clerk-expo";
import { useUser } from "../contexts/UserContext";
import Color from "../utils/Color";
import { useFocusEffect } from "@react-navigation/native";
import { useTranslation } from "react-i18next";
import { Image as ExpoImage } from "expo-image";
const LeaderBoard = () => {
  const { t } = useTranslation();
  const { user: clerkUser } = useClerkUser();
  const { userData, getAllUsersByPoints } = useUser();
  const [isLoading, setIsLoading] = useState(true);
  const [leaderboardData, setLeaderboardData] = useState([]);

  const fetchLeaderboardData = async () => {
    try {
      const resp = await getAllUsersByPoints();
      resp && setLeaderboardData(resp);
      console.log(resp);
      setIsLoading(false);
    } catch (error) {
      console.error("Error fetching leaderboard data:", error);
    }
  };

  // Ekran her odaklandığında verileri yenile
  useFocusEffect(
    useCallback(() => {
      fetchLeaderboardData();
    }, [])
  );

  const renderItem = ({ item, index }) => {
    return (
      <View style={styles.itemContainer}>
        <View style={styles.userContainer}>
          <Text style={styles.rank}>{index + 1}</Text>
          <ExpoImage
            source={{ uri: item.profileImage }}
            style={styles.profileImage}
            contentFit="cover"
            transition={200}
            cachePolicy="memory-disk"
          />
          <View style={styles.userInfo}>
            <Text style={styles.username}>{item.username}</Text>
            <Text style={styles.points}>
              {item.points} {t("Points")}
            </Text>
          </View>
          {index < 3 && (
            <Image
              source={index === 0 ? Gold : index === 1 ? Silver : Bronze}
              style={styles.cupImage}
            />
          )}
        </View>
      </View>
    );
  };

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <View style={styles.titleContainer}>
          <Ionicons name="trophy" size={32} color="white" style={styles.icon} />
          <Text style={styles.title}>{t("Leaderboard")}</Text>
        </View>
      </View>
      
      {isLoading ? (
        <View style={styles.loadingContainer}>
          <ActivityIndicator size="large" color={Color.PRIMARTY_COLOR} />
          <Text style={styles.loadingText}>{t("Loading...")}</Text>
        </View>
      ) : (
        <FlatList
          data={leaderboardData}
          renderItem={renderItem}
          contentContainerStyle={styles.listContainer}
          ListEmptyComponent={() => (
            <View style={styles.emptyContainer}>
              <Text style={styles.emptyText}>
                {t("No rankings available")}
              </Text>
            </View>
          )}
        />
      )}
    </View>
  );
};

export default LeaderBoard;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  listContainer: {
    paddingBottom: 100,
  },
  loadingContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  header: {
    height: 160,
    backgroundColor: Color.PRIMARTY_COLOR,
    justifyContent: "center",
    alignItems: "center",
    borderBottomLeftRadius: 20,
    borderBottomRightRadius: 20,
    marginBottom: 20,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
    marginLeft: 10,
    marginRight: 10,
  },
  titleContainer: {
    flexDirection: "row",
    alignItems: "center",
    paddingVertical: 16,
    paddingHorizontal: 20,
  },
  icon: {
    marginRight: 12,
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
    color: "#FFFFFF",
    letterSpacing: 0.5,
  },
  itemContainer: {
    paddingHorizontal: 15,
    marginBottom: 10,
  },
  userContainer: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "white",
    padding: 15,
    borderRadius: 12,
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.1,
    shadowRadius: 3,
    elevation: 3,
  },
  userInfo: {
    flex: 1,
    marginLeft: 10,
  },
  rank: {
    fontFamily: "Poppins-Bold",
    fontSize: 20,
    color: Color.TEXT_GRAY,
    width: 30,
  },
  profileImage: {
    width: 50,
    height: 50,
    borderRadius: 25,
    marginLeft: 10,
  },
  username: {
    fontFamily: "Poppins-Medium",
    fontSize: 16,
    color: "#000",
  },
  points: {
    fontFamily: "Poppins-Regular",
    fontSize: 14,
    color: Color.TEXT_GRAY,
    marginTop: 4,
  },
  cupImage: {
    width: 30,
    height: 30,
    marginLeft: "auto",
  },
  loadingText: {
    marginTop: 10,
    fontFamily: "Poppins-Regular",
    color: Color.TEXT_GRAY,
    fontSize: 16,
  },
  emptyContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    paddingTop: 50,
  },
  emptyText: {
    fontFamily: "Poppins-Regular",
    fontSize: 16,
    color: Color.TEXT_GRAY,
    textAlign: "center",
  },
});
