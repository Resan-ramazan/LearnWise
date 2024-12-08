import {
  StyleSheet,
  Text,
  View,
  FlatList,
  TouchableOpacity,
  ImageBackground,
  Dimensions,
  ScrollView,
} from "react-native";
import React, { useState, useEffect } from "react";
import { fetchQuizzes } from "../services/quizService";
import { Image as ExpoImage } from "expo-image";
import { useNavigation } from "@react-navigation/native";
import Color from "../utils/Color";
import { LinearGradient } from "expo-linear-gradient";
import { Ionicons } from "@expo/vector-icons";
const { width } = Dimensions.get("window");
const ITEM_WIDTH = width * 0.85;

const Quiz = () => {
  const [quizzes, setQuizzes] = useState([]);
  const [loading, setLoading] = useState(true);

  const navigation = useNavigation();

  const handleQuizStart = (quiz) => {
    navigation.navigate("QuizQuestions", { quiz });
  };

  useEffect(() => {
    loadQuizzes();
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

  if (loading) {
    return (
      <View style={styles.container}>
        <Text>Loading...</Text>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <LinearGradient
        colors={[Color.PRIMARTY_COLOR, "#7c4dff"]}
        style={styles.header}
      >
        <View style={styles.titleContainer}>
          <Ionicons name="school" size={35} color="#fff" style={styles.titleIcon} />
          <Text style={styles.title}>Fun Quiz Time!</Text>
        </View>
        <Text style={styles.subtitle}>Let's test your knowledge! 🚀</Text>
      </LinearGradient>
      
      <View style={styles.listWrapper}>
        <FlatList
          data={quizzes}
          renderItem={renderQuizItem}
          keyExtractor={(item) => item.id}
          showsVerticalScrollIndicator={false}
          contentContainerStyle={styles.listContainer}
          ListHeaderComponent={<View style={{ height: 20 }} />}
          ListFooterComponent={<View style={{ height: 20 }} />}
        />
      </View>
    </View>
  );
};

const renderQuizItem = ({ item }) => (
  <TouchableOpacity 
    style={styles.quizItem}
    onPress={() => handleQuizStart(item)}
  >
    <View style={styles.imageContainer}>
      <ExpoImage
        source={{ uri: item.image }}
        style={styles.quizImage}
        contentFit="cover"
      />
      <LinearGradient
        colors={['transparent', 'rgba(0,0,0,0.8)', 'rgba(0,0,0,0.9)']}
        style={styles.overlay}
      >
        <View style={styles.quizContent}>
          <Text style={styles.quizName}>{item.name}</Text>
          <View style={styles.infoContainer}>
            <View style={styles.infoItem}>
              <Ionicons name="help-circle" size={20} color="#fff" />
              <Text style={styles.infoText}>
                {item.questions?.length || 0} Questions
              </Text>
            </View>
            <View style={styles.infoItem}>
              <Ionicons name="time" size={20} color="#fff" />
              <Text style={styles.infoText}>
                {item.estimatedTime} mins
              </Text>
            </View>
          </View>
        </View>
      </LinearGradient>
    </View>
  </TouchableOpacity>
);

export default Quiz;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#f0f2f5",
  },
  header: {
    height: 180,
    paddingTop: 40,
    paddingHorizontal: 20,
    borderBottomLeftRadius: 30,
    borderBottomRightRadius: 30,
  },
  titleContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 8,
  },
  titleIcon: {
    marginRight: 10,
  },
  title: {
    fontSize: 32,
    color: "#fff",
    fontFamily: "Poppins-Bold",
  },
  subtitle: {
    fontSize: 16,
    color: "rgba(255,255,255,0.9)",
    fontFamily: "Poppins-Medium",
    marginLeft: 45,
  },
  listWrapper: {
    flex: 1,
    marginTop: -40,
    paddingHorizontal: 15,
  },
  listContainer: {
    paddingHorizontal: 5,
  },
  quizItem: {
    width: '100%',
    height: 200,
    marginBottom: 20,
    borderRadius: 20,
    elevation: 8,
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 4,
    },
    shadowOpacity: 0.3,
    shadowRadius: 4.65,
    backgroundColor: '#fff',
  },
  imageContainer: {
    width: '100%',
    height: '100%',
    borderRadius: 20,
    overflow: 'hidden',
  },
  quizImage: {
    width: '100%',
    height: '100%',
  },
  overlay: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    height: '100%',
    padding: 20,
    justifyContent: 'flex-end',
    borderRadius: 20,
  },
  quizContent: {
    gap: 10,
  },
  quizName: {
    fontSize: 24,
    color: '#fff',
    fontFamily: "Poppins-SemiBold",
    textShadowColor: 'rgba(0, 0, 0, 0.75)',
    textShadowOffset: { width: -1, height: 1 },
    textShadowRadius: 10,
  },
  infoContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
  },
  infoItem: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: 'rgba(255,255,255,0.2)',
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 25,
    gap: 6,
  },
  infoText: {
    color: '#fff',
    fontSize: 14,
    fontFamily: "Poppins-Medium",
    textShadowColor: 'rgba(0, 0, 0, 0.75)',
    textShadowOffset: { width: -1, height: 1 },
    textShadowRadius: 5,
  },
});
