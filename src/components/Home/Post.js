import React, { Component } from "react";
import { View, FlatList, Text } from "react-native";
import { connect } from "react-redux";
import { Divider } from "@shoutem/ui";

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

  render() {
    return (
      <View style={{ marginVertical: 5 }}>
        <FlatList
          data={this.props.posts}
          renderItem={this.renderPost}
          keyExtractor={post => post._id}
        />
      </View>
    );
  }
}

const mapStateToProps = state => {
  return {
    posts: state.posts.posts
  };
};

export default connect(mapStateToProps)(Post);
