import React, { Component } from "react";
import { View, Text, StatusBar, Platform, StyleSheet } from "react-native";

import LoginTitle from "./LoginTitle";
import LoginForm from "./LoginForm";
import LoginBottom from "./LoginBottom";

class LoginPage extends Component {
  render() {
    return (
      <View style={[styles.container, styles.androidHeader]}>
        <LoginTitle />
        <LoginForm />
        <LoginBottom />
      </View>
    );
  }
}

export default LoginPage;

const styles = StyleSheet.create({
  container: {
    flex: 1
    //backgroundColor: "#3498db"
  },
  androidHeader: {
    ...Platform.select({
      android: {
        paddingTop: StatusBar.currentHeight
      }
    })
  }
});
