import React, { Component } from "react";
import { Text, View, StyleSheet } from "react-native";

import RegisterPage from "../components/Register/RegisterPage";

class RegisterScreen extends Component {
  render() {
    return <RegisterPage navigation={this.props.navigation} />;
  }
}

export default RegisterScreen;
