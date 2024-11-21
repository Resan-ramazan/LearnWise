import { Dimensions, FlatList, StyleSheet, Text, View } from "react-native";
import React, { useState, useEffect } from "react";
import ProgressBar from "./ProgressBar";
import ContenItem from "./ContenItem";
import { ScrollView, TouchableOpacity } from "react-native-gesture-handler";
import { useNavigation } from "@react-navigation/native";
import { updateUserProgress } from "../../services/courses";
import { ToastAndroid } from "react-native";

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
      ToastAndroid.show("Error: Missing required data", ToastAndroid.SHORT);
      return;
    }

    try {
      await updateUserProgress(courseId, userEmail, currentChapter.id, index);
      ToastAndroid.show("Progress saved!", ToastAndroid.SHORT);

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
      <View>
        <ScrollView
          style={{
            width: Dimensions.get("screen").width,
            padding: 20,
            paddingBottom:70
          }}
        >
          <Text style={styles.heading}>{item.heading}</Text>
          <ContenItem description={item.description} output={item.output} />

          <TouchableOpacity
            style={styles.buttonContainer}
            onPress={() => {
              if (index === chaptersLength.length - 1) {
                onChapterComplete(); // Son sayfada Finish
              } else {
                onSaveProgress(index); // Diğer sayfalarda Save
              }
            }}
          >
            <Text style={styles.buttonText}>
              {index === chaptersLength.length - 1
                ? "Finish"
                : "Save & Continue"}
            </Text>
          </TouchableOpacity>
        </ScrollView>
      </View>
    );
  };

  return (
    <View style={{ padding: 0, height: "100%" }}>
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
  heading: {
    fontFamily: "Poppins-Medium",
    fontSize: 22,
    marginTop: 15,
  },
  buttonContainer: {
    marginTop: 10,
    backgroundColor: "#FFA500",
    padding: 15,
    borderRadius: 10,
  },
  buttonText: {
    fontFamily: "Poppins-Regular",
    color: "#fff",
    fontSize: 17,
    textAlign: "center",
  },
});
