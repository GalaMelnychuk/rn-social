import React, { useState } from "react";
import {
  Alert,
  TouchableOpacity,
  Keyboard,
  Text,
  View,
  TextInput
} from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { styles } from "../../Styles";
import {db} from '../../firebase/config'

 const ProfileScreen = ({ navigation, route}) => {

  const signOut = async () => {
    await db.auth().signOut();
    // dispatch({ type: "USER_SIGNOUT" });
  };

  return (
    <View style={styles.container}>
      <Text>Profile</Text>
      <TouchableOpacity
        style={{
          marginTop: 100,
          borderColor: "green",
          borderWidth: 1,
          padding: 10,
          borderRadius: 10,
        }}
        onPress={signOut}
      >
        <Text>SignOut</Text>
      </TouchableOpacity>
    </View>
  );
};

export default ProfileScreen;
