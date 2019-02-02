import React, { Component } from "react";
import { View, StyleSheet } from "react-native";

import PostPage from "../components/Home/PostPage";

class PostScreen extends Component {
  render() {
    return (
      <View style={styles.container}>
        <PostPage navigation={this.props.navigation} />
      </View>
    );
  }
}

export default PostScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff"
  }
});
