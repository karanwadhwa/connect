import React from "react";
import { View, TouchableOpacity } from "react-native";
import {
  createDrawerNavigator,
  createStackNavigator,
  createBottomTabNavigator
} from "react-navigation";
import Icon from "@expo/vector-icons/Ionicons";

import HomeScreen from "../screens/HomeScreen";
import SettingsScreen from "../screens/SettingsScreen";

const AppTabNavigator = createBottomTabNavigator({
  Home: {
    screen: HomeScreen,
    navigationOptions: {
      tabBarIcon: ({ tintColor }) => <Icon name="ios-home" size={20} />
    }
  },
  Settings: {
    screen: SettingsScreen,
    navigationOptions: {
      tabBarIcon: ({ tintColor }) => <Icon name="md-settings" size={20} />
    }
  }
});

const AppStackNavigator = createStackNavigator({
  AppTabNavigator: {
    screen: AppTabNavigator,
    navigationOptions: ({ navigation }) => ({
      title: "Connect",
      headerLeft: (
        <TouchableOpacity onPress={() => navigation.toggleDrawer()}>
          <View style={{ paddingHorizontal: 10 }}>
            <Icon name="md-menu" size={24} />
          </View>
        </TouchableOpacity>
      )
    })
  }
});

const AppDrawerNavigator = createDrawerNavigator({
  Home: AppStackNavigator
});

export default AppDrawerNavigator;
