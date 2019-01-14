import React, { Component } from "react";
import { Text, View, Button, AsyncStorage, StyleSheet } from "react-native";

class LoginScreen extends Component {
  login = async () => {
    user = {
      fname: "karan",
      lname: "wadhwa",
      regNo: 11111,
      email: "karan.wadhwa@gmail.com"
    };

    await AsyncStorage.setItem("userToken", JSON.stringify(user));

    this.props.navigation.navigate("App");
  };

  render() {
    return (
      <View style={styles.container}>
        <Button title="Complete Login" onPress={this.login} />
      </View>
    );
  }
}

export default LoginScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center"
  }
});
