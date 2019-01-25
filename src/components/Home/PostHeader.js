import React from "react";
import { StyleSheet, FlatList } from "react-native";
import { View, Row, Title, Caption, Image } from "@shoutem/ui";

const PostHeader = props => {
  return (
    <Row style={{ alignItems: "flex-start" }}>
      <Image
        styleName="small-avatar"
        style={styles.avatar}
        source={{
          uri:
            "https://instagram.fnag1-2.fna.fbcdn.net/vp/06542b1b12d5f342201898eeea95d7e4/5CF5A358/t51.2885-19/s150x150/44200874_498526213889469_3207040831403851776_n.jpg?_nc_ht=instagram.fnag1-2.fna.fbcdn.net"
        }}
      />
      <View styleName="vertical">
        <View styleName="horizontal space-between">
          <Title>Karan Wadhwa</Title>
          <Caption>20 minutes ago</Caption>
        </View>
        <View styleName="horizontal">
          <FlatList
            horizontal
            data={[{ key: "Computers" }, { key: "Electronics" }]}
            renderItem={({ item }) => (
              <Caption style={styles.audienceBadge}>{item.key}</Caption>
            )}
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
