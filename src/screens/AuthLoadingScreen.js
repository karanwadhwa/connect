import React, { Component } from "react";
import {
  View,
  StyleSheet,
  AsyncStorage,
  ActivityIndicator
} from "react-native";
import { connect } from "react-redux";

import { setToken } from "../store/actions/auth";
import API from "../config/api";

class AuthLoadingScreen extends Component {
  constructor() {
    super();

    this.loadApp();
  }

  loadApp = async () => {
    const token = await AsyncStorage.getItem("userToken");

    this.props.setToken(JSON.parse(token));

    if (this.props.accessToken) {
      API.get("/api/auth/whoami", {
        headers: {
          Authorization: this.props.accessToken
        }
      })
        .then(response =>
          this.props.navigation.navigate(response.data.user ? "App" : "Login")
        )
        .catch(err => {
          this.props.navigation.navigate("Login");
        });
    } else {
      this.props.navigation.navigate("Auth");
    }
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
