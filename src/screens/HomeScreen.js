import React, { Component } from "react";
import { Text, View, StyleSheet, ActivityIndicator } from "react-native";
import { connect } from "react-redux";

import { fetchPosts } from "../store/actions/posts";
import { fetchProfile } from "../store/actions/profile";
import { setUser } from "../store/actions/auth";

import HomePage from "../components/Home/HomePage";

class HomeScreen extends Component {
  componentDidMount() {
    this.props.fetchPosts(this.props.accessToken);
    this.props.fetchProfile(this.props.accessToken);
    this.props.setUser(this.props.accessToken);
  }

  renderHomescreen() {
    if (this.props.postLoading) {
      return (
        <ActivityIndicator size="large" style={styles.ActivityIndicator} />
      );
    } else {
      return <HomePage navigation={this.props.navigation} />;
    }
  }

  render() {
    return <View style={styles.container}>{this.renderHomescreen()}</View>;
  }
}

const mapStateToProps = state => {
  return {
    accessToken: state.auth.accessToken,
    posts: state.posts.posts,
    postLoading: state.posts.loading,
    profile: state.profile.profileData,
    profileLoading: state.profile.profileLoading
  };
};

export default connect(
  mapStateToProps,
  { fetchPosts, fetchProfile, setUser }
)(HomeScreen);

const styles = StyleSheet.create({
  container: { flex: 1 },
  ActivityIndicator: {
    flex: 1,
    alignSelf: "center",
    justifyContent: "center"
  }
});
