import React, { Component } from "react";
import { connect } from "react-redux";
import {
  View,
  Text,
  ScrollView,
  TouchableOpacity,
  Alert,
  StyleSheet,
  Platform,
  StatusBar,
  TextInput
} from "react-native";
import { WebBrowser } from "expo";
import { ActionSheetCustom as ActionSheet } from "react-native-actionsheet";

import HorizontalRule from "../common/HorizontalRule";

import Ionicons from "@expo/vector-icons/Ionicons";

class CreatePostPage extends Component {
  constructor() {
    super();

    this.state = {
      title: "",
      postAudience: [],
      body: "",
      errors: {
        title: "",
        audience: "",
        body: ""
      }
    };
  }

  componentDidMount() {
    if (this.props.user.audience.length === 0) {
      this.setState({
        errors: { audience: "No audience has been assigned to you yet." }
      });
    }
  }

  handleSubmit = () => {
    Alert.alert(
      `Title: ${this.state.title}`,
      `Audience: ${this.state.audience}\nPost: ${this.state.body}`
    );
    console.log(this.state);
  };

  renderSelectedAudience = () => {};

  renderActionSheet = () => {
    return (
      <ActionSheet
        ref={o => (this.ActionSheet = o)}
        title="Select your audience"
        message="Only the audience you select will receive this post."
        options={this.props.user.audience.concat(["Cancel"])}
        cancelButtonIndex={this.props.user.audience.length}
        destructiveButtonIndex={this.props.user.audience.length}
        onPress={index => {
          console.log(index);
        }}
      />
    );
  };

  showActionSheet = () => {
    this.ActionSheet.show();
  };

  render() {
    return (
      <ScrollView style={[styles.container, styles.androidHeader]}>
        <View style={styles.titleContainer}>
          <Text style={styles.title}>Create Post</Text>
        </View>
        <View style={styles.formContainer}>
          <Text style={styles.label}>Title</Text>
          <Text style={styles.error}>{this.state.errors.title}</Text>
          <View style={styles.inputBox}>
            <TextInput
              value={this.state.title}
              onChangeText={title => this.setState({ title })}
              style={{ width: "100%" }}
              placeholder="Post Title (optional)"
              placeholderTextColor="rgba(172,172,172,0.5)"
            />
          </View>

          <View
            style={{
              backgroundColor: "",
              justifyContent: "space-between",
              flexDirection: "row"
            }}
          >
            <Text style={styles.label}>Audience</Text>
            <TouchableOpacity onPress={this.showActionSheet}>
              <Ionicons name="ios-add-circle-outline" size={18} />
            </TouchableOpacity>
          </View>
          <Text style={styles.error}>{this.state.errors.audience}</Text>
          <View style={{ marginBottom: 20 }} />
          {this.renderActionSheet()}

          <Text style={styles.label}>Post Body</Text>
          <Text style={styles.error}>{this.state.errors.body}</Text>
          <View style={[styles.inputBox, { height: 200 }]}>
            <TextInput
              value={this.state.body}
              onChangeText={body => this.setState({ body })}
              textAlignVertical="top"
              multiline={true}
              returnKeyType="go"
              style={{ width: "100%", height: "100%" }}
              placeholderTextColor="rgba(172,172,172,0.5)"
            />
          </View>

          <View style={styles.buttonContainer}>
            <TouchableOpacity style={styles.button} onPress={this.handleSubmit}>
              <Text style={styles.buttonText}>SUBMIT</Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={{ width: "100%", alignItems: "center" }}
              onPress={() =>
                WebBrowser.openBrowserAsync(
                  "https://www.markdownguide.org/basic-syntax"
                )
              }
            >
              <Text
                style={{
                  color: "#107AFB",
                  fontFamily: "nunito-bold",
                  textAlign: "center"
                }}
              >
                All posts are markdown compatible. Read more.
              </Text>
            </TouchableOpacity>
          </View>
          <HorizontalRule width="80%" />
        </View>
      </ScrollView>
    );
  }
}

const mapStateToProps = state => {
  return {
    accessToken: state.auth.accessToken,
    user: state.auth.user
  };
};

export default connect(mapStateToProps)(CreatePostPage);

const styles = StyleSheet.create({
  container: {
    flex: 1
  },
  androidHeader: {
    ...Platform.select({
      android: {
        paddingTop: StatusBar.currentHeight
      }
    })
  },
  titleContainer: {
    alignItems: "center",
    paddingTop: 30
  },
  title: {
    fontSize: 25,
    fontFamily: "nunito-regular",
    color: "#333333",
    opacity: 0.6
  },
  formContainer: {
    flex: 1,
    padding: 40
  },
  label: {
    fontFamily: "Rubik-Regular",
    color: "#333333"
  },
  error: {
    fontWeight: "500",
    color: "red",
    opacity: 0.7
  },
  inputBox: {
    height: 45,
    borderWidth: 1,
    borderColor: "rgba(172,172,172,0.7)",
    marginBottom: 20,
    paddingHorizontal: 10,
    borderRadius: 5,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center"
  },
  buttonContainer: {
    marginTop: 10,
    justifyContent: "center", // space-between
    flexDirection: "column" //row
  },
  button: {
    backgroundColor: "#107AFB",
    marginBottom: 10,
    paddingVertical: 14,
    borderRadius: 5,
    width: "100%", //100
    alignSelf: "center" //
  },
  buttonText: {
    color: "#fff",
    textAlign: "center",
    //fontWeight: "700"
    fontFamily: "nunito-extra-bold"
  }
});
