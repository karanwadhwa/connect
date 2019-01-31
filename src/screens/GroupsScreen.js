import React, { Component } from "react";
import { View, Text, StyleSheet } from "react-native";

class GroupsScreen extends Component {
  render() {
    return (
      <View style={styles.container}>
        <Text>Groups</Text>
      </View>
    );
  }
}

export default GroupsScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center"
  }
});
