import React, { Component } from "react";
import { connect } from "react-redux";
import { Text, View } from "react-native";

import StudentProfile from "./StudentProfile";
import ProfessorProfile from "./ProfessorProfile";

export class ProfilePage extends Component {
  renderProfile = () => {
    if (this.props.user.userType === "student") {
      return <StudentProfile />;
    } else {
      return <ProfessorProfile />;
    }
  };

  render() {
    return <View>{this.renderProfile()}</View>;
  }
}

const mapStateToProps = state => {
  return {
    user: state.auth.user
  };
};

export default connect(mapStateToProps)(ProfilePage);
