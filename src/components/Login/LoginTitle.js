import React from "react";
import { View, Text, StyleSheet } from "react-native";
import FIcon from "@expo/vector-icons/Feather";

function LoginTitle() {
  return (
    <View style={styles.titleContainer}>
      <FIcon
        name="feather"
        size={40}
        color="#5A7391"
        style={{ opacity: 0.5, padding: 10 }}
      />
      <Text style={styles.title}>Login</Text>
    </View>
  );
}

export default LoginTitle;

const styles = StyleSheet.create({
  titleContainer: {
    alignItems: "center",
    paddingTop: 50,
    justifyContent: "flex-end"
  },
  title: {
    fontSize: 40,
    fontFamily: "nunito-regular",
    color: "#333333",
    opacity: 0.6
  }
});
