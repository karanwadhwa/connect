import React, { Component } from "react";
import { connect } from "react-redux";
import {
  ScrollView,
  TouchableOpacity,
  TextInput,
  StyleSheet,
  Keyboard
} from "react-native";
import { View, Title, Subtitle, Text, Caption, Divider } from "@shoutem/ui";
import ActionButton from "react-native-action-button";
import Icon from "@expo/vector-icons/Ionicons";
import Modal from "react-native-modal";
import { startCase, has } from "lodash";

import API from "../../config/api";
import { fetchProfile } from "../../store/actions/profile";

import ProfileHeader from "./ProfileHeader";
import MenteeAccordion from "./MenteeAccordion";

class ProfessorProfile extends Component {
  state = {
    ismodalVisible: false,
    submitDisabled: true,
    regInput: "",
    studentProfile: {},
    error: ""
  };

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

  _openModal = () => this.setState({ isModalVisible: true });

  _closeModal = () => this.setState({ isModalVisible: false });

  fetchStudent = () => {
    Keyboard.dismiss();
    this.setState({ error: "" });
    API.get(`/api/profile/student/id=${this.state.regInput}`, {
      headers: {
        Authorization: this.props.accessToken
      }
    })
      .then(response => {
        this.setState({ studentProfile: response.data, submitDisabled: false });
      })
      .catch(error => this.setState({ error: error.response.data.err }));
  };

  addMentee = () => {
    API.post(
      "/api/profile/update/professor/mentee",
      { userID: this.state.regInput },
      {
        headers: {
          Authorization: this.props.accessToken
        }
      }
    )
      .then(response => {
        this.props.fetchProfile(this.props.accessToken);
        this._closeModal();
      })
      .catch(error =>
        this.setState({
          error:
            error.response.data.error || error.response.data.errors.noprofile,
          submitDisabled: true
        })
      );
  };

  renderModalContent = () => {
    if (this.state.studentProfile.fname) {
      const { fname, lname, department, mentor } = this.state.studentProfile;
      return (
        <View style={styles.listView}>
          <View
            styleName="horizontal space-between v-center"
            style={styles.list}
          >
            <Subtitle>Name</Subtitle>
            <Text>{startCase(`${fname} ${lname}`)}</Text>
          </View>
          <Divider styleName="line" />
          <View
            styleName="horizontal space-between v-center"
            style={styles.list}
          >
            <Subtitle>Department</Subtitle>
            <Text>{department}</Text>
          </View>
          <Divider styleName="line" />
          <View
            styleName="horizontal space-between v-center"
            style={styles.list}
          >
            <Subtitle>Class</Subtitle>
            <Text>{this.state.studentProfile.class}</Text>
          </View>
          <Divider styleName="line" />
          <View
            styleName="horizontal space-between v-center"
            style={styles.list}
          >
            <Subtitle>Mentor</Subtitle>
            <Text style={{ color: "red" }}>
              {mentor.name ? startCase(mentor.name) : "-"}
            </Text>
          </View>
          <Divider styleName="line" />
          <View
            styleName="horizontal space-between v-center"
            style={styles.list}
          >
            <Subtitle>Mentor ID</Subtitle>
            <Text style={{ color: "red" }}>
              {mentor.userID ? mentor.userID : "-"}
            </Text>
          </View>
        </View>
      );
    }
  };

  renderModal = () => (
    <View style={styles.modal}>
      <View style={styles.modalHeader}>
        <Title style={{ color: "#335577" }}>Add Mentee</Title>
      </View>
      <View style={styles.modalBody}>
        <View style={styles.inputBox}>
          <TextInput
            placeholder="Registration No."
            maxLength={5}
            keyboardType="number-pad"
            blurOnSubmit={true}
            value={this.state.regInput}
            onChangeText={regInput =>
              this.setState({
                regInput,
                error: "",
                studentProfile: {},
                submitDisabled: true
              })
            }
            style={{ width: "70%", height: "100%", paddingLeft: 10 }}
          />
          <TouchableOpacity style={{ padding: 10 }} onPress={this.fetchStudent}>
            <Text style={{ color: "#107AFB" }}>Fetch</Text>
          </TouchableOpacity>
        </View>
        {this.renderModalContent()}
      </View>
      <Caption style={{ color: "red", alignSelf: "center" }}>
        {this.state.error}
      </Caption>
      <Divider styleName="line" />
      <TouchableOpacity
        disabled={this.state.submitDisabled}
        style={styles.modalButton}
        onPress={this.addMentee}
      >
        <Text
          style={{
            color: this.state.submitDisabled
              ? "#999999"
              : !!this.state.studentProfile.mentor.name
              ? "red"
              : "#107AFB"
          }}
        >
          {has(this.state.studentProfile, "mentor.name")
            ? "Confirm Override"
            : "Confirm"}
        </Text>
      </TouchableOpacity>
      <Divider styleName="line" />
      <TouchableOpacity style={styles.modalButton} onPress={this._closeModal}>
        <Text>Cancel</Text>
      </TouchableOpacity>
    </View>
  );

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

        <Modal
          isVisible={this.state.isModalVisible}
          animationIn="fadeIn"
          animationOut="fadeOut"
          onBackdropPress={this._closeModal}
          onBackButtonPress={this._closeModal}
        >
          {this.renderModal()}
        </Modal>

        <ActionButton buttonColor="#4290E1" hideShadow={true}>
          <ActionButton.Item
            buttonColor="#335577"
            title="Add Mentee"
            onPress={this._openModal}
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
    accessToken: state.auth.accessToken,
    user: state.auth.user,
    profile: state.profile.profileData
  };
};

export default connect(
  mapStateToProps,
  { fetchProfile }
)(ProfessorProfile);

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
  },
  modal: {
    width: "100%",
    alignSelf: "center",
    backgroundColor: "#fff",
    borderRadius: 4
  },
  modalHeader: {
    padding: 20,
    marginTop: 15,
    alignItems: "center"
  },
  modalBody: {
    padding: 20,
    alignItems: "center"
  },
  inputBox: {
    height: 45,
    borderWidth: 0.5,
    borderColor: "rgba(172,172,172,0.5)",
    marginBottom: 20,
    borderRadius: 3,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center"
  },
  listView: {
    width: "100%"
  },
  modalButton: {
    alignItems: "center",
    padding: 15,
    width: "100%"
  }
});
