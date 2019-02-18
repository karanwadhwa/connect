import React, { Component } from "react";
import { StyleSheet, Alert, TouchableOpacity } from "react-native";
import { connect } from "react-redux";
import { View, Row, Caption, Text } from "@shoutem/ui";

import { selectPost, deletePost } from "../../store/actions/posts";
import FIcon from "@expo/vector-icons/Feather";

class PostContent extends Component {
  openPost = () => {
    this.props.selectPost(this.props.post);
    this.props.navigation.navigate("Post");
  };

  deletePost = () => {
    Alert.alert(
      "Wait, are you sure about this?",
      "You are about to delete this post. Once deleted, all post data will be lost in the depths of space forever and ever.",
      [
        {
          text: "No, Take me back.",
          style: "cancel"
        },
        {
          text: "Cool! Delete it.",
          onPress: () =>
            this.props.deletePost(this.props.accessToken, this.props.post._id)
        }
      ]
    );
  };

  deleteComponent = () => {
    const { post, user } = this.props;
    if (post.userKey === user._id || user.userType === "admin") {
      return (
        <TouchableOpacity styleName="bold" onPress={this.deletePost}>
          <View styleName="horizontal v-center">
            <FIcon name="trash-2" color="red" size={12} />
            <Caption styleName="bold" style={{ color: "red", paddingLeft: 5 }}>
              Delete
            </Caption>
          </View>
        </TouchableOpacity>
      );
    }
  };

  render() {
    const { body, likes, comments } = this.props.post;
    return (
      <Row>
        <View>
          <TouchableOpacity onPress={this.openPost}>
            <Text styleName="multiline">{body}</Text>
          </TouchableOpacity>
          <View styleName="horizontal space-between" style={{ paddingTop: 5 }}>
            <View styleName="horizontal">
              <Caption styleName="bold" style={styles.meta}>
                {likes.length} {likes.length === 1 ? "Like" : "Likes"}
              </Caption>
              <Caption styleName="bold" style={styles.meta}>
                {comments.length}{" "}
                {comments.length === 1 ? "Comment" : "Comments"}
              </Caption>
            </View>
            {this.deleteComponent()}
          </View>
        </View>
      </Row>
    );
  }
}

const mapStateToProps = state => {
  return {
    accessToken: state.auth.accessToken,
    user: state.auth.user
  };
};

export default connect(
  mapStateToProps,
  { selectPost, deletePost }
)(PostContent);

const styles = StyleSheet.create({
  meta: {
    color: "#107AFB",
    opacity: 0.8,
    paddingRight: 15
  }
});
