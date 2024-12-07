import {
  StyleSheet,
  Text,
  View,
  FlatList,
  TouchableOpacity,
  ImageBackground,
  Dimensions,
} from "react-native";
import React, { useState, useEffect } from "react";
import { fetchQuizzes } from "../services/quizService";
import { Image as ExpoImage } from "expo-image";

const { width } = Dimensions.get("window");
const ITEM_WIDTH = width * 0.85;

const Quiz = () => {
  const [quizzes, setQuizzes] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    loadQuizzes();
    console.log("Quizler yüklendi", quizzes);
    console.log("quiz resimleri", quizzes[0].image);
  }, []);

  const loadQuizzes = async () => {
    try {
      setLoading(true);
      const quizData = await fetchQuizzes();
      setQuizzes(quizData);
    } catch (error) {
      console.error("Error loading quizzes:", error);
    } finally {
      setLoading(false);
    }
  };

  const renderQuizItem = ({ item }) => (
    <TouchableOpacity
      style={styles.quizItem}
      onPress={() => {
        /* Quiz'e başlama fonksiyonu gelecek */
      }}
    >
      <ExpoImage
        source={{ uri: item.image }}
        style={styles.quizImage}
        contentFit="cover"
      >
        <View style={styles.overlay}>
          <Text style={styles.quizName}>{item.name}</Text>
          <View style={styles.infoContainer}>
            <View style={styles.infoItem}>
              <Text style={styles.infoText}>
                {item.questions?.length || 0} Question
              </Text>
            </View>
            <View style={styles.infoItem}>
              <Text style={styles.infoText}>{item.estimatedTime} Minutes</Text>
            </View>
          </View>
        </View>
      </ExpoImage>
    </TouchableOpacity>
  );

  if (loading) {
    return (
      <View style={styles.container}>
        <Text>Loading...</Text>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Quizzes</Text>
      <FlatList
        data={quizzes}
        renderItem={renderQuizItem}
        keyExtractor={(item) => item.id}
        showsVerticalScrollIndicator={false}
        contentContainerStyle={styles.listContainer}
      />
    </View>
  );
};

export default Quiz;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#f5f5f5",
  },
  title: {
    fontSize: 28,
    fontWeight: "bold",
    marginVertical: 20,
    marginLeft: 20,
    color: "#333",
  },
  listContainer: {
    padding: 10,
    alignItems: "center",
  },
  quizItem: {
    width: ITEM_WIDTH,
    height: 200,
    marginBottom: 20,
    borderRadius: 15,
    elevation: 5,
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
  },
  quizImage: {
    width: "100%",
    height: "100%",
    justifyContent: "flex-end",
  },
  imageStyle: {
    borderRadius: 15,
  },
  overlay: {
    height: "100%",
    width: "100%",
    backgroundColor: "rgba(0,0,0,0.4)",
    borderRadius: 15,
    padding: 20,
    justifyContent: "flex-end",
  },
  quizName: {
    fontSize: 24,
    fontWeight: "bold",
    color: "#fff",
    marginBottom: 10,
  },
  infoContainer: {
    flexDirection: "row",
    marginTop: 8,
  },
  infoItem: {
    backgroundColor: "rgba(255,255,255,0.2)",
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 20,
    marginRight: 10,
  },
  infoText: {
    color: "#fff",
    fontSize: 14,
  },
});
