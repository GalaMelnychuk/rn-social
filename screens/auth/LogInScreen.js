import React, { useState } from "react";
import {
  Alert,
  TouchableOpacity,
  Keyboard,
  Text,
  View,
  Button,
  TextInput
} from "react-native";
import { styles } from "../../Styles";

export default function LogInScreen({ navigation: {navigate} }) {
  // const [email, setEmail] = useState("");
  // const [password, setPassword] = useState("");

  return (
    <View style={styles.container}>
      <Text style={styles.text}>Email*</Text>
      <TextInput
        autoCapitalize={"none"}
        autoCorrect={false}
        style={styles.input}
        // onChangeText={setEmail}
      />
      <Text style={styles.text}>Password*</Text>
      <TextInput
        autoCapitalize={"none"}
        autoCorrect={false}
        style={styles.input}
        secureTextEntry={true}
        // onChangeText={setPassword}
      />
      <TouchableOpacity
        activeOpacity={0.5}
        style={styles.button}
      >
        <Text style={styles.buttonTitle}>Sign In</Text>
      </TouchableOpacity>
      <TouchableOpacity
        onPress={() => navigate("Register")}
        activeOpacity={0.5}
        style={styles.button}
        style={styles.buttonTitle}
      >
        <Text style={styles.buttonTitle}>Go to Registration</Text>
      </TouchableOpacity>

    </View>
  );
}
