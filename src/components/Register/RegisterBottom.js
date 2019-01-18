import React, { Component } from "react";
import { View, Text, StyleSheet, TouchableOpacity } from "react-native";

class LoginBottom extends Component {
  render() {
    return (
      <View style={styles.bottomContainer}>
        <Text>Have an Account?</Text>
        <TouchableOpacity
          onPress={() => this.props.navigation.navigate("Login")}
        >
          <Text style={{ color: "#107AFB", fontFamily: "nunito-extra-bold" }}>
            Login instead
          </Text>
        </TouchableOpacity>
      </View>
    );
  }
}

export default LoginBottom;

const styles = StyleSheet.create({
  bottomContainer: {
    alignItems: "center",
    justifyContent: "flex-start",
    paddingBottom: 75
  }
});
