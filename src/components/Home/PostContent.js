import React, { Component } from "react";
import { StyleSheet } from "react-native";
import { View, Row, Caption, Text } from "@shoutem/ui";

class PostContent extends Component {
  render() {
    const { body, likes, comments } = this.props.post;
    return (
      <Row>
        <View>
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
        </View>
      </Row>
    );
  }
}

export default PostContent;

const styles = StyleSheet.create({
  meta: {
    color: "#107AFB",
    opacity: 0.8
  }
});
