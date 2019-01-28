import React from "react";
import { View, TouchableOpacity } from "react-native";
import {
  createDrawerNavigator,
  createStackNavigator,
  createBottomTabNavigator
} from "react-navigation";
import Icon from "@expo/vector-icons/Ionicons";

import HomeScreen from "../screens/HomeScreen";
import PostScreen from "../screens/PostScreen";
import SettingsScreen from "../screens/SettingsScreen";
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

const AppTabNavigator = createBottomTabNavigator({
  Home: {
    screen: HomeStackNavigator,
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
  Home: AppStackNavigator,
  "Create Post": CreatePostScreen
});

export default AppDrawerNavigator;
