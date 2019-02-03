import React, { Component } from "react";
import {
  Text,
  View,
  ScrollView,
  KeyboardAvoidingView,
  TouchableOpacity,
  Alert,
  StyleSheet,
  Platform,
  StatusBar
} from "react-native";
import { WebBrowser } from "expo";
import { Formik } from "formik";
import * as Yup from "yup";

import FormInput from "../common/FormInput";
import HorizontalRule from "../common/HorizontalRule";

class CreatePostPage extends Component {
  _handleSubmit = (values, bag) => {
    Alert.alert(values.title, values.body);
  };

  render() {
    return (
      <ScrollView style={[styles.container, styles.androidHeader]}>
        <View style={styles.titleContainer}>
          <Text style={styles.title}>Create Post</Text>
        </View>
        <View style={styles.formContainer}>
          <KeyboardAvoidingView
          //enableAutomaticScroll={true}
          //enableOnAndroid={true}
          >
            <Formik
              initialValues={{ audience: [], body: "", title: "" }}
              onSubmit={this._handleSubmit}
              validationSchema={Yup.object().shape({
                body: Yup.string().required()
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
                    label="Title"
                    placeholder="Post Title"
                    returnKeyType="next"
                    blurOnSubmit={false}
                    name="title"
                    value={values.title}
                    onChange={setFieldValue}
                    onTouch={setFieldTouched}
                    error={errors.title}
                  />

                  <FormInput
                    label="Post Body"
                    multiline={true}
                    height={200}
                    textAlignVertical="top"
                    returnKeyType="go"
                    name="body"
                    value={values.body}
                    onChange={setFieldValue}
                    onTouch={setFieldTouched}
                    error={touched.post && errors.post}
                  />

                  <View style={styles.buttonContainer}>
                    <TouchableOpacity
                      style={styles.button}
                      onPress={handleSubmit}
                      disabled={!isValid}
                    >
                      <Text style={styles.buttonText}>SUBMIT</Text>
                    </TouchableOpacity>
                    <TouchableOpacity
                      style={{ width: "100%", alignItems: "center" }}
                      onPress={() =>
                        WebBrowser.openBrowserAsync(
                          "https://www.markdownguide.org/basic-syntax"
                        )
                      }
                    >
                      <Text
                        style={{ color: "#107AFB", fontFamily: "nunito-bold" }}
                      >
                        All posts are markdown compatible. Read more.
                      </Text>
                    </TouchableOpacity>
                  </View>
                  <HorizontalRule width="80%" />
                </React.Fragment>
              )}
            />
          </KeyboardAvoidingView>
        </View>
      </ScrollView>
    );
  }
}

export default CreatePostPage;

const styles = StyleSheet.create({
  container: {
    flex: 1
  },
  androidHeader: {
    ...Platform.select({
      android: {
        paddingTop: StatusBar.currentHeight
      }
    })
  },
  titleContainer: {
    alignItems: "center",
    paddingTop: 30
  },
  title: {
    fontSize: 25,
    fontFamily: "nunito-regular",
    color: "#333333",
    opacity: 0.6
  },
  formContainer: {
    flex: 1,
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
