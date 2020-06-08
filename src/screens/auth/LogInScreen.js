import React, { useState } from "react";
import {
  TouchableOpacity,
  Text,
  View,
  Alert,
  TextInput,
  KeyboardAvoidingView,
  Keyboard,
  Platform,
} from "react-native";
import { styles } from "./styles";
import { auth } from "../../../firebase/config";

export const  LogInScreen = ({ navigation: { navigate } }) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const logInUser = async () => {
    if (email.trim() && password.trim()) {
      try {
        await auth.signInWithEmailAndPassword(email, password);
      } catch (error) {
        console.log(error);
      }
      Keyboard.dismiss();
    } else {
      Alert.alert(`Please, fill the required fields`);
    }
  };

  return (
    <KeyboardAvoidingView
      behavior={Platform.Os == "ios" ? "padding" : "height"}
      style={styles.container}
    >
      <View>
        <Text style={styles.text}>Email*</Text>
        <TextInput
          autoCapitalize={"none"}
          autoCorrect={false}
          style={styles.input}
          onChangeText={(value) => setEmail(value)}
          value={email}
        />
        <Text style={styles.text}>Password*</Text>
        <TextInput
          autoCapitalize={"none"}
          autoCorrect={false}
          style={styles.input}
          secureTextEntry={true}
          onChangeText={(value) => setPassword(value)}
          value={password}
        />
        <View style={styles.btnsLogInScreen}>
          <TouchableOpacity
            onPress={logInUser}
            activeOpacity={0.5}
            style={styles.btnAuth}
          >
            <Text style={styles.btnTitle}>Log In</Text>
          </TouchableOpacity>
          <TouchableOpacity
            onPress={() => navigate("Register")}
            activeOpacity={0.5}
            style={styles.btnTitle}
          >
            <Text style={styles.btnTitle}>Register</Text>
          </TouchableOpacity>
        </View>
      </View>
    </KeyboardAvoidingView>
  );
}
