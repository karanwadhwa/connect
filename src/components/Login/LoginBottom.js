import React, { Component } from "react";
import { View, Text, StyleSheet, TouchableOpacity } from "react-native";

class LoginBottom extends Component {
  render() {
    return (
      <View style={styles.bottomContainer}>
        <Text>Don't have an account yet?</Text>
        <TouchableOpacity
          onPress={() => this.props.navigation.navigate("Register")}
        >
          <Text style={{ color: "#107AFB", fontFamily: "nunito-extra-bold" }}>
            Register Now
          </Text>
        </TouchableOpacity>
      </View>
    );
  }
}

export default LoginBottom;

const styles = StyleSheet.create({
  bottomContainer: {
    alignItems: "center"
  }
});
