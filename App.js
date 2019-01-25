import React, { Component } from "react";
import { createAppContainer, createSwitchNavigator } from "react-navigation";
import { Provider } from "react-redux";
import { AppLoading, Font, Asset } from "expo";

import AuthLoadingScreen from "./src/screens/AuthLoadingScreen";
import AuthStackNavigator from "./src/navigation/AuthStackNavigator";
import AppDrawerNavigator from "./src/navigation/AppDrawerNavigator";

import store from "./src/store";

class App extends Component {
  state = {
    isLoadingComplete: false
  };

  render() {
    if (!this.state.isLoadingComplete) {
      return (
        <AppLoading
          startAsync={this._loadResourcesAsync}
          onError={this._handleLoadingError}
          onFinish={this._handleFinishLoading}
        />
      );
    } else {
      return (
        <Provider store={store}>
          <AppContainer />
        </Provider>
      );
    }
  }

  _loadResourcesAsync = async () => {
    return Promise.all([
      Font.loadAsync({
        "nunito-regular": require("./src/assets/fonts/Nunito-Regular.ttf"),
        "nunito-light": require("./src/assets/fonts/Nunito-Light.ttf"),
        "nunito-bold": require("./src/assets/fonts/Nunito-Bold.ttf"),
        "nunito-extra-bold": require("./src/assets/fonts/Nunito-ExtraBold.ttf"),
        "Rubik-Regular": require("./src/assets/fonts/Rubik-Regular.ttf")
      })
    ]);
  };

  _handleLoadingError = error => {
    // In this case, you might want to report the error to your error
    // reporting service, for example Sentry
    console.warn(error);
    // Will use this later to show a 404 splash page
  };

  _handleFinishLoading = () => {
    this.setState({ isLoadingComplete: true });
  };
}

const RootSwitchNavigator = createSwitchNavigator({
  AuthLoadingScreen: AuthLoadingScreen,
  Auth: AuthStackNavigator,
  App: AppDrawerNavigator
});

const AppContainer = createAppContainer(RootSwitchNavigator);

export default App;
