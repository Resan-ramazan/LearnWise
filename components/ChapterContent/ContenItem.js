import { StyleSheet, useWindowDimensions, View } from "react-native";
import React, { useState } from "react";
import RenderHTML from "react-native-render-html";
import Color from "../../utils/Color";
import { Text } from "react-native";
import { TouchableOpacity } from "react-native-gesture-handler";
import { useTranslation } from 'react-i18next';

const ContenItem = ({ description, output }) => {
  const { t } = useTranslation();
  const [isRun, setIsRun] = useState(false);
  const { width } = useWindowDimensions();

  const descriptionSource = { html: description };
  const outputSource = { html: output };

  return (
    description && (
      <View>
        <RenderHTML
          contentWidth={width}
          source={descriptionSource}
          tagsStyles={tagsStyles}
        />
        {output != null ? (
          <TouchableOpacity
            onPress={() => setIsRun(!isRun)}
            style={{ borderRadius: 10 }}
          >
            <Text
              style={{
                backgroundColor: Color.ORANGE,
                padding: 12,
                fontSize: 17,
                width: 100,
                borderRadius: 5,
                fontFamily: "Poppins-Regular",
                color: Color.TEXT_WHITE,
                marginVertical: 10,
                textAlign: "center",
              }}
            >
              {isRun ? t('Hide') : t('Run')}
            </Text>
          </TouchableOpacity>
        ) : null}

        {isRun ? (
          <>
            <Text
              style={{
                fontFamily: "Poppins-Medium",
                fontSize: 17,
                marginBottom: 10,
              }}
            >
              {t('Output')}
            </Text>
            <RenderHTML
              contentWidth={width}
              source={outputSource}
              tagsStyles={outputTagsStyles}
            />
          </>
        ) : null}
      </View>
    )
  );
};

export default ContenItem;

const tagsStyles = {
  body: {
    fontFamily: "Poppins-Regular",
    fontSize: 17,
  },

  code: {
    backgroundColor: Color.TEXT_BLACK,
    color: Color.TEXT_WHITE,
    padding: 5,
    borderRadius: 5,
  },
};

const outputTagsStyles = {
  body: {
    fontFamily: "Poppins-Regular",
    fontSize: 17,
    backgroundColor: Color.TEXT_BLACK,
    color: Color.TEXT_WHITE,
    padding: 20,
    borderRadius: 15,
  },
  code: {
    backgroundColor: Color.TEXT_BLACK,
    color: Color.TEXT_WHITE,
    padding: 5,
    borderRadius: 5,
  },
  a: {
    color: Color.TEXT_WHITE,
    textAlign: "center",
    backgroundColor: Color.GREEN,
    width: 200,
  },

  h1: {
    fontFamily: "Poppins-Medium",
    fontSize: 20,
    marginBottom: 10,
  },
  button: {
    backgroundColor: Color.GREEN,
    padding: 10,
    borderRadius: 5,
  },
  img: {
    width: 200,
    height: 200,
  },
};

const styles = StyleSheet.create({});
