import React, { Component } from "react";
import { ScrollView, StatusBar, Platform, StyleSheet } from "react-native";

import RegisterTitle from "./RegisterTitle";
import RegistrationForm from "./RegistrationForm";
import RegisterBottom from "./RegisterBottom";

class RegisterPage extends Component {
  render() {
    return (
      <ScrollView style={[styles.container, styles.androidHeader]}>
        <RegisterTitle />
        <RegistrationForm navigation={this.props.navigation} />
        <RegisterBottom navigation={this.props.navigation} />
      </ScrollView>
    );
  }
}

export default RegisterPage;

const styles = StyleSheet.create({
  container: {
    flex: 1
  },
  androidHeader: {
    ...Platform.select({
      android: {
        paddingTop: StatusBar.currentHeight
      }
    })
  }
});
