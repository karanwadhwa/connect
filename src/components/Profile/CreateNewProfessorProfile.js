import React, { Component } from "react";
import { connect } from "react-redux";
import {
  View,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  Platform,
  StatusBar,
  AsyncStorage
} from "react-native";
import { Text, Subtitle, Divider } from "@shoutem/ui";
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";
import { Formik } from "formik";
import * as Yup from "yup";

import API from "../../config/api";

import FormInput from "../common/FormInput";
import ActionSheetInput from "../common/ActionSheetInput";
import HorizontalRule from "../common/HorizontalRule";

class CreateNewProfessorProfile extends Component {
  logout = async () => {
    await AsyncStorage.clear();
    this.props.navigation.navigate("AuthLoadingScreen");
  };

  _handleSubmit = (values, bag) => {
    API.post("/api/profile/create/professor", values, {
      headers: {
        Authorization: this.props.accessToken
      }
    })
      .then(response => {
        this.props.navigation.navigate("AuthLoadingScreen");
      })
      .catch(error => {
        bag.setSubmitting(false);
        bag.setErrors(error.response.data);
      });
  };

  render() {
    return (
      <View style={[styles.container, styles.androidHeader]}>
        <KeyboardAwareScrollView
          enableAutomaticScroll={true}
          extraScrollHeight={150}
          enableOnAndroid={true}
        >
          <View style={styles.titleContainer}>
            <Text style={styles.title}>Create Profile</Text>
          </View>
          <View style={styles.formContainer}>
            <Formik
              initialValues={{
                department: "",
                designation: ""
              }}
              onSubmit={this._handleSubmit}
              validationSchema={Yup.object().shape({
                department: Yup.string().required("Select your department"),
                designation: Yup.string().required("Select your designation")
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
                  <View style={styles.sectionDivider}>
                    <Divider styleName="line" />
                    <Subtitle styleName="h-center">
                      Personal Information
                    </Subtitle>
                    <Divider styleName="line" />
                  </View>
                  <FormInput
                    label="Phone No."
                    placeholder="10 digit phone no. (optional)"
                    keyboardType="phone-pad"
                    autoCorrect={false}
                    returnKeyType="next"
                    icon="md-call"
                    name="phone"
                    value={values.phone}
                    onChange={setFieldValue}
                    onTouch={setFieldTouched}
                    error={errors.phone}
                  />
                  <Text style={styles.label}>Bio</Text>
                  <Text style={styles.error}>{errors.bio}</Text>
                  <View style={[styles.inputBox, { height: 100 }]}>
                    <TextInput
                      value={values.bio}
                      placeholder="Add a short bio to tell people more about yourself. (optional)"
                      onChangeText={value => setFieldValue("bio", value)}
                      textAlignVertical="top"
                      multiline={true}
                      returnKeyType="next"
                      style={{ width: "100%", height: "100%" }}
                      placeholderTextColor="rgba(172,172,172,0.5)"
                    />
                  </View>
                  <View style={styles.sectionDivider}>
                    <Divider styleName="line" />
                    <Subtitle styleName="h-center">
                      Professional Information
                    </Subtitle>
                    <Divider styleName="line" />
                  </View>

                  <ActionSheetInput
                    label="Department"
                    error={touched.department && errors.department}
                    name="department"
                    value={values.department}
                    placeholder="Department"
                    title="Department"
                    message="Select your Department"
                    options={[
                      "First Year Engineering",
                      "Computers",
                      "Electronics",
                      "Information Technology",
                      "Electronics & Telecommunications"
                    ]}
                    onChange={setFieldValue}
                    onTouch={setFieldTouched}
                  />

                  <ActionSheetInput
                    label="Designation"
                    error={touched.designation && errors.designation}
                    name="designation"
                    value={values.designation}
                    placeholder="Designation"
                    title="Designation"
                    message="Select your Designation"
                    options={[
                      "Head of Department",
                      "Professor",
                      "Associate Professor",
                      "Assistant Professor",
                      "Laboratory Assistant"
                    ]}
                    onChange={setFieldValue}
                    onTouch={setFieldTouched}
                  />

                  <View style={styles.buttonContainer}>
                    <Text style={styles.error}>{errors.existingProfile}</Text>
                    <TouchableOpacity
                      style={styles.button}
                      onPress={handleSubmit}
                      disabled={!isValid}
                    >
                      <Text style={styles.buttonText}>SUBMIT</Text>
                    </TouchableOpacity>
                    <TouchableOpacity onPress={this.logout}>
                      <Text
                        style={{
                          color: "red",
                          fontFamily: "nunito-extra-bold"
                        }}
                      >
                        Cancel
                      </Text>
                    </TouchableOpacity>
                    <HorizontalRule width="80%" />
                  </View>
                </React.Fragment>
              )}
            />
          </View>
        </KeyboardAwareScrollView>
      </View>
    );
  }
}

const mapStateToProps = state => {
  return {
    accessToken: state.auth.accessToken
  };
};

export default connect(mapStateToProps)(CreateNewProfessorProfile);

const styles = StyleSheet.create({
  container: {
    flex: 1
  },
  formContainer: {
    justifyContent: "flex-start",
    padding: 30
  },
  titleContainer: {
    alignItems: "center",
    paddingTop: 40
  },
  title: {
    fontSize: 25,
    fontFamily: "nunito-regular",
    color: "#333333",
    opacity: 0.6
  },
  sectionDivider: {
    marginVertical: 20,
    backgroundColor: "#F3F3F3"
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
  inputBox: {
    height: 45,
    borderWidth: 1,
    borderColor: "rgba(172,172,172,0.7)",
    marginBottom: 20,
    paddingHorizontal: 10,
    borderRadius: 5,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center"
  },
  buttonContainer: {
    marginTop: 10,
    justifyContent: "center",
    flexDirection: "column",
    alignItems: "center"
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
