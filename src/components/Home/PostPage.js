import React, { Component } from "react";
import {
  ScrollView,
  StyleSheet,
  RefreshControl,
  ActivityIndicator,
  TouchableOpacity,
  KeyboardAvoidingView,
  Alert
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
import FIcon from "@expo/vector-icons/Feather";
import Ionicon from "@expo/vector-icons/Ionicons";

import PostHeader from "./PostHeader";
import CommentList from "./CommentList";

import {
  fetchSelectedPost,
  commentPost,
  deletePost
} from "../../store/actions/posts";

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
          onPress: () => {
            this.props.deletePost(
              this.props.accessToken,
              this.props.selectedPost.post._id
            );

            this.props.navigation.navigate("Home");
          }
        }
      ]
    );
  };

  deleteComponent = () => {
    const { selectedPost, user } = this.props;
    if (selectedPost.post.userKey === user._id || user.userType === "admin") {
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

  renderPostPage = () => {
    if (this.props.selectedPost.loading) {
      return (
        <ActivityIndicator size="large" style={styles.ActivityIndicator} />
      );
    } else {
      const { body, likes, comments } = this.props.selectedPost.post;
      return (
        <KeyboardAvoidingView
          behavior="position"
          keyboardVerticalOffset={80}
          enabled
        >
          <ScrollView
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
                <Text styleName="multiline" selectable={true}>
                  {body}
                </Text>
                <View
                  styleName="horizontal space-between"
                  style={{ paddingTop: 5 }}
                >
                  <View styleName="horizontal">
                    <Caption styleName="bold" style={styles.meta}>
                      {likes.length} {likes.length === 1 ? "Like" : "Likes"}
                      {"\t \t"}
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
    return <View style={styles.container}>{this.renderPostPage()}</View>;
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
  { fetchSelectedPost, commentPost, deletePost }
)(PostPage);

const styles = StyleSheet.create({
  container: {
    flex: 1
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
