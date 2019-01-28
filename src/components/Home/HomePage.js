import React, { Component } from "react";
import { View, StyleSheet, Button } from "react-native";

import Post from "./Post";

class HomePage extends Component {
  render() {
    return (
      <View style={styles.container}>
        <Post navigation={this.props.navigation} />
      </View>
    );
  }
}

export default HomePage;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff"
  }
});
