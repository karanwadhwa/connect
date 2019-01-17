import React from "react";
import { View } from "react-native";

function HorizontalRule({ width }) {
  return (
    <View
      style={{
        width,
        paddingTop: 30,
        alignSelf: "center",
        borderBottomColor: "rgba(172,172,172,0.5)",
        borderBottomWidth: 0.5
      }}
    />
  );
}

export default HorizontalRule;
