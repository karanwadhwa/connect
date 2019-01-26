import React, { Component } from "react";
import { View, FlatList, Text } from "react-native";
import { connect } from "react-redux";
import { Divider } from "@shoutem/ui";

import { fetchPosts } from "../../store/actions/posts";

import Card from "../common/Card";
import PostHeader from "./PostHeader";
import PostContent from "./PostContent";
import PostFooter from "./PostFooter";

export class Post extends Component {
  renderPost({ item }) {
    return (
      <Card>
        <PostHeader post={item} />
        <Divider styleName="line" />
        <PostContent post={item} />
        <Divider styleName="line" />
        <PostFooter />
      </Card>
    );
  }

  handleRefresh = () => {
    this.props.fetchPosts(this.props.accessToken);
  };

  render() {
    return (
      <View>
        <FlatList
          data={this.props.posts}
          renderItem={this.renderPost}
          keyExtractor={post => post._id}
          refreshing={this.props.refreshing}
          onRefresh={this.handleRefresh}
        />
      </View>
    );
  }
}

const mapStateToProps = state => {
  return {
    accessToken: state.auth.accessToken,
    posts: state.posts.posts,
    loading: state.posts.loading,
    refreshing: state.posts.refreshing
  };
};

export default connect(
  mapStateToProps,
  { fetchPosts }
)(Post);
