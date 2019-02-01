import React, { Component } from "react";
import {
  ScrollView,
  StyleSheet,
  RefreshControl,
  ActivityIndicator,
  TouchableOpacity,
  KeyboardAvoidingView
} from "react-native";
import { connect } from "react-redux";
import {
  View,
  Row,
  Divider,
  Text,
  Caption,
  Image,
  TextInput
} from "@shoutem/ui";
import Ionicon from "@expo/vector-icons/Ionicons";

import PostHeader from "./PostHeader";
import CommentList from "./CommentList";

import { fetchSelectedPost, commentPost } from "../../store/actions/posts";

class PostPage extends Component {
  constructor(props) {
    super(props);
    this.state = { comment: "" };
  }
  handleRefresh = () => {
    this.props.fetchSelectedPost(
      this.props.accessToken,
      this.props.selectedPost.post._id
    );
  };

  handleSubmit = () => {
    const newComment = {
      body: this.state.comment
    };

    this.props.commentPost(
      this.props.accessToken,
      this.props.selectedPost.post._id,
      newComment
    );

    this.setState({ comment: "" });
  };

  renderPostPage = () => {
    const { body, likes, comments } = this.props.selectedPost.post;
    if (this.props.selectedPost.loading) {
      return (
        <ActivityIndicator size="large" style={styles.ActivityIndicator} />
      );
    } else {
      return (
        <KeyboardAvoidingView
          behavior="position"
          keyboardVerticalOffset={80}
          enabled
        >
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
            <Row
              styleName="small"
              style={{
                flex: 1,
                justifyContent: "space-between"
              }}
            >
              <Image
                styleName="small-avatar"
                source={{
                  uri: this.props.user.avatar
                }}
              />
              <TextInput
                placeholder="Add a Comment"
                multiline={true}
                onChangeText={comment => this.setState({ comment })}
                value={this.state.comment}
                selectionColor="cyan"
                style={{
                  paddingVertical: 2,
                  width: "75%"
                }}
              />
              <TouchableOpacity
                style={{
                  padding: 20
                }}
                onPress={this.handleSubmit}
              >
                <Ionicon name="ios-send" size={24} />
              </TouchableOpacity>
            </Row>
            <Divider styleName="line" />
          </ScrollView>
        </KeyboardAvoidingView>
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
    user: state.auth.user,
    selectedPost: state.posts.selectedPost
  };
};

export default connect(
  mapStateToProps,
  { fetchSelectedPost, commentPost }
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
