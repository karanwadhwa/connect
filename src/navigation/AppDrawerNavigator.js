import React from "react";
import { View, TouchableOpacity } from "react-native";
import {
  createDrawerNavigator,
  createStackNavigator,
  createBottomTabNavigator
} from "react-navigation";
import Icon from "@expo/vector-icons/Ionicons";

import GroupsScreen from "../screens/GroupsScreen";
import ProfileScreen from "../screens/ProfileScreen";
import SettingsScreen from "../screens/SettingsScreen";

import HomeScreen from "../screens/HomeScreen";
import PostScreen from "../screens/PostScreen";

import CreatePostScreen from "../screens/CreatePostScreen";

const HomeStackNavigator = createStackNavigator(
  {
    Home: HomeScreen,
    Post: PostScreen
  },
  {
    defaultNavigationOptions: ({ navigation }) => ({
      header: null
    })
  }
);

const AppTabNavigator = createBottomTabNavigator(
  {
    Home: {
      screen: HomeStackNavigator,
      navigationOptions: {
        tabBarIcon: ({ tintColor }) => (
          <Icon name="ios-home" size={24} color={tintColor} />
        )
      }
    },
    Groups: {
      screen: GroupsScreen,
      navigationOptions: {
        tabBarIcon: ({ tintColor }) => (
          <Icon name="ios-chatboxes" size={24} color={tintColor} />
        )
      }
    },
    Profile: {
      screen: ProfileScreen,
      navigationOptions: {
        tabBarIcon: ({ tintColor }) => (
          <Icon name="ios-contact" size={24} color={tintColor} />
        )
      }
    },
    Settings: {
      screen: SettingsScreen,
      navigationOptions: {
        tabBarIcon: ({ tintColor }) => (
          <Icon name="md-settings" size={24} color={tintColor} />
        )
      }
    }
  },
  {
    tabBarOptions: {
      activeTintColor: "#107AFB",
      inactiveTintColor: "#999999",
      showLabel: true,
      labelStyle: {
        fontFamily: "nunito-bold"
      }
    }
  }
);

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
  Home: AppStackNavigator,
  "Create Post": CreatePostScreen
});

export default AppDrawerNavigator;
