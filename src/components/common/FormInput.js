import React, { PureComponent } from "react";
import { Text, View, TextInput, StyleSheet } from "react-native";
import Icon from "@expo/vector-icons/Ionicons";

const defaultBorderColor = "rgba(172,172,172,0.7)";

class FormInput extends PureComponent {
  _handleChange = value => {
    this.props.onChange(this.props.name, value);
  };

  _handleTouch = () => {
    this.props.onTouch(this.props.name);
  };

  render() {
    const {
      label,
      error,
      placeholder,
      icon,
      iconColor,
      borderColor = defaultBorderColor,
      ...rest
    } = this.props;
    return (
      <View>
        <Text style={styles.label}>{label}</Text>
        <Text style={styles.error}>{error}</Text>
        <View style={[styles.inputBox, { borderColor }]}>
          <TextInput
            onChangeText={this._handleChange}
            onBlur={this._handleTouch}
            style={{ width: "90%" }}
            placeholder={placeholder}
            placeholderTextColor="rgba(172,172,172,0.5)"
            {...rest}
          />
          <Icon name={icon} size={25} color={iconColor || defaultBorderColor} />
        </View>
      </View>
    );
  }
}

export default FormInput;

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
    borderColor: defaultBorderColor,
    marginBottom: 20,
    paddingHorizontal: 10,
    borderRadius: 5,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center"
  }
});
