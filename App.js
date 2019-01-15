import React, { Component } from "react";
import { createAppContainer, createSwitchNavigator } from "react-navigation";
import { Provider } from "react-redux";

import AuthLoadingScreen from "./src/screens/AuthLoadingScreen";
import AuthStackNavigator from "./src/navigation/AuthStackNavigator";
import AppDrawerNavigator from "./src/navigation/AppDrawerNavigator";

import store from "./src/store";

class App extends Component {
  render() {
    return (
      <Provider store={store}>
        <AppContainer />
      </Provider>
    );
  }
}

const RootSwitchNavigator = createSwitchNavigator({
  AuthLoadingScreen: AuthLoadingScreen,
  Auth: AuthStackNavigator,
  App: AppDrawerNavigator
});

const AppContainer = createAppContainer(RootSwitchNavigator);

export default App;
