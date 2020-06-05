import React, { useState } from "react";
import {
  TouchableOpacity,
  Text,
  View,
  TextInput, KeyboardAvoidingView, Platform
} from "react-native";
import { styles } from "../../../Styles";
import {auth} from '../../../firebase/config'

export default function LogInScreen({ navigation: {navigate} }) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

// логанизация юзера
  const logInUser = async () => {
    try { await auth.signInWithEmailAndPassword(email, password);
    } catch (error) {
      console.log(error);
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
          onChangeText={value => setEmail(value)}
          value={email}
        />
        <Text style={styles.text}>Password*</Text>
        <TextInput
          autoCapitalize={"none"}
          autoCorrect={false}
          style={styles.input}
          secureTextEntry={true}
          onChangeText={value => setPassword(value)}
          value={password}
        />
{/* !!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!! */}
        <TouchableOpacity
          onPress={logInUser}
          activeOpacity={0.5}
          style={styles.button}
        >
          <Text style={styles.buttonTitle}>Log In</Text>
        </TouchableOpacity>
        <TouchableOpacity
          onPress={() => navigate("Register")}
          activeOpacity={0.5}
          style={styles.button}
          style={styles.buttonTitle}
        >
          <Text style={styles.buttonTitle}>Register</Text>
        </TouchableOpacity>
      </View>
    </KeyboardAvoidingView>
  );
};