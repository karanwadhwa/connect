import React, { Component } from "react";
import { Button, View, StyleSheet, AsyncStorage } from "react-native";
import firebase from "firebase";

class SettingsScreen extends Component {
  logout = async () => {
    await AsyncStorage.clear();
    await firebase.auth().signOut();
    this.props.navigation.navigate("AuthLoadingScreen");
  };

  render() {
    return (
      <View style={styles.container}>
        <Button title="Logout" onPress={this.logout} />
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
