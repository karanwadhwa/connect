import React, { Component } from "react";
import {
  Text,
  View,
  StyleSheet,
  AsyncStorage,
  ActivityIndicator
} from "react-native";
import { connect } from "react-redux";

import { setToken } from "../store/actions/auth";

class AuthLoadingScreen extends Component {
  constructor() {
    super();

    //this.props.setToken;
    this.loadApp();
  }

  loadApp = async () => {
    const token = await AsyncStorage.getItem("userToken");

    this.props.setToken(JSON.parse(token));
    console.log(this.props);

    this.props.navigation.navigate(this.props.accessToken ? "App" : "Auth");
  };

  render() {
    return (
      <View style={styles.container}>
        <ActivityIndicator />
      </View>
    );
  }
}

const mapStateToProps = state => {
  return {
    accessToken: state.auth.accessToken
  };
};

export default connect(
  mapStateToProps,
  { setToken }
)(AuthLoadingScreen);

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center"
  }
});
