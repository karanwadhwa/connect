import React, { Component } from "react";
import { FlatList, StyleSheet } from "react-native";
import { connect } from "react-redux";
import { Row, Text, View, Image, Subtitle, Caption } from "@shoutem/ui";
import moment from "moment";
import { startCase } from "lodash";
import Swipeout from "react-native-swipeout";

import { deleteComment } from "../../store/actions/posts";

class CommentList extends Component {
  renderComment = ({ item }) => {
    const { accessToken, user, post, deleteComment } = this.props;
    let disabled = true;
    let close = true;

    if (
      post.author === `${user.fname} ${user.lname}` ||
      item.author === `${user.fname} ${user.lname}` ||
      user.userKey === "admin"
    ) {
      disabled = false;
      close = false;
    }

    return (
      <Swipeout
        right={[
          {
            text: "Delete",
            type: "delete",
            disabled,
            onPress: () => deleteComment(accessToken, post._id, item._id)
          }
        ]}
        autoClose={true}
      >
        <Row>
          <Image
            styleName="small-avatar"
            style={styles.avatar}
            source={{
              uri: item.avatar
            }}
          />
          <View>
            <View styleName="horizontal space-between">
              <Subtitle>{startCase(item.author)}</Subtitle>
              <Caption>{moment(item.date).fromNow()}</Caption>
            </View>
            <Text selectable={true}>{item.body}</Text>
          </View>
        </Row>
      </Swipeout>
    );
  };

  render() {
    return (
      <View>
        <FlatList
          data={this.props.comments}
          renderItem={this.renderComment}
          keyExtractor={comment => comment._id}
        />
      </View>
    );
  }
}

const mapStateToProps = state => {
  return {
    accessToken: state.auth.accessToken,
    user: state.auth.user,
    post: state.posts.selectedPost.post
  };
};

export default connect(
  mapStateToProps,
  { deleteComment }
)(CommentList);

const styles = StyleSheet.create({
  avatar: {
    alignSelf: "flex-start"
  }
});
