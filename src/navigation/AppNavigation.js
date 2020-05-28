import React, { useState } from "react";
import { Ionicons } from "@expo/vector-icons";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";

import HomeScreen from "../screens/tab/HomeScreen";
import MyBlogScreen from "../screens/tab/MyBlogScreen";
import PostsScreen from "../screens/tab/PostsScreen";
import AddPostScreen from "../screens/tab/AddPostScreen";
import {Header} from "react-native-elements";

import LogOut from '../components/LogOut';

const Tab = createBottomTabNavigator();

export let content = (
  <>
  <Header
  placement="left"
  leftComponent={{ icon: "menu", color: "#fff" }}
  centerComponent={{ text: "MY TITLE", style: { color: "#fff" } }}
  rightComponent={LogOut}
/>
  <Tab.Navigator
    tabBarOptions={{
      showLabel: true,
    }}
  >
      
    <Tab.Screen
      options={{
        tabBarIcon: ({ focused, size, color }) => (
          <Ionicons
            name="ios-home"
            size={focused ? 38 : 36}
            color={focused ? "#00bfff" : "#808080"}
          />
        ),
      }}
      name="Home"
      component={HomeScreen}
    />
    <Tab.Screen
      options={{
        tabBarIcon: ({ focused, size, color }) => (
          <Ionicons
            name="ios-sunny"
            size={focused ? 38 : 36}
            color={focused ? "#00bfff" : "#808080"}
          />
        ),
      }}
      name="MyBlog"
      component={MyBlogScreen}
    />
    <Tab.Screen
      options={{
        tabBarIcon: ({ focused, size, color }) => (
          <Ionicons
            name="ios-add-circle-outline"
            size={focused ? 38 : 36}
            color={focused ? "#00bfff" : "#808080"}
          />
        ),
      }}
      name="AddPost"
      component={AddPostScreen}
    />
    <Tab.Screen
      options={{
        tabBarIcon: ({ focused, size, color }) => (
          <Ionicons
            name="ios-book"
            size={focused ? 38 : 36}
            color={focused ? "#00bfff" : "#808080"}
          />
        ),
      }}
      name="AllPosts"
      component={PostsScreen}
    />
  </Tab.Navigator>
  </>
);