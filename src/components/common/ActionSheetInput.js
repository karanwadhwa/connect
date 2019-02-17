import React, { Component } from "react";
import {
  Text,
  View,
  TextInput,
  TouchableOpacity,
  StyleSheet
} from "react-native";
import { ActionSheetCustom as ActionSheet } from "react-native-actionsheet";

class ActionSheetInput extends Component {
  renderActionSheet = () => {
    const { title, message, options, name, onChange } = this.props;

    return (
      <ActionSheet
        ref={o => (this.ActionSheet = o)}
        title={title}
        message={message}
        options={[...options, "Cancel"]}
        cancelButtonIndex={options.length}
        destructiveButtonIndex={options.length}
        onPress={index => {
          this.props.onTouch(this.props.name);
          onChange(name, options[index]);
        }}
      />
    );
  };

  showActionSheet = () => {
    this.ActionSheet.show();
  };

  render() {
    const { label, error, placeholder, value } = this.props;

    return (
      <View>
        <Text style={styles.label}>{label}</Text>
        <Text style={styles.error}>{error}</Text>
        <View style={styles.inputBox}>
          <TouchableOpacity
            style={{ width: "100%" }}
            onPress={this.showActionSheet}
          >
            <TextInput
              value={value}
              placeholder={placeholder}
              editable={false}
              placeholderTextColor="rgba(172,172,172,0.5)"
            />
          </TouchableOpacity>
        </View>
        {this.renderActionSheet()}
      </View>
    );
  }
}

export default ActionSheetInput;

const styles = StyleSheet.create({
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
  }
});
