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
import { toUpper } from "lodash";

import FormInput from "../common/FormInput";
import ActionSheetInput from "../common/ActionSheetInput";
import HorizontalRule from "../common/HorizontalRule";

import API from "../../config/api";
import classArray from "../../config/constants/classArray";
//import mentorArray from "../../config/constants/mentorArray";

class CreateNewStudentProfile extends Component {
  logout = async () => {
    await AsyncStorage.clear();
    this.props.navigation.navigate("AuthLoadingScreen");
  };

  _handleSubmit = (values, bag) => {
    /* const mentor = mentorArray.find(
      mentor => mentor.name === values.mentorName
    );
    values.mentorID = mentor.id; */
    values.smartCardID = toUpper(values.smartCardID);
    values.batch = `${values.class}-${values.batch}`;
    API.post("/api/profile/create/student", values, {
      headers: {
        Authorization: this.props.accessToken
      }
    })
      .then(() => {
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
                smartCardID: "",
                //mentorName: "",
                //mentorID: "",
                department: "",
                year: "",
                class: "",
                rollNo: "",
                batch: ""
              }}
              onSubmit={this._handleSubmit}
              validationSchema={Yup.object().shape({
                smartCardID: Yup.string().required(
                  "Your Smart Card ID is required"
                ),
                //mentorName: Yup.string().required("*required"),
                phone: Yup.number().required("Phone number is required"),
                department: Yup.string().required("*required"),
                year: Yup.string().required("*required"),
                class: Yup.string().required("*required"),
                batch: Yup.string().required("*required"),
                rollNo: Yup.number()
                  .integer("Invalid Roll Number")
                  .min(1, "Invalid Roll Number")
                  .max(150, "Invalid Roll Number")
                  .required("Roll Number is required")
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
                    label="Smart Card"
                    placeholder="Smart Card ID"
                    autoCorrect={false}
                    returnKeyType="next"
                    icon="ios-card"
                    name="smartCardID"
                    value={values.fname}
                    onChange={setFieldValue}
                    onTouch={setFieldTouched}
                    error={touched.smartCardID && errors.smartCardID}
                  />
                  <FormInput
                    label="Phone"
                    placeholder="10 digit Phone number"
                    keyboardType="phone-pad"
                    autoCorrect={false}
                    returnKeyType="next"
                    icon="md-call"
                    name="phone"
                    value={values.phone}
                    onChange={setFieldValue}
                    onTouch={setFieldTouched}
                    error={touched.phone && errors.phone}
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
                  {/* <View style={styles.sectionDivider}>
                    <Divider styleName="line" />
                    <Subtitle styleName="h-center">Mentor Information</Subtitle>
                    <Divider styleName="line" />
                  </View> */}

                  {/* <ActionSheetInput
                    label="Mentor Name"
                    error={touched.mentorName && errors.mentorName}
                    name="mentorName"
                    value={values.mentorName}
                    placeholder="Mentor Name"
                    title="Mentor Name"
                    options={mentorArray.map(mentor => mentor.name)}
                    onChange={setFieldValue}
                    onTouch={setFieldTouched}
                  /> */}

                  <View style={styles.sectionDivider}>
                    <Divider styleName="line" />
                    <Subtitle styleName="h-center">Course Information</Subtitle>
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
                      "Computers",
                      "Electronics",
                      "Information Technology",
                      "Electronics & Telecommunications"
                    ]}
                    onChange={setFieldValue}
                    onTouch={setFieldTouched}
                  />

                  <ActionSheetInput
                    label="Year"
                    error={touched.year && errors.year}
                    name="year"
                    value={values.year}
                    placeholder="Current course year"
                    title="Course Year"
                    message="Select your current course year"
                    options={["FE", "SE", "TE", "BE"]}
                    onChange={setFieldValue}
                    onTouch={setFieldTouched}
                  />

                  <ActionSheetInput
                    label="Class"
                    error={touched.class && errors.class}
                    name="class"
                    value={values.class}
                    placeholder="Current course year"
                    title="Class"
                    message="Select your current class"
                    options={classArray}
                    onChange={setFieldValue}
                    onTouch={setFieldTouched}
                  />

                  <ActionSheetInput
                    label="Batch"
                    error={touched.batch && errors.batch}
                    name="batch"
                    value={values.batch}
                    placeholder="Current class batch"
                    title="Class Batch"
                    message="Select your class batch"
                    options={["A", "B", "C", "D"]}
                    onChange={setFieldValue}
                    onTouch={setFieldTouched}
                  />

                  <FormInput
                    label="Roll Number"
                    placeholder="Class Roll Number"
                    keyboardType="numeric"
                    returnKeyType="next"
                    icon="ios-grid"
                    name="rollNo"
                    value={values.rollNo}
                    onChange={setFieldValue}
                    onTouch={setFieldTouched}
                    error={touched.rollNo && errors.rollNo}
                  />
                  <View style={styles.buttonContainer}>
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

export default connect(mapStateToProps)(CreateNewStudentProfile);

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
