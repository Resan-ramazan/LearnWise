import { StyleSheet, useWindowDimensions, View } from "react-native";
import React, { useState } from "react";
import RenderHTML from "react-native-render-html";
import Color from "../../utils/Color";
import { Text } from "react-native";
import { TouchableOpacity } from "react-native-gesture-handler";
import { useTranslation } from "react-i18next";

const ContenItem = ({ description, output }) => {
  const { t } = useTranslation();
  const [isRun, setIsRun] = useState(false);
  const { width } = useWindowDimensions();

  const descriptionSource = { html: description };
  const outputSource = { html: output };
  return (
    description && (
      <View style={styles.container}>
        <RenderHTML
          contentWidth={width}
          source={descriptionSource}
          tagsStyles={tagsStyles}
        />
        {output != null && (
          <View style={styles.buttonContainer}>
            <TouchableOpacity
              onPress={() => setIsRun(!isRun)}
              style={styles.runButton}
            >
              <Text style={styles.runButtonText}>
                {isRun ? t("Hide") : t("Run")}
              </Text>
            </TouchableOpacity>
          </View>
        )}

        {isRun && (
          <View style={styles.outputContainer}>
            <Text style={styles.outputTitle}>{t("Output")}</Text>
            <RenderHTML
              contentWidth={width}
              source={outputSource}
              tagsStyles={outputTagsStyles}
            />
          </View>
        )}
      </View>
    )
  );
};

export default ContenItem;

const tagsStyles = {
  body: {
    fontFamily: "Poppins-Regular",
    fontSize: 16,
    lineHeight: 24,
    color: Color.TEXT_BLACK,
  },
  code: {
    backgroundColor: Color.TEXT_BLACK,
    color: Color.TEXT_WHITE,
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

const styles = StyleSheet.create({
  container: {
    marginVertical: 10,
  },
  buttonContainer: {
    marginVertical: 15,
  },
  runButton: {
    backgroundColor: Color.ORANGE,
    borderRadius: 8,
    width: 100,
    elevation: 2,
    shadowColor: "#000",
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
    backgroundColor: Color.TEXT_BLACK,
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
