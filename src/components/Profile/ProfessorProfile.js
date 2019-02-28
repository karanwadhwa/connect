import React, { Component } from "react";
import { connect } from "react-redux";
import { ScrollView, StyleSheet } from "react-native";
import { View, Title, Subtitle, Text, Divider } from "@shoutem/ui";

import ProfileHeader from "./ProfileHeader";

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
        </View>
      );
    } else {
      return <Divider styleName="line" />;
    }
  };

  render() {
    const { user, profile } = this.props;

    return (
      <ScrollView>
        <View style={styles.container}>
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
        </View>
      </ScrollView>
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
  }
});
