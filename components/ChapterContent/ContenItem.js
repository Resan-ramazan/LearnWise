import { StyleSheet, useWindowDimensions, View } from "react-native";
import React from "react";
import RenderHTML from "react-native-render-html";
import Color from "../../utils/Color";

const ContenItem = ({ description }) => {
  const { width } = useWindowDimensions();

  const descriptionSource = { html: description };

  return (
    description && (
      <View>
        <RenderHTML
          contentWidth={width}
          source={descriptionSource}
          tagsStyles={tagsStyles}
        />
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

const styles = StyleSheet.create({});
