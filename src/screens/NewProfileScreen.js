import React, { Component } from "react";
import { connect } from "react-redux";
import { View, StyleSheet } from "react-native";

import CreateProfile from "../components/Profile/CreateProfile";

import { setUser } from "../store/actions/auth";

class NewProfileScreen extends Component {
  componentDidMount() {
    this.props.setUser(this.props.accessToken);
  }

  render() {
    return (
      <View style={styles.container}>
        <CreateProfile navigation={this.props.navigation} />
      </View>
    );
  }
}

const mapStateToProps = state => {
  return {
    accessToken: state.auth.accessToken
  };
};

export default connect(
  mapStateToProps,
  { setUser }
)(NewProfileScreen);

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff"
  }
});
