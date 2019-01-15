import React, { Component } from "react";
import { createAppContainer, createSwitchNavigator } from "react-navigation";

import AuthLoadingScreen from "./src/screens/AuthLoadingScreen";
import AuthStackNavigator from "./src/navigation/AuthStackNavigator";
import AppDrawerNavigator from "./src/navigation/AppDrawerNavigator";

class App extends Component {
  render() {
    return <AppContainer />;
  }
}

const RootSwitchNavigator = createSwitchNavigator({
  AuthLoadingScreen: AuthLoadingScreen,
  Auth: AuthStackNavigator,
  App: AppDrawerNavigator
});

const AppContainer = createAppContainer(RootSwitchNavigator);

export default App;
