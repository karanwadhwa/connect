import React from "react";
import { View, Text, StyleSheet } from "react-native";

function RegisterTitle() {
  return (
    <View style={styles.titleContainer}>
      <Text style={styles.title}>Register</Text>
    </View>
  );
}

export default RegisterTitle;

const styles = StyleSheet.create({
  titleContainer: {
    alignItems: "center",
    paddingTop: 30
  },
  title: {
    fontSize: 25,
    fontFamily: "nunito-regular",
    color: "#333333",
    opacity: 0.6
  }
});
