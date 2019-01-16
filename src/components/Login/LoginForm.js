import React, { Component } from "react";
import {
  Text,
  View,
  StyleSheet,
  TextInput,
  TouchableOpacity,
  KeyboardAvoidingView
} from "react-native";

class LoginForm extends Component {
  render() {
    return (
      <KeyboardAvoidingView style={styles.formContainer}>
        <Text style={styles.inputLabel}>Username</Text>
        <TextInput
          style={styles.input}
          placeholder="Registration No or Staff ID"
          placeholderTextColor="rgba(172,172,172,0.5)"
          autoCorrect={false}
          returnKeyType="next"
          onSubmitEditing={() => this.passwordRef.focus()}
          blurOnSubmit={false}
        />

        <Text style={styles.inputLabel}>Password</Text>
        <TextInput
          style={styles.input}
          placeholder="Your Password"
          placeholderTextColor="rgba(172,172,172,0.5)"
          autoCorrect={false}
          secureTextEntry
          ref={passwordRef => (this.passwordRef = passwordRef)}
          returnKeyType="go"
        />

        <View style={styles.buttonContainer}>
          <TouchableOpacity style={styles.button}>
            <Text style={styles.buttonText}>LOGIN</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={{ width: 125, alignSelf: "center", paddingTop: 10 }}
          >
            <Text style={{ color: "#107AFB", fontFamily: "nunito-bold" }}>
              Forgot Password?
            </Text>
          </TouchableOpacity>
        </View>
        <View
          style={{
            width: "80%",
            paddingTop: 30,
            alignSelf: "center",
            borderBottomColor: "rgba(172,172,172,0.5)",
            borderBottomWidth: 0.5
          }}
        />
      </KeyboardAvoidingView>
    );
  }
}

export default LoginForm;

const styles = StyleSheet.create({
  formContainer: {
    justifyContent: "flex-start",
    padding: 40
  },
  inputLabel: {
    fontWeight: "700",
    //fontFamily: "nunito-bold",
    color: "#333333",
    opacity: 0.8,
    paddingBottom: 7
  },
  input: {
    height: 45,
    borderWidth: 1,
    borderColor: "rgba(172,172,172,0.7)",
    marginBottom: 20,
    paddingHorizontal: 10,
    borderRadius: 5
  },
  buttonContainer: {
    marginTop: 10,
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
