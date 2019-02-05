import React, { Component } from "react";
import { connect } from "react-redux";
import {
  View,
  Text,
  ScrollView,
  TouchableOpacity,
  Alert,
  TextInput,
  StyleSheet,
  Platform,
  StatusBar
} from "react-native";
import { WebBrowser } from "expo";
import { ActionSheetCustom as ActionSheet } from "react-native-actionsheet";
import Ionicons from "@expo/vector-icons/Ionicons";
import { Subtitle } from "@shoutem/ui";

import API from "../../config/api";
import { addNewPost } from "../../store/actions/posts";

import HorizontalRule from "../common/HorizontalRule";

class CreatePostPage extends Component {
  constructor(props) {
    super(props);

    this.state = {
      title: "",
      postAudience: [],
      availableAudience: [...this.props.user.audience] || [],
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
        errors: { postAudience: "No audience has been assigned to you yet." }
      });
    }
  }

  handleSubmit = () => {
    const newPost = {
      title: this.state.title,
      audience: this.state.postAudience.toString(),
      body: this.state.body
    };

    API.post("/api/posts/", newPost, {
      headers: {
        Authorization: this.props.accessToken
      }
    })
      .then(response => {
        this.setState({ title: "", body: "" });
        this.props.addNewPost(response.data);
        /* Alert.alert("", "Post Successful", [
          {
            text: "Take Me Home",
            onPress: () => this.props.navigation.navigate("Home")
          }
        ]); */
        this.props.navigation.navigate("Home");
      })
      .catch(error => this.setState({ errors: error.response.data }));
  };

  renderActionSheet = () => {
    return (
      <ActionSheet
        ref={o => (this.ActionSheet = o)}
        title="Select your audience"
        message="Only the audience you select will receive this post."
        options={this.state.availableAudience.concat(["Cancel"])}
        cancelButtonIndex={this.state.availableAudience.length}
        destructiveButtonIndex={this.state.availableAudience.length}
        onPress={index => {
          if (index == this.state.availableAudience.length) return;

          this.pushAudienceItem(index);
        }}
      />
    );
  };

  showActionSheet = () => {
    if (this.state.availableAudience.length === 0) {
      return Alert.alert(
        "",
        "You have selected all possible audiences available to you."
      );
    } else {
      this.ActionSheet.show();
    }
  };

  // add AudienceItem to postAudience and remove from availableAudience
  pushAudienceItem = index => {
    let postAudience = [...this.state.postAudience];
    let availableAudience = [...this.state.availableAudience];

    postAudience.push(this.state.availableAudience[index]);
    availableAudience.splice(index, 1);

    this.setState({
      postAudience,
      availableAudience,
      errors: { audience: "" }
    });
  };

  // remove AudienceItem from postAudience and add to availableAudience
  popAudienceItem = item => {
    let postAudience = [...this.state.postAudience];
    const index = postAudience.indexOf(item);
    postAudience.splice(index, 1);

    this.setState({
      postAudience,
      availableAudience: [...this.state.availableAudience, item]
    });
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

          <TouchableOpacity onPress={this.showActionSheet}>
            <View
              style={{
                backgroundColor: "",
                justifyContent: "space-between",
                flexDirection: "row",
                paddingVertical: 10
              }}
            >
              <Text style={styles.label}>Audience</Text>
              <Ionicons name="ios-add-circle-outline" size={20} />
            </View>
          </TouchableOpacity>
          <Text style={styles.error}>{this.state.errors.audience}</Text>

          <View
            style={{
              flexDirection: "row",
              flexWrap: "wrap"
            }}
          >
            {this.state.postAudience.map((item, key) => (
              <TouchableOpacity
                key={key}
                onPress={() => this.popAudienceItem(item)}
              >
                <Subtitle style={styles.audienceBadge}>{item}</Subtitle>
              </TouchableOpacity>
            ))}
          </View>

          <View style={{ marginBottom: 20 }} />
          {this.renderActionSheet()}

          <Text style={styles.label}>Post Body</Text>
          <Text style={styles.error}>{this.state.errors.body}</Text>
          <View style={[styles.inputBox, { height: 200 }]}>
            <TextInput
              value={this.state.body}
              onChangeText={body =>
                this.setState({ body, errors: { body: "" } })
              }
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

export default connect(
  mapStateToProps,
  { addNewPost }
)(CreatePostPage);

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
  audienceBadge: {
    backgroundColor: "#DDEEFF",
    paddingHorizontal: 7,
    marginRight: 10,
    marginBottom: 15
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
