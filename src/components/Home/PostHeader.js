import React from "react";
import { StyleSheet, FlatList } from "react-native";
import { View, Row, Title, Caption, Image } from "@shoutem/ui";
import { startCase } from "lodash";

const PostHeader = ({ post }) => {
  return (
    <Row style={{ alignItems: "flex-start" }}>
      <Image
        styleName="small-avatar"
        style={styles.avatar}
        source={{
          uri: post.avatar
        }}
      />
      <View styleName="vertical">
        <View styleName="horizontal space-between">
          <Title>{startCase(post.author)}</Title>
          <Caption>{post.date}</Caption>
        </View>
        <View styleName="horizontal">
          <FlatList
            horizontal
            data={post.audience}
            renderItem={({ item }) => (
              <Caption style={styles.audienceBadge}>{startCase(item)}</Caption>
            )}
            keyExtractor={item => item}
          />
        </View>
      </View>
    </Row>
  );
};

export default PostHeader;

const styles = StyleSheet.create({
  avatar: {
    width: 50,
    height: 50
  },
  audienceBadge: {
    backgroundColor: "#DDEEFF",
    marginRight: 5,
    paddingHorizontal: 3
  }
});
