import React from "react";
import { StyleSheet } from "react-native";
import { View, Row, Caption, Text } from "@shoutem/ui";

const PostContent = ({ post }) => {
  return (
    <Row>
      <View>
        <Text styleName="multiline">{post.body}</Text>
        <View styleName="horizontal" style={{ paddingTop: 5 }}>
          <Caption styleName="bold" style={styles.meta}>
            {post.likes.length} {post.likes.length === 1 ? "Like" : "Likes"}
            {"\t \t"}
          </Caption>
          <Caption styleName="bold" style={styles.meta}>
            {post.comments.length}{" "}
            {post.comments.length === 1 ? "Comment" : "Comments"}
          </Caption>
        </View>
      </View>
    </Row>
  );
};

export default PostContent;

const styles = StyleSheet.create({
  meta: {
    color: "#107AFB",
    opacity: 0.8
  }
});
