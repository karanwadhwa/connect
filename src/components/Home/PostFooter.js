import React from "react";
import { View, Button, Icon, Text } from "@shoutem/ui";

const PostFooter = props => {
  return (
    <View styleName="horizontal">
      <Button styleName="full-width muted">
        <Icon name="like" />
        <Text>LIKE</Text>
      </Button>
      <Button styleName="full-width muted">
        <Icon name="comment" />
        <Text>COMMENT</Text>
      </Button>
    </View>
  );
};

export default PostFooter;
