import React, { Component } from "react";
import { View, StatusBar, Platform, StyleSheet } from "react-native";
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";

import LoginTitle from "./LoginTitle";
import LoginForm from "./LoginForm";
import LoginBottom from "./LoginBottom";

class LoginPage extends Component {
  render() {
    return (
      <View style={[styles.container, styles.androidHeader]}>
        <KeyboardAwareScrollView
          enableAutomaticScroll={true}
          extraScrollHeight={80}
          enableOnAndroid={true}
        >
          <LoginTitle />
          <LoginForm navigation={this.props.navigation} />
          <LoginBottom navigation={this.props.navigation} />
        </KeyboardAwareScrollView>
      </View>
    );
  }
}

export default LoginPage;

const styles = StyleSheet.create({
  container: {
    flex: 1
    //backgroundColor: "#3498db"
  },
  androidHeader: {
    ...Platform.select({
      android: {
        paddingTop: StatusBar.currentHeight
      }
    })
  }
});
