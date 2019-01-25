import React from "react";
import { View, StyleSheet, Platform } from "react-native";

const Card = props => {
  return <View style={styles.cardContainer}>{props.children}</View>;
};

export default Card;

const styles = StyleSheet.create({
  cardContainer: {
    marginHorizontal: 10,
    marginVertical: 5,
    borderWidth: 1,
    borderRadius: 2,
    borderColor: "#ddd",
    ...Platform.select({
      ios: {
        shadowColor: "#000",
        shadowOffset: { height: 2, width: 0 },
        shadowOpacity: 0.1,
        shadowRadius: "2"
      },
      android: {
        elevation: 3
      }
    })
  }
});
