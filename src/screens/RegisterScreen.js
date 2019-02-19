import React, { Component } from "react";

import RegisterPage from "../components/Register/RegisterPage";

class RegisterScreen extends Component {
  render() {
    return <RegisterPage navigation={this.props.navigation} />;
  }
}

export default RegisterScreen;
