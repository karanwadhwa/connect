import React, { Component } from "react";
import { Linking, StyleSheet, Alert } from "react-native";
import {
  View,
  Title,
  Subtitle,
  Text,
  Divider,
  TouchableOpacity
} from "@shoutem/ui";
import Accordion from "react-native-collapsible/Accordion";
import { startCase } from "lodash";

export class MenteeAccordion extends Component {
  state = {
    selectedMentee: []
  };

  _renderHeader = mentee => {
    return (
      <View>
        <View
          styleName="horizontal space-between v-center"
          style={{ paddingVertical: 5 }}
        >
          <Title>{startCase(`${mentee.fname} ${mentee.lname}`)}</Title>
          <Subtitle>{mentee.courseDetails.class}</Subtitle>
        </View>
        <Divider styleName="line" />
      </View>
    );
  };

  _renderContent = mentee => {
    return (
      <View style={styles.content}>
        <View
          styleName="horizontal space-between v-center"
          style={{ paddingVertical: 5 }}
        >
          <Subtitle>Registration No.</Subtitle>
          <Text>{mentee.userID}</Text>
        </View>
        <Divider styleName="line" />
        <View
          styleName="horizontal space-between v-center"
          style={{ paddingVertical: 5 }}
        >
          <Subtitle>Smart Card ID</Subtitle>
          <Text>{mentee.smartCardID}</Text>
        </View>
        <Divider styleName="line" />
        <View
          styleName="horizontal space-between v-center"
          style={{ paddingVertical: 5 }}
        >
          <Subtitle>Roll Number</Subtitle>
          <Text>{mentee.courseDetails.rollNo}</Text>
        </View>
        <Divider styleName="line" />
        <View
          styleName="horizontal space-between v-center"
          style={{ paddingVertical: 5 }}
        >
          <Subtitle>Phone</Subtitle>
          <Text
            style={styles.link}
            onPress={() => Linking.openURL(`tel:${mentee.phone}`)}
          >
            {mentee.phone}
          </Text>
        </View>
        <Divider styleName="line" />
        <View
          styleName="horizontal space-between v-center"
          style={{ paddingVertical: 5 }}
        >
          <Subtitle>Email</Subtitle>
          <Text
            style={styles.link}
            onPress={() => Linking.openURL(`mailto:${mentee.email}`)}
          >
            {mentee.email}
          </Text>
        </View>
        <Divider styleName="line" />
      </View>
    );
  };

  _selectMentee = selectedMentee => {
    this.setState({ selectedMentee });
  };

  render() {
    return (
      <Accordion
        sections={this.props.mentees}
        activeSections={this.state.selectedMentee}
        renderHeader={this._renderHeader}
        renderContent={this._renderContent}
        onChange={this._selectMentee}
        touchableComponent={TouchableOpacity}
        duration={300}
        multipleSelect={false}
      />
    );
  }
}

export default MenteeAccordion;

const styles = StyleSheet.create({
  content: {
    backgroundColor: "#F4FBFF",
    paddingHorizontal: 10
  },
  link: {
    color: "#1D5CA0",
    opacity: 0.75
  }
});
