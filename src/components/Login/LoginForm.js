import React, { Component } from "react";
import {
  Text,
  View,
  StyleSheet,
  TouchableOpacity,
  KeyboardAvoidingView,
  AsyncStorage
} from "react-native";
import { Formik } from "formik";
import * as Yup from "yup";
import API from "../../config/api";

import FormInput from "../common/FormInput";
import HorizontalRule from "../common/HorizontalRule";

class LoginForm extends Component {
  _handleSubmit = (values, bag) => {
    API.post("/api/auth/login", {
      username: values.username,
      password: values.password
    })
      .then(response => {
        // server will return an object, AsyncStorage takes in strings
        // convert the object to a string then store it in AsyncStorage
        AsyncStorage.setItem("userToken", JSON.stringify(response.data.token));
        this.props.navigation.navigate("AuthLoadingScreen");
      })
      .catch(error => {
        bag.setSubmitting(false);
        bag.setErrors(error.response.data);
      });
  };

  render() {
    return (
      <KeyboardAvoidingView style={styles.formContainer}>
        <Formik
          initialValues={{ username: "", password: "" }}
          onSubmit={this._handleSubmit}
          validationSchema={Yup.object().shape({
            username: Yup.string().required() || Yup.number().required(),
            password: Yup.string()
              .min(8)
              .required()
          })}
          render={({
            values,
            handleSubmit,
            setFieldValue,
            errors,
            touched,
            setFieldTouched,
            isValid,
            setSubmitting
          }) => (
            <React.Fragment>
              <FormInput
                label="Username"
                placeholder="Registration No or Staff ID"
                autoCorrect={false}
                returnKeyType="next"
                blurOnSubmit={false}
                icon="ios-contact"
                //maxLength={5}

                name="username"
                value={values.username}
                onChange={setFieldValue}
                onTouch={setFieldTouched}
                error={touched.username && errors.username}
              />

              <FormInput
                label="Password"
                placeholder="Your Password"
                autoCorrect={false}
                secureTextEntry
                returnKeyType="go"
                icon="ios-lock"
                name="password"
                value={values.password}
                onChange={setFieldValue}
                onTouch={setFieldTouched}
                error={touched.password && errors.password}
              />

              <View style={styles.buttonContainer}>
                <TouchableOpacity
                  style={styles.button}
                  onPress={handleSubmit}
                  disabled={!isValid}
                >
                  <Text style={styles.buttonText}>LOGIN</Text>
                </TouchableOpacity>
                <TouchableOpacity
                  style={{ width: "100%", alignItems: "center" }}
                >
                  <Text style={{ color: "#107AFB", fontFamily: "nunito-bold" }}>
                    Forgot Password?
                  </Text>
                </TouchableOpacity>
              </View>
              <HorizontalRule width="80%" />
            </React.Fragment>
          )}
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
    marginBottom: 10,
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
