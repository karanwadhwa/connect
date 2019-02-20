import React, { Component } from "react";
import { StyleSheet } from "react-native";
import { View, Row, Text, Title, Image } from "@shoutem/ui";
import { upperFirst } from "lodash";

class ProfileHeader extends Component {
  render() {
    const { user, profile } = this.props;
    return (
      <View style={styles.topContainer}>
        <Row styleName="horizontal" style={{ backgroundColor: "#DDEEFF" }}>
          <Image
            style={styles.avatar}
            source={{
              uri: user.avatar
            }}
          />
          <View styleName="vertical ">
            <Title>
              {upperFirst(user.fname)} {upperFirst(user.lname)}
            </Title>
            <Text>
              {upperFirst(user.userID)}
              {user.userType === "student" ? ` · ${profile.smartCardID}` : ""}
            </Text>
            <Text>{user.email}</Text>
          </View>
        </Row>
      </View>
    );
  }
}

export default ProfileHeader;

const styles = StyleSheet.create({
  topContainer: {
    backgroundColor: "#DDEEFF",
    paddingVertical: 15,
    elevation: 2
  },
  avatar: {
    width: 80,
    height: 80,
    borderRadius: 30,
    paddingRight: 10
  }
});
