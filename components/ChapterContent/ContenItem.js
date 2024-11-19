import { StyleSheet, Text, View } from "react-native";
import React from "react";

const ContenItem = ({ description }) => {
  return (
    description && (
      <View>
        <Text>{description}</Text>
      </View>
    )
  );
};

export default ContenItem;

const styles = StyleSheet.create({});
