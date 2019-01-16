import React, { Component } from "react";
import { createAppContainer, createSwitchNavigator } from "react-navigation";
import { Provider } from "react-redux";
import { Font } from "expo";

import AuthLoadingScreen from "./src/screens/AuthLoadingScreen";
import AuthStackNavigator from "./src/navigation/AuthStackNavigator";
import AppDrawerNavigator from "./src/navigation/AppDrawerNavigator";

import store from "./src/store";

class App extends Component {
  componentDidMount() {
    Font.loadAsync({
      "nunito-regular": require("./src/assets/fonts/Nunito-Regular.ttf"),
      "nunito-light": require("./src/assets/fonts/Nunito-Light.ttf"),
      "nunito-bold": require("./src/assets/fonts/Nunito-Bold.ttf"),
      "nunito-extra-bold": require("./src/assets/fonts/Nunito-ExtraBold.ttf")
    });
  }
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
