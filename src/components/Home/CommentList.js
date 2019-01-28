import React, { Component } from "react";
import { FlatList, StyleSheet } from "react-native";
import {
  Row,
  Text,
  View,
  Image,
  Subtitle,
  Caption,
  Divider
} from "@shoutem/ui";
import moment from "moment";
import { startCase } from "lodash";

class CommentList extends Component {
  renderComment = ({ item }) => {
    return (
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
          <Text>{item.body}</Text>
        </View>
      </Row>
    );
  };

  render() {
    return (
      <View>
        <Row>
          <FlatList
            data={this.props.comments}
            renderItem={this.renderComment}
            keyExtractor={comment => comment._id}
          />
        </Row>
        <Divider styleName="line" />
      </View>
    );
  }
}

export default CommentList;

const styles = StyleSheet.create({
  avatar: {
    alignSelf: "flex-start"
  }
});
