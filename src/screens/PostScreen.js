import React, { Component } from "react";
import { View, Text, StyleSheet } from "react-native";
import { connect } from "react-redux";

class PostScreen extends Component {
  render() {
    return (
      <View style={styles.container}>
        <Text>Post Screen</Text>
        <Text>{this.props.selectedPost}</Text>
      </View>
    );
  }
}

mapStateToProps = state => {
  return {
    selectedPost: state.posts.selectedPost
  };
};

export default connect(mapStateToProps)(PostScreen);

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center"
  }
});
