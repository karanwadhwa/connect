import React from "react";
import { View } from "react-native";
import { createStackNavigator } from "react-navigation";
import Icon from "@expo/vector-icons/Ionicons";

import WelcomeScreen from "../screens/WelcomeScreen";
import LoginScreen from "../screens/LoginScreen";
import RegisterScreen from "../screens/RegisterScreen";

const AuthStackNavigator = createStackNavigator(
  {
    Welcome: WelcomeScreen,
    Login: LoginScreen,
    Register: RegisterScreen
  },
  {
    defaultNavigationOptions: ({ navigation }) => ({
      header: null
    })
  }
);

export default AuthStackNavigator;
