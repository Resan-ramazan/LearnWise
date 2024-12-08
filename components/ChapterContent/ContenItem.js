import { StyleSheet, useWindowDimensions, View } from "react-native";
import React, { useState, useMemo } from "react";
import RenderHTML from "react-native-render-html";
import Color from "../../utils/Color";
import { Text } from "react-native";
import { TouchableOpacity } from "react-native-gesture-handler";
import { useTranslation } from "react-i18next";
import { useTheme } from "../../contexts/ThemeContext";

const ContenItem = ({ description, output }) => {
  const { t } = useTranslation();
  const { theme, colors } = useTheme();
  const [isRun, setIsRun] = useState(false);
  const { width } = useWindowDimensions();

  const descriptionSource = { html: description };
  const outputSource = { html: output };

  const tagsStyles = {
    body: {
      fontFamily: "Poppins-Regular",
      fontSize: 16,
      lineHeight: 24,
      color: colors.text,
    },
    code: {
      backgroundColor: theme === 'dark' ? '#1e1e1e' : Color.TEXT_BLACK,
      color: theme === 'dark' ? '#e0e0e0' : Color.TEXT_WHITE,
      padding: 8,
      borderRadius: 6,
      fontFamily: "monospace",
    },
  };

  const outputTagsStyles = {
    body: {
      fontFamily: "Poppins-Regular",
      fontSize: 16,
      lineHeight: 24,
      color: Color.TEXT_WHITE,
    },
    code: {
      backgroundColor: Color.TEXT_BLACK,
      color: Color.TEXT_WHITE,
      padding: 8,
      borderRadius: 6,
      fontFamily: "monospace",
    },
    a: {
      color: Color.TEXT_WHITE,
      textDecorationLine: "underline",
    },
    h1: {
      fontFamily: "Poppins-Medium",
      fontSize: 20,
      marginVertical: 10,
      color: Color.TEXT_WHITE,
    },
    img: {
      borderRadius: 8,
      marginVertical: 10,
    },
    ol: {
      marginLeft: 20,
      marginVertical: 10,
    },
    ul: {
      marginLeft: 20,
      marginVertical: 10,
    },
  };

  const descriptionContent = useMemo(() => (
    <RenderHTML
      contentWidth={width}
      source={descriptionSource}
      tagsStyles={tagsStyles}
      defaultTextProps={{ allowFontScaling: false }}
      renderersProps={{
        img: {
          enableExperimentalPercentWidth: true
        }
      }}
    />
  ), [width, description]);

  const outputContent = useMemo(() => (
    <RenderHTML
      contentWidth={width}
      source={outputSource}
      tagsStyles={outputTagsStyles}
      defaultTextProps={{ allowFontScaling: false }}
      renderersProps={{
        img: {
          enableExperimentalPercentWidth: true
        }
      }}
    />
  ), [width, output]);

  return (
    description && (
      <View style={[styles.container, {
        backgroundColor: colors.background
      }]}>
        {descriptionContent}
        {output != null && (
          <View style={styles.buttonContainer}>
            <TouchableOpacity
              onPress={() => setIsRun(!isRun)}
              style={[styles.runButton, {
                backgroundColor: Color.ORANGE,
                shadowColor: colors.shadowColor
              }]}
            >
              <Text style={styles.runButtonText}>
                {isRun ? t("Hide") : t("Run")}
              </Text>
            </TouchableOpacity>
          </View>
        )}

        {isRun && (
          <View style={[styles.outputContainer, {
            backgroundColor: theme === 'dark' ? '#1e1e1e' : Color.TEXT_BLACK
          }]}>
            <Text style={styles.outputTitle}>{t("Output")}</Text>
            {outputContent}
          </View>
        )}
      </View>
    )
  );
};

export default ContenItem;

const styles = StyleSheet.create({
  container: {
    marginVertical: 10,
  },
  buttonContainer: {
    marginVertical: 15,
  },
  runButton: {
    borderRadius: 8,
    width: 100,
    elevation: 2,
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
  },
  runButtonText: {
    color: Color.TEXT_WHITE,
    fontFamily: "Poppins-Regular",
    fontSize: 16,
    padding: 12,
    textAlign: "center",
  },
  outputContainer: {
    marginTop: 10,
    borderRadius: 12,
    padding: 15,
  },
  outputTitle: {
    fontFamily: "Poppins-Medium",
    fontSize: 17,
    marginBottom: 10,
    color: Color.TEXT_WHITE,
  },
});
