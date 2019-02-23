import React, { Component } from "react";
import { connect } from "react-redux";
import { ScrollView, FlatList, StyleSheet } from "react-native";
import { View, Row, Text, Title, Subtitle, Divider } from "@shoutem/ui";
import { upperFirst } from "lodash";

import ProfileHeader from "./ProfileHeader";

class StudentProfile extends Component {
  renderBio = () => {
    if (this.props.profile.bio) {
      return (
        <View style={{ paddingTop: 15, paddingBottom: 10 }}>
          <Title>About</Title>
          <Text>{this.props.profile.bio}</Text>
        </View>
      );
    }
  };

  renderStudentBodies = () => {
    const { studentCouncils } = this.props.profile;
    let showSectionDivider = false;
    let sc = [];
    Object.keys(studentCouncils).forEach(key => {
      sc.push({ key, value: studentCouncils[key] });
      if (studentCouncils[key] !== null) showSectionDivider = true;
    });

    return (
      <View>
        {showSectionDivider ? (
          <View style={styles.sectionDivider}>
            <Divider styleName="line" />
            <Subtitle styleName="h-center">Student Bodies</Subtitle>
            <Divider styleName="line" />
          </View>
        ) : (
          <Divider styleName="line" />
        )}

        <FlatList
          data={sc}
          keyExtractor={item => item.key}
          renderItem={({ item }) => {
            if (item.value !== null) {
              return (
                <React.Fragment>
                  <View
                    styleName="horizontal space-between v-center"
                    style={styles.list}
                  >
                    <Title>{item.key}</Title>
                    <Subtitle>
                      {item.value == null ? "-" : upperFirst(item.value)}
                    </Subtitle>
                  </View>
                  <Divider styleName="line" />
                </React.Fragment>
              );
            }
          }}
        />
      </View>
    );
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
            <Subtitle styleName="h-center">Course Information</Subtitle>
            <Divider styleName="line" />
          </View>
          <View
            styleName="horizontal space-between v-center"
            style={styles.list}
          >
            <Title>Department</Title>
            <Subtitle>{profile.courseDetails.department}</Subtitle>
          </View>
          <Divider styleName="line" />
          <View
            styleName="horizontal space-between v-center"
            style={styles.list}
          >
            <Title>Course Year</Title>
            <Subtitle>{profile.courseDetails.year}</Subtitle>
          </View>
          <Divider styleName="line" />
          <View
            styleName="horizontal space-between v-center"
            style={styles.list}
          >
            <Title>Class</Title>
            <Subtitle>{profile.courseDetails.class}</Subtitle>
          </View>
          <Divider styleName="line" />
          <View
            styleName="horizontal space-between v-center"
            style={styles.list}
          >
            <Title>Batch</Title>
            <Subtitle>{profile.courseDetails.batch}</Subtitle>
          </View>
          <Divider styleName="line" />
          <View
            styleName="horizontal space-between v-center"
            style={styles.list}
          >
            <Title>Roll Number</Title>
            <Subtitle>{profile.courseDetails.rollNo}</Subtitle>
          </View>

          <View style={styles.sectionDivider}>
            <Divider styleName="line" />
            <Subtitle styleName="h-center">Mentor Information</Subtitle>
            <Divider styleName="line" />
          </View>
          <View
            styleName="horizontal space-between v-center"
            style={styles.list}
          >
            <Title>Mentor Name</Title>
            <Subtitle>{upperFirst(profile.mentor.name)}</Subtitle>
          </View>
          <Divider styleName="line" />
          <View
            styleName="horizontal space-between v-center"
            style={styles.list}
          >
            <Title>Staff ID</Title>
            <Subtitle>{upperFirst(profile.mentor.userID)}</Subtitle>
          </View>

          {this.renderStudentBodies()}
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

export default connect(mapStateToProps)(StudentProfile);

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
