import React from "react";
import { View, Text, StyleSheet, TouchableOpacity } from "react-native";

function LoginBottom() {
  return (
    <View style={styles.bottomContainer}>
      <Text>Don't have an account yet?</Text>
      <TouchableOpacity>
        <Text style={{ color: "#107AFB", fontFamily: "nunito-extra-bold" }}>
          Register Now
        </Text>
      </TouchableOpacity>
    </View>
  );
}

export default LoginBottom;

const styles = StyleSheet.create({
  bottomContainer: {
    alignItems: "center"
  }
});
