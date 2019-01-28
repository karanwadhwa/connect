import React, { Component } from "react";
import { ScrollView, StyleSheet } from "react-native";
import { connect } from "react-redux";
import { View, Row, Divider, Text, Caption } from "@shoutem/ui";

import PostHeader from "./PostHeader";
import CommentList from "./CommentList";

class PostPage extends Component {
  render() {
    const { body, likes, comments } = this.props.selectedPost;
    return (
      <ScrollView style={styles.container}>
        <PostHeader post={this.props.selectedPost} />
        <Divider styleName="line" />
        <Row>
          <View>
            <Text styleName="multiline">{body}</Text>
            <View styleName="horizontal" style={{ paddingTop: 5 }}>
              <Caption styleName="bold" style={styles.meta}>
                {likes.length} {likes.length === 1 ? "Like" : "Likes"}
                {"\t \t"}
              </Caption>
              <Caption styleName="bold" style={styles.meta}>
                {comments.length}{" "}
                {comments.length === 1 ? "Comment" : "Comments"}
              </Caption>
            </View>
          </View>
        </Row>
        <Divider styleName="line" />
        <CommentList comments={comments} />
        <Divider styleName="line" />
      </ScrollView>
    );
  }
}

mapStateToProps = state => {
  return {
    selectedPost: state.posts.selectedPost
  };
};

export default connect(mapStateToProps)(PostPage);

const styles = StyleSheet.create({
  container: {
    //flex: 1,
    backgroundColor: "#fff"
  },
  meta: {
    color: "#107AFB",
    opacity: 0.8
  }
});
