import React, { Component } from "react";
import {
  View,
  StyleSheet,
  AsyncStorage,
  ActivityIndicator
} from "react-native";
import { connect } from "react-redux";
import firebase from "firebase";

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
        .then(response => {
          if (!response.data.user) {
            // sign out of firebase if stored api token has expired
            firebase.auth().signOut();
            this.props.navigation.navigate("Login");
          }

          API.get("/api/profile", {
            headers: {
              Authorization: this.props.accessToken
            }
          })
            .then(response =>
              this.props.navigation.navigate(
                response.data ? "App" : "NewProfile"
              )
            )
            .catch(err => this.props.navigation.navigate("NewProfile"));
        })
        .catch(err => {
          this.props.navigation.navigate("Login");
        });
    } else {
      firebase.auth().signOut();
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
