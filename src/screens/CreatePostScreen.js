import React, { Component } from "react";
import CreatePostPage from "../components/NewPost/CreatePostPage";

class CreatePostScreen extends Component {
  render() {
    return <CreatePostPage navigation={this.props.navigation} />;
  }
}

export default CreatePostScreen;
