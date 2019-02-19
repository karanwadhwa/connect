import React, { Component } from "react";
import { View, StatusBar, Platform, StyleSheet } from "react-native";
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";

import RegisterTitle from "./RegisterTitle";
import RegistrationForm from "./RegistrationForm";
import RegisterBottom from "./RegisterBottom";

class RegisterPage extends Component {
  render() {
    return (
      <View style={[styles.container, styles.androidHeader]}>
        <KeyboardAwareScrollView
          enableAutomaticScroll={true}
          extraScrollHeight={150}
          enableOnAndroid={true}
        >
          <RegisterTitle />
          <RegistrationForm navigation={this.props.navigation} />
          <RegisterBottom navigation={this.props.navigation} />
        </KeyboardAwareScrollView>
      </View>
    );
  }
}

export default RegisterPage;

const styles = StyleSheet.create({
  container: {
    flex: 1
  }
});
