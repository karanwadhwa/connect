import React, { Component } from "react";
import { View, Text, ActivityIndicator, StyleSheet } from "react-native";
import { connect } from "react-redux";

import CreateNewStudentProfile from "./CreateNewStudentProfile";
import CreateNewProfessorProfile from "./CreateNewProfessorProfile";

class CreateProfile extends Component {
  render() {
    if (this.props.authLoading) {
      return (
        <ActivityIndicator size="large" style={styles.ActivityIndicator} />
      );
    } else {
      if (this.props.user.userType === "student") {
        return <CreateNewStudentProfile navigation={this.props.navigation} />;
      } else if (this.props.user.userType === "professor") {
        return <CreateNewProfessorProfile navigation={this.props.navigation} />;
      }

      return (
        <View>
          <Text>User Type is neither student nor professor</Text>
        </View>
      );
    }
  }
}

const mapStateToProps = state => {
  return {
    user: state.auth.user,
    authLoading: state.auth.loading
  };
};

export default connect(mapStateToProps)(CreateProfile);

const styles = StyleSheet.create({
  ActivityIndicator: {
    flex: 1,
    alignSelf: "center",
    justifyContent: "center"
  }
});
