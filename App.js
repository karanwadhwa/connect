import React, { Component } from "react";
import { createAppContainer, createSwitchNavigator } from "react-navigation";
import { Provider } from "react-redux";
import { AppLoading, Font, Asset } from "expo";
import firebase from "firebase";

import AuthLoadingScreen from "./src/screens/AuthLoadingScreen";
import AuthStackNavigator from "./src/navigation/AuthStackNavigator";
import NewProfileScreen from "./src/screens/NewProfileScreen";
import AppDrawerNavigator from "./src/navigation/AppDrawerNavigator";

import store from "./src/store";

import {
  FIREBASE_API_KEY,
  FIREBASE_AUTH_DOMAIN,
  FIREBASE_DATABASE_URL,
  FIREBASE_PROJECT_ID,
  FIREBASE_STORAGE_BUCKET,
  FIREBASE_MESSAGING_SENDER_ID
} from "react-native-dotenv";

class App extends Component {
  componentDidMount() {
    // Initialize Firebase
    const config = {
      apiKey: FIREBASE_API_KEY,
      authDomain: FIREBASE_AUTH_DOMAIN,
      databaseURL: FIREBASE_DATABASE_URL,
      projectId: FIREBASE_PROJECT_ID,
      storageBucket: FIREBASE_STORAGE_BUCKET,
      messagingSenderId: FIREBASE_MESSAGING_SENDER_ID
    };
    firebase.initializeApp(config);
  }

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
        "Rubik-Regular": require("./src/assets/fonts/Rubik-Regular.ttf"),
        "rubicon-icon-font": require("./src/assets/fonts/rubicon-icon-font.ttf")
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
  NewProfile: NewProfileScreen,
  App: AppDrawerNavigator
});

const AppContainer = createAppContainer(RootSwitchNavigator);

export default App;
