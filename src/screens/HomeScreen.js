import React, { Component } from "react";
import { Text, View, StyleSheet, AsyncStorage } from "react-native";
import { connect } from "react-redux";

import { fetchPosts } from "../store/actions/posts";

class HomeScreen extends Component {
  componentDidMount() {
    this.props.fetchPosts(this.props.accessToken);
  }

  render() {
    return (
      <View style={styles.container}>
        <Text>HomeScreen</Text>
      </View>
    );
  }
}

const mapStateToProps = state => {
  return {
    accessToken: state.auth.accessToken,
    posts: state.posts.posts
  };
};

export default connect(
  mapStateToProps,
  { fetchPosts }
)(HomeScreen);

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center"
  }
});
