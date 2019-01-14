import React from "react";

import { createAppContainer, createSwitchNavigator } from "react-navigation";

import AuthLoadingScreen from "./src/screens/AuthLoadingScreen";
import AuthStackNavigator from "./src/navigation/AuthStackNavigator";
import AppDrawerNavigator from "./src/navigation/AppDrawerNavigator";

const RootSwitchNavigator = createSwitchNavigator({
  AuthLoadingScreen: AuthLoadingScreen,
  Auth: AuthStackNavigator,
  App: AppDrawerNavigator
});

export default createAppContainer(RootSwitchNavigator);
