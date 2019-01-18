import React, { Component } from "react";
import { AsyncStorage } from "react-native";

import LoginPage from "../components/Login/LoginPage";

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
    return <LoginPage navigation={this.props.navigation} />;
  }
}

export default LoginScreen;
