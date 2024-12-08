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
import { useTranslation } from 'react-i18next';
import { useToast } from '../../contexts/ToastContext';
import { useTheme } from "../../contexts/ThemeContext";

const Content = ({
  chaptersLength,
  content,
  onChapterComplete,
  initialIndex,
  courseId,
  userEmail,
}) => {
  const { t } = useTranslation();
  const { theme, colors } = useTheme();
  const flatListRef = React.useRef(null);
  const [activeIndex, setActiveIndex] = useState(initialIndex || 0);
  const { showToast } = useToast();

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

    if (!courseId || !userEmail || !currentChapter?.id) {
      console.error("Missing required values:", {
        courseId,
        userEmail,
        chapterId: currentChapter?.id,
      });
      showToast('Error: Missing required data', 'error');
      return;
    }

    try {
      await updateUserProgress(courseId, userEmail, currentChapter.id, index);
      showToast('Progress saved!', 'success');
      
      setActiveIndex(index + 1);
      if (flatListRef.current) {
        flatListRef.current.scrollToIndex({
          index: index + 1,
          animated: true,
        });
      }
    } catch (error) {
      console.error("Error saving progress:", error);
      showToast('Error saving progress', 'error');
    }
  };

  const onFlatListScroll = (event) => {
    const contentOffset = event.nativeEvent.contentOffset.x;
    const index = Math.round(contentOffset / Dimensions.get("screen").width);
    setActiveIndex(index);
  };

  const renderContentItem = ({ item, index }) => {
    return (
      <View style={[styles.contentContainer, {
        backgroundColor: colors.background
      }]}>
        <ScrollView
          style={styles.scrollView}
          showsVerticalScrollIndicator={false}
        >
          <Text style={[styles.heading, {
            color: colors.text
          }]}>
            {item.heading}
          </Text>
          <ContenItem 
            description={item.description} 
            output={item.output}
            theme={theme}
            colors={colors}
          />

          <TouchableOpacity
            style={[
              styles.buttonContainer,
              {
                backgroundColor: theme === 'dark' ? Color.ORANGE : Color.PRIMARTY_COLOR,
                shadowColor: colors.shadowColor
              },
              index === chaptersLength.length - 1 && [styles.finishButton, {
                backgroundColor: theme === 'dark' ? '#2e7d32' : Color.GREEN
              }],
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
                ? t('Finish Chapter')
                : t('Save & Continue')}
            </Text>
          </TouchableOpacity>
        </ScrollView>
      </View>
    );
  };

  return (
    <View style={[styles.container, {
      backgroundColor: colors.background
    }]}>
      <ProgressBar
        chaptersLength={chaptersLength.length}
        contentIndex={activeIndex}
        theme={theme}
        colors={colors}
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
        style={{ backgroundColor: colors.background }}
      />
    </View>
  );
};

export default Content;

const styles = StyleSheet.create({
  container: {
    flex: 1,
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
