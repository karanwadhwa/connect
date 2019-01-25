import React from "react";
import { StyleSheet } from "react-native";
import { View, Row, Caption, Text } from "@shoutem/ui";

const PostContent = props => {
  return (
    <Row>
      <View>
        <Text styleName="multiline">
          Lorem ipsum dolor sit amet, consectetur adipisicing elit.
          Optioaccusantium incidunt temporibus excepturi dolore, velit illo
          dolorum dolor omnis, quidem deleniti, quas animi quia debitis.
          Blanditiis laboriosam deserunt perferendis velit, voluptates accusamus
          itaque impedit, hic sint et repellat cupiditate ducimus.
        </Text>
        <View styleName="horizontal" style={{ paddingTop: 5 }}>
          <Caption styleName="bold" style={styles.meta}>
            140 Likes{"\t \t"}
          </Caption>
          <Caption styleName="bold" style={styles.meta}>
            12 Comments
          </Caption>
        </View>
      </View>
    </Row>
  );
};

export default PostContent;

const styles = StyleSheet.create({
  meta: {
    color: "#107AFB",
    opacity: 0.8
  }
});
