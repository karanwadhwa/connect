import React, { Component } from "react";
import {
  View,
  Text,
  ActivityIndicator,
  TouchableOpacity,
  StyleSheet,
  AsyncStorage
} from "react-native";
import { connect } from "react-redux";
import { Subtitle, Button, Heading } from "@shoutem/ui";

import CreateNewStudentProfile from "./CreateNewStudentProfile";
import CreateNewProfessorProfile from "./CreateNewProfessorProfile";

class CreateProfile extends Component {
  logout = async () => {
    await AsyncStorage.clear();
    this.props.navigation.navigate("AuthLoadingScreen");
  };

  render() {
    if (this.props.authLoading) {
      return (
        <ActivityIndicator size="large" style={styles.ActivityIndicator} />
      );
    } else {
      if (this.props.user.userType === "student") {
        return <CreateNewStudentProfile navigation={this.props.navigation} />;
      } else if (this.props.user.userType === "professor") {
        return <CreateNewProfessorProfile navigation={this.props.navigation} />;
      }

      return (
        <View style={styles.container}>
          <Heading>Profile not found!</Heading>
          <View
            style={{
              paddingVertical: 20
            }}
          >
            <Subtitle styleName="h-center">
              You cannot proceed without setting up your profile.
            </Subtitle>
            <Subtitle styleName="h-center">
              <Subtitle
                style={{ color: "#107AFB", fontFamily: "nunito-extra-bold" }}
              >
                {this.props.user.userType}{" "}
              </Subtitle>
              users should have their profiles setup manually. Contact the
              systems administrator for more help.
            </Subtitle>
          </View>
          <TouchableOpacity style={styles.button} onPress={this.logout}>
            <Text style={styles.buttonText}>LOGOUT</Text>
          </TouchableOpacity>
        </View>
      );
    }
  }
}

const mapStateToProps = state => {
  return {
    user: state.auth.user,
    authLoading: state.auth.loading
  };
};

export default connect(mapStateToProps)(CreateProfile);

const styles = StyleSheet.create({
  ActivityIndicator: {
    flex: 1,
    alignSelf: "center",
    justifyContent: "center"
  },
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    padding: 30
  },
  button: {
    backgroundColor: "#107AFB",
    marginBottom: 10,
    paddingVertical: 14,
    borderRadius: 5,
    width: "100%"
  },
  buttonText: {
    color: "#fff",
    textAlign: "center",
    fontFamily: "nunito-extra-bold"
  }
});
