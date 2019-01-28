import React, { Component } from "react";
import { View, Text, StyleSheet } from "react-native";

class SettingsScreen extends Component {
  render() {
    return (
      <View style={styles.container}>
        <Text>Post Screen</Text>
      </View>
    );
  }
}

export default SettingsScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center"
  }
});
