import React, { Component } from "react";
import {
  Text,
  View,
  StyleSheet,
  TouchableOpacity,
  KeyboardAvoidingView
} from "react-native";

import FormInput from "../common/FormInput";
import HorizontalRule from "../common/HorizontalRule";

class LoginForm extends Component {
  render() {
    return (
      <KeyboardAvoidingView style={styles.formContainer}>
        <FormInput
          label="First Name"
          placeholder="First Name"
          autoCorrect={false}
          returnKeyType="next"
          icon="ios-contact"
        />

        <FormInput
          label="Last Name"
          placeholder="Last Name"
          autoCorrect={false}
          returnKeyType="next"
          icon="ios-contacts"
        />

        <FormInput
          label="User ID"
          placeholder="Registration No. or Staff ID"
          autoCorrect={false}
          returnKeyType="next"
          icon="ios-card"
        />

        <FormInput
          label="Email"
          placeholder="email@sakec.ac.in"
          autoCorrect={false}
          returnKeyType="next"
          icon="ios-mail"
        />

        <FormInput
          label="Password"
          placeholder="Your Password"
          autoCorrect={false}
          secureTextEntry
          returnKeyType="next"
          icon="md-key"
        />

        <FormInput
          label="Confirm Password"
          placeholder="Your Password"
          autoCorrect={false}
          secureTextEntry
          returnKeyType="go"
          icon="md-key"
        />

        <View style={styles.buttonContainer}>
          <TouchableOpacity style={styles.button}>
            <Text style={styles.buttonText}>REGISTER</Text>
          </TouchableOpacity>

          <HorizontalRule width="80%" />
        </View>
      </KeyboardAvoidingView>
    );
  }
}

export default LoginForm;

const styles = StyleSheet.create({
  formContainer: {
    flex: 1,
    justifyContent: "flex-start",
    paddingHorizontal: 40,
    paddingVertical: 20
  },
  buttonContainer: {
    marginVertical: 10,
    justifyContent: "center", // space-between
    flexDirection: "column" //row
  },
  button: {
    backgroundColor: "#107AFB",
    paddingVertical: 14,
    borderRadius: 5,
    width: "100%", //100
    alignSelf: "center" //
  },
  buttonText: {
    color: "#fff",
    textAlign: "center",
    //fontWeight: "700"
    fontFamily: "nunito-extra-bold"
  }
});
