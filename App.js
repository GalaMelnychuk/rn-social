import React, {useState} from 'react';
import { StyleSheet, Alert, TouchableOpacity, Keyboard, Text, View, Button, TextInput } from 'react-native';
import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import { Ionicons } from '@expo/vector-icons';
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import RegisterScreen from './screens/auth/RegisterScreen';
import LogInScreen from './screens/auth/LogInScreen';
import HomeScreen from './screens/tab/HomeScreen';
import ProfileScreen from './screens/tab/ProfileScreen';
import PostsScreen from './screens/tab/PostsScreen';
import AddPostScreen from './screens/tab/AddPostScreen';
import {db} from './firebase/config'

const Stack = createStackNavigator();
const Tab = createBottomTabNavigator();

let content =  (
<Tab.Navigator tabBarOptions={{
      showLabel: false,
    }}>
<Tab.Screen options={{
   tabBarIcon: ({ focused, size, color }) => (
     <Ionicons
       name="ios-home"
       size={focused ? 42 : 40}
       color={focused ? "#ff1493" : "#808080"}
     />
   ),
 }} name="Home" component={HomeScreen} />
<Tab.Screen options={{
      tabBarIcon: ({ focused, size, color }) => (
        <Ionicons
          name="ios-body"
          size={focused ? 42 : 40}
          color={focused ? "#ff1493" : "#808080"}
        /> ),
      }}
        
        name="Profile" component={ProfileScreen} />
<Tab.Screen options={{
   tabBarIcon: ({ focused, size, color }) => (
     <Ionicons
       name="ios-book"
       size={focused ? 42 : 40}
       color={focused ? "#ff1493" : "#808080"}
     />
   ),
 }} name="Posts" component={PostsScreen} />
<Tab.Screen options={{
   tabBarIcon: ({ focused, size, color }) => (
     <Ionicons
       name="md-color-filter"
       size={focused ? 42 : 40}
       color={focused ? "#ff1493" : "#808080"}
     />
   ),
 }} name="AddPost" component={AddPostScreen} />
</Tab.Navigator>
);


const useRoute = (isAuth) => {
  if (isAuth) {
    return content;
  } 
  return (
     <Stack.Navigator>
      <Stack.Screen name="Register" component={RegisterScreen} />
      <Stack.Screen name="LogIn" component={LogInScreen} />
    </Stack.Navigator>
  )
};


export default function App() {
  const [isAuth, setIsAuth] = useState(false);


  db.auth().onAuthStateChanged((user) => {
    console.log('onAuthStateChanged', user)
    setIsAuth(user)
  })

  const routing =useRoute(isAuth);
  return <NavigationContainer>{routing}</NavigationContainer>;
}


