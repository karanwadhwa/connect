import React, { Component } from "react";
import {
  Text,
  View,
  StyleSheet,
  TouchableOpacity,
  KeyboardAvoidingView,
  Alert,
  Picker,
  Platform
} from "react-native";
import { Formik } from "formik";
import * as Yup from "yup";

import API from "../../config/api";

import FormInput from "../common/FormInput";
import HorizontalRule from "../common/HorizontalRule";

class LoginForm extends Component {
  _handleSubmit = (values, bag) => {
    API.post("/api/auth/register", {
      fname: values.fname,
      lname: values.lname,
      userID: values.userID,
      email: values.email,
      userType: values.userType,
      password: values.password,
      password2: values.password2
    })
      .then(response => {
        Alert.alert(
          "Account Created. Login to continue.",
          `Name: ${response.data.fname} ${response.data.lname}\nUser ID: ${
            response.data.userID
          }\nEmail: ${response.data.email}`,
          [
            {
              text: "Login",
              onPress: () => this.props.navigation.navigate("Login")
            }
          ],
          { cancelable: false }
        );
      })
      .catch(error => {
        if (error.response) {
          bag.setSubmitting(false);
          bag.setErrors(error.response.data);
        }
      });
  };

  render() {
    return (
      <KeyboardAvoidingView style={styles.formContainer}>
        <Formik
          initialValues={{
            fname: "",
            lname: "",
            userID: "",
            userType: "student",
            email: "",
            password: "",
            password2: ""
          }}
          onSubmit={this._handleSubmit}
          validationSchema={Yup.object().shape({
            fname: Yup.string().required("Your first name is required"),
            lname: Yup.string().required("Your last name is required"),
            userType: Yup.string().required("Select User Type"),
            userID: Yup.string().required() || Yup.number().required(),
            email: Yup.string()
              .email("Enter a valid @sakec email")
              .required(),
            password: Yup.string()
              .min(8)
              .required(),
            password2: Yup.string().oneOf(
              [Yup.ref("password", null)],
              "Passwords do not match"
            )
          })}
          render={({
            values,
            handleSubmit,
            setFieldValue,
            errors,
            touched,
            setFieldTouched,
            isValid
          }) => (
            <React.Fragment>
              <FormInput
                label="First Name"
                placeholder="First Name"
                autoCorrect={false}
                returnKeyType="next"
                icon="ios-contact"
                name="fname"
                value={values.fname}
                onChange={setFieldValue}
                onTouch={setFieldTouched}
                error={touched.fname && errors.fname}
              />

              <FormInput
                label="Last Name"
                placeholder="Last Name"
                autoCorrect={false}
                returnKeyType="next"
                icon="ios-contacts"
                name="lname"
                value={values.lname}
                onChange={setFieldValue}
                onTouch={setFieldTouched}
                error={touched.lname && errors.lname}
              />

              <Text style={styles.label}>User Type</Text>
              <Text style={styles.error}>{errors.userType}</Text>
              <View style={styles.androidPickerView}>
                <Picker
                  name="userType"
                  selectedValue={values.userType}
                  onValueChange={value => setFieldValue("userType", value)}
                >
                  <Picker.Item label="Student" value="student" />
                  <Picker.Item label="Professor" value="professor" />
                </Picker>
              </View>

              <FormInput
                label="User ID"
                placeholder="Registration No. or Staff ID"
                autoCorrect={false}
                returnKeyType="next"
                icon="ios-card"
                name="userID"
                value={values.userID}
                onChange={setFieldValue}
                onTouch={setFieldTouched}
                error={touched.userID && errors.userID}
              />

              <FormInput
                label="Email"
                placeholder="email@sakec.ac.in"
                autoCorrect={false}
                returnKeyType="next"
                icon="ios-mail"
                name="email"
                value={values.email}
                onChange={setFieldValue}
                onTouch={setFieldTouched}
                error={touched.email && errors.email}
              />

              <FormInput
                label="Password"
                placeholder="Your Password"
                autoCorrect={false}
                secureTextEntry
                returnKeyType="next"
                icon="md-key"
                name="password"
                value={values.password}
                onChange={setFieldValue}
                onTouch={setFieldTouched}
                error={touched.password && errors.password}
              />

              <FormInput
                label="Confirm Password"
                placeholder="Your Password"
                autoCorrect={false}
                secureTextEntry
                returnKeyType="go"
                icon="md-key"
                name="password2"
                value={values.password2}
                onChange={setFieldValue}
                onTouch={setFieldTouched}
                error={touched.password && errors.password2}
              />

              <View style={styles.buttonContainer}>
                <TouchableOpacity
                  style={styles.button}
                  onPress={handleSubmit}
                  disabled={!isValid}
                >
                  <Text style={styles.buttonText}>REGISTER</Text>
                </TouchableOpacity>

                <HorizontalRule width="80%" />
              </View>
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
  },
  label: {
    fontFamily: "Rubik-Regular",
    color: "#333333"
  },
  error: {
    fontWeight: "500",
    color: "red",
    opacity: 0.7
  },
  androidPickerView: {
    ...Platform.select({
      android: {
        borderWidth: 1,
        borderColor: "rgba(172, 172, 172, 0.7)",
        marginBottom: 20,
        borderRadius: 5,
        height: 45,
        justifyContent: "center"
      }
    })
  }
});
