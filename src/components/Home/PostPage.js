import React, { Component } from "react";
import {
  ScrollView,
  StyleSheet,
  RefreshControl,
  ActivityIndicator
} from "react-native";
import { connect } from "react-redux";
import { View, Row, Divider, Text, Caption } from "@shoutem/ui";

import PostHeader from "./PostHeader";
import CommentList from "./CommentList";

import { fetchSelectedPost } from "../../store/actions/posts";

class PostPage extends Component {
  handleRefresh = () => {
    this.props.fetchSelectedPost(
      this.props.accessToken,
      this.props.selectedPost.post._id
    );
  };

  renderPostPage = () => {
    const { body, likes, comments } = this.props.selectedPost.post;
    if (this.props.selectedPost.loading) {
      return (
        <ActivityIndicator size="large" style={styles.ActivityIndicator} />
      );
    } else {
      return (
        <ScrollView
          style={styles.container}
          refreshControl={
            <RefreshControl
              refreshing={this.props.selectedPost.refreshing}
              onRefresh={this.handleRefresh}
            />
          }
        >
          <PostHeader post={this.props.selectedPost.post} />
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
  };

  render() {
    return <View>{this.renderPostPage()}</View>;
  }
}

mapStateToProps = state => {
  return {
    accessToken: state.auth.accessToken,
    selectedPost: state.posts.selectedPost
  };
};

export default connect(
  mapStateToProps,
  { fetchSelectedPost }
)(PostPage);

const styles = StyleSheet.create({
  container: {
    //flex: 1,
    backgroundColor: "#fff"
  },
  meta: {
    color: "#107AFB",
    opacity: 0.8
  },
  ActivityIndicator: {
    flex: 1,
    alignSelf: "center",
    justifyContent: "center"
  }
});
