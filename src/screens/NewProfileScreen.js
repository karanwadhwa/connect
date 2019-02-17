import React, { Component } from "react";
import { View, Text, StyleSheet } from "react-native";

class NewProfileScreen extends Component {
  render() {
    return (
      <View style={styles.container}>
        <Text>Create Profile</Text>
      </View>
    );
  }
}

export default NewProfileScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff"
  }
});
