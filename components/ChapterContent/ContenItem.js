import { StyleSheet, useWindowDimensions, View } from "react-native";
import React from "react";
import RenderHTML from "react-native-render-html";

const ContenItem = ({ description }) => {
  const { width } = useWindowDimensions();

  const descriptionSource = { html: description };

  return (
    description && (
      <View>
        <RenderHTML contentWidth={width} source={descriptionSource} />
      </View>
    )
  );
};

export default ContenItem;

const styles = StyleSheet.create({});
