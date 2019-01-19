import React, { Component } from "react";
import {
  Text,
  View,
  StyleSheet,
  TouchableOpacity,
  Dimensions,
  StatusBar,
  Platform
} from "react-native";

const { width } = Dimensions.get("window");

class WelcomeScreen extends Component {
  render() {
    return (
      <View style={[styles.container, styles.androidHeader]}>
        <View style={styles.header} />
        <View style={styles.topSection}>
          <TouchableOpacity
            onPress={() => this.props.navigation.navigate("Login")}
          >
            <Text
              style={{
                fontFamily: "nunito-regular",
                fontSize: 40,
                opacity: 0.6,
                padding: 60
              }}
            >
              Login
            </Text>
          </TouchableOpacity>
        </View>
        <View style={styles.polyClip} />
        <View style={styles.bottomSection}>
          <TouchableOpacity
            onPress={() => this.props.navigation.navigate("Register")}
          >
            <Text
              style={{
                fontFamily: "nunito-regular",
                fontSize: 40,
                opacity: 0.6,
                padding: 60
              }}
            >
              Register
            </Text>
          </TouchableOpacity>
        </View>
        <View style={styles.footer} />
      </View>
    );
  }
}

export default WelcomeScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    //backgroundColor: "#E4E4E4",
    alignItems: "center",
    justifyContent: "center"
  },

  androidHeader: {
    ...Platform.select({
      android: {
        paddingTop: StatusBar.currentHeight
      }
    })
  },

  header: {
    height: 100,
    width: "100%",
    backgroundColor: "#E4E4E4"
  },
  footer: {
    height: 100,
    width: "100%",
    backgroundColor: "#F2F2F2"
  },

  polyClip: {
    backgroundColor: "transparent",
    borderStyle: "solid",
    // shape width
    borderRightWidth: width,
    // shape height
    borderTopWidth: 150,
    borderRightColor: "#F2F2F2",
    borderTopColor: "#E4E4E4"
  },

  topSection: {
    backgroundColor: "#E4E4E4",
    width: "100%",
    flex: 1,
    //height: height / 2 - 50,
    alignItems: "center",
    justifyContent: "center"
  },

  bottomSection: {
    backgroundColor: "#F2F2F2",
    width: "100%",
    flex: 1,
    //height: height / 2 - 50,
    alignItems: "center",
    justifyContent: "center"
  }
});
