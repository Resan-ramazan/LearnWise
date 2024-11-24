import { StyleSheet, Text, View } from "react-native";
import React, { useEffect, useState } from "react";

import { useUser as useClerkUser } from "@clerk/clerk-expo";
import { useUser } from "../contexts/UserContext";
const LeaderBoard = () => {
  const { user: clerkUser } = useClerkUser();
  const { userData, getAllUsersByPoints } = useUser();
  const [leaderboardData, setLeaderboardData] = useState([]);

  const fetchLeaderboardData = async () => {
    try {
      const resp = await getAllUsersByPoints();
      setLeaderboardData(resp);
    } catch (error) {
      console.error("Liderlik tablosu yüklenirken hata:", error);
    }
  };

  useEffect(() => {
    fetchLeaderboardData();
  }, []);

  return (
    <View style={styles.container}>
      <Text style={styles.title}>LeaderBoard</Text>
      {leaderboardData.map((user, index) => (
        <View key={user.id} style={styles.userRow}>
          <Text>{index + 1}.</Text>
          <Text>{user.username}</Text>
          <Text>{user.points} puan</Text>
        </View>
      ))}
    </View>
  );
};

export default LeaderBoard;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
    marginBottom: 20,
  },
  userRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    padding: 10,
    borderBottomWidth: 1,
    borderBottomColor: "#eee",
  },
});
