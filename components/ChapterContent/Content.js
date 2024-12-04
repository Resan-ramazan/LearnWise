import {
  Dimensions,
  FlatList,
  Platform,
  StyleSheet,
  Text,
  View,
} from "react-native";
import React, { useState, useEffect } from "react";
import ProgressBar from "./ProgressBar";
import ContenItem from "./ContenItem";
import { ScrollView, TouchableOpacity } from "react-native-gesture-handler";
import { useNavigation } from "@react-navigation/native";
import { updateUserProgress } from "../../services/courses";
import { ToastAndroid } from "react-native";
import Color from "../../utils/Color";

const Content = ({
  chaptersLength,
  content,
  onChapterComplete,
  initialIndex,
  courseId,
  userEmail,
}) => {
  const flatListRef = React.useRef(null);
  const [activeIndex, setActiveIndex] = useState(initialIndex || 0);

  useEffect(() => {
    if (flatListRef && content?.startIndex) {
      setTimeout(() => {
        flatListRef.current?.scrollToIndex({
          index: content.startIndex,
          animated: false,
        });
      }, 100);
    }
  }, []);

  const onSaveProgress = async (index) => {
    const currentChapter = chaptersLength[index];

    console.log("Saving progress with:", {
      courseId,
      userEmail,
      chapterId: currentChapter?.id,
      index,
    });

    if (!courseId || !userEmail || !currentChapter?.id) {
      console.error("Missing required values:", {
        courseId,
        userEmail,
        chapterId: currentChapter?.id,
      });
      if (Platform.OS === "android") {
        ToastAndroid.show("Error: Missing required data", ToastAndroid.SHORT);
      } else {
        alert("Error: Missing required data");
      }

      return;
    }

    try {
      await updateUserProgress(courseId, userEmail, currentChapter.id, index);
      if (Platform.OS === "android") {
        ToastAndroid.show("Progress saved!", ToastAndroid.SHORT);
      } else {
        alert("Progress saved!");
      }

      setActiveIndex(index + 1);
      if (flatListRef.current) {
        flatListRef.current.scrollToIndex({
          index: index + 1,
          animated: true,
        });
      }
    } catch (error) {
      console.error("Error saving progress:", error);
      ToastAndroid.show("Error saving progress", ToastAndroid.SHORT);
    }
  };

  const onFlatListScroll = (event) => {
    const contentOffset = event.nativeEvent.contentOffset.x;
    const index = Math.round(contentOffset / Dimensions.get("screen").width);
    setActiveIndex(index);
  };

  const renderContentItem = ({ item, index }) => {
    return (
      <View style={styles.contentContainer}>
        <ScrollView
          style={styles.scrollView}
          showsVerticalScrollIndicator={false}
        >
          <Text style={styles.heading}>{item.heading}</Text>
          <ContenItem description={item.description} output={item.output} />

          <TouchableOpacity
            style={[
              styles.buttonContainer,
              index === chaptersLength.length - 1 && styles.finishButton,
            ]}
            onPress={() => {
              if (index === chaptersLength.length - 1) {
                onChapterComplete();
              } else {
                onSaveProgress(index);
              }
            }}
          >
            <Text style={styles.buttonText}>
              {index === chaptersLength.length - 1
                ? "Finish Chapter"
                : "Save & Continue"}
            </Text>
          </TouchableOpacity>
        </ScrollView>
      </View>
    );
  };

  return (
    <View style={styles.container}>
      <ProgressBar
        chaptersLength={chaptersLength.length}
        contentIndex={activeIndex}
      />
      <FlatList
        data={chaptersLength}
        horizontal={true}
        pagingEnabled={true}
        showsHorizontalScrollIndicator={false}
        renderItem={renderContentItem}
        ref={flatListRef}
        keyExtractor={(item) => item.id}
        onScroll={onFlatListScroll}
        getItemLayout={(data, index) => ({
          length: Dimensions.get("screen").width,
          offset: Dimensions.get("screen").width * index,
          index,
        })}
        initialScrollIndex={initialIndex}
        initialNumToRender={chaptersLength.length}
      />
    </View>
  );
};

export default Content;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
  },
  contentContainer: {
    width: Dimensions.get("screen").width,
    paddingBottom: 100,
  },
  scrollView: {
    padding: 20,
  },
  heading: {
    fontFamily: "Poppins-SemiBold",
    fontSize: 24,
    marginTop: 15,
    marginBottom: 20,
    color: "#333",
  },
  buttonContainer: {
    marginTop: 30,
    marginBottom: 20,
    backgroundColor: Color.PRIMARTY_COLOR,
    padding: 18,
    borderRadius: 15,
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.1,
    shadowRadius: 3,
    elevation: 5,
  },
  finishButton: {
    backgroundColor: Color.GREEN,
  },
  buttonText: {
    fontFamily: "Poppins-Medium",
    color: "#fff",
    fontSize: 16,
    textAlign: "center",
  },
});
