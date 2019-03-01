import React, { Component } from "react";
import { connect } from "react-redux";
import { ScrollView, StyleSheet } from "react-native";
import { View, Title, Subtitle, Text, Divider } from "@shoutem/ui";
import ActionButton from "react-native-action-button";
import Icon from "@expo/vector-icons/Ionicons";

import ProfileHeader from "./ProfileHeader";
import MenteeAccordion from "./MenteeAccordion";

class ProfessorProfile extends Component {
  renderBio = () => {
    if (this.props.profile.bio) {
      return (
        <View style={{ paddingTop: 15, paddingBottom: 10 }}>
          <Title>Bio</Title>
          <Text>{this.props.profile.bio}</Text>
        </View>
      );
    }
  };

  renderMentees = mentees => {
    if (mentees.length !== 0) {
      return (
        <View>
          <View style={styles.sectionDivider}>
            <Divider styleName="line" />
            <Subtitle styleName="h-center">Mentees</Subtitle>
            <Divider styleName="line" />
          </View>
          <MenteeAccordion mentees={mentees} />
        </View>
      );
    } else {
      return <Divider styleName="line" />;
    }
  };

  render() {
    const { user, profile } = this.props;

    return (
      <View style={styles.container}>
        <ScrollView>
          <ProfileHeader user={user} profile={profile} />
          {this.renderBio()}
          <View style={{ paddingTop: 7 }} />
          <View style={styles.sectionDivider}>
            <Divider styleName="line" />
            <Subtitle styleName="h-center">About</Subtitle>
            <Divider styleName="line" />
          </View>
          <View
            styleName="horizontal space-between v-center"
            style={styles.list}
          >
            <Title>Department</Title>
            <Subtitle>{profile.department}</Subtitle>
          </View>
          <Divider styleName="line" />
          <View
            styleName="horizontal space-between v-center"
            style={styles.list}
          >
            <Title>Designation</Title>
            <Subtitle>{profile.designation}</Subtitle>
          </View>
          {this.renderMentees(profile.mentees)}
        </ScrollView>

        <ActionButton buttonColor="#4290E1" hideShadow={true}>
          <ActionButton.Item
            buttonColor="#335577"
            title="Add Mentee"
            onPress={() => {}}
          >
            <Icon name="ios-people" style={styles.actionButtonIcon} />
          </ActionButton.Item>
          <ActionButton.Item
            buttonColor="#335577"
            title="Change Profile Picture"
            onPress={() => {}}
          >
            <Icon name="ios-images" style={styles.actionButtonIcon} />
          </ActionButton.Item>
        </ActionButton>
      </View>
    );
  }
}

const mapStateToProps = state => {
  return {
    user: state.auth.user,
    profile: state.profile.profileData
  };
};

export default connect(mapStateToProps)(ProfessorProfile);

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    paddingHorizontal: 15,
    paddingTop: 17
  },
  sectionDivider: {
    marginVertical: 10,
    backgroundColor: "#F3F3F3"
  },
  list: {
    paddingVertical: 5
  },
  actionButtonIcon: {
    fontSize: 24,
    height: 26,
    color: "#fff"
  }
});
