import React, { Component } from "react";
import { StyleSheet, TouchableOpacity } from "react-native";
import { connect } from "react-redux";
import { View, Row, Caption, Text } from "@shoutem/ui";

import { selectPost } from "../../store/actions/posts";

class PostContent extends Component {
  openPost = () => {
    this.props.selectPost(this.props.post);
    this.props.navigation.navigate("Post");
  };

  render() {
    const { body, likes, comments } = this.props.post;
    return (
      <Row>
        <TouchableOpacity onPress={this.openPost}>
          <Text styleName="multiline">{body}</Text>
          <View styleName="horizontal" style={{ paddingTop: 5 }}>
            <Caption styleName="bold" style={styles.meta}>
              {likes.length} {likes.length === 1 ? "Like" : "Likes"}
              {"\t \t"}
            </Caption>
            <Caption styleName="bold" style={styles.meta}>
              {comments.length} {comments.length === 1 ? "Comment" : "Comments"}
            </Caption>
          </View>
        </TouchableOpacity>
      </Row>
    );
  }
}

export default connect(
  null,
  { selectPost }
)(PostContent);

const styles = StyleSheet.create({
  meta: {
    color: "#107AFB",
    opacity: 0.8
  }
});
