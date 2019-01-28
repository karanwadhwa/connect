import React, { Component, Fragment } from "react";
import { StyleSheet } from "react-native";
import { connect } from "react-redux";
import { View, Button, Icon, Text } from "@shoutem/ui";
import { likePost, selectPost } from "../../store/actions/posts";

class PostFooter extends Component {
  checkLiked = () => {
    const like = this.props.post.likes.some(
      item => item.userKey === this.props.user._id
    );

    if (like) {
      return (
        <Fragment>
          <Icon name="like" style={styles.liked} />
          <Text style={styles.liked}>LIKE</Text>
        </Fragment>
      );
    } else {
      return (
        <Fragment>
          <Icon name="like" />
          <Text>LIKE</Text>
        </Fragment>
      );
    }
  };

  openPost = () => {
    this.props.selectPost(this.props.post);
    this.props.navigation.navigate("Post");
  };

  render() {
    return (
      <View styleName="horizontal">
        <Button
          styleName="full-width muted"
          onPress={() =>
            this.props.likePost(this.props.accessToken, this.props.post._id)
          }
        >
          {this.checkLiked()}
        </Button>
        <Button styleName="full-width muted" onPress={this.openPost}>
          <Icon name="comment" />
          <Text>COMMENT</Text>
        </Button>
      </View>
    );
  }
}

const mapStateToProps = state => {
  return {
    accessToken: state.auth.accessToken,
    user: state.auth.user,
    selectedPost: state.posts.selectedPost
  };
};

export default connect(
  mapStateToProps,
  { likePost, selectPost }
)(PostFooter);

const styles = StyleSheet.create({
  liked: {
    color: "#107AFB",
    opacity: 1
  }
});
