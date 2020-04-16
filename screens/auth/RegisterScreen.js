import React, { useState, useEffect } from "react";
import {
  Alert,
  Button,
  TouchableOpacity,
  KeyboardAvoidingView,
  Keyboard,
  Text,
  View,
  TextInput,
  Platform
} from "react-native";
import { styles } from "../../Styles";
import { db } from "../../firebase/config";

const RegisterScreen = ({ navigation: { navigate } }) => {
  const [displayName, setDisplayName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const resetInputs = () => (setDisplayName(""), setEmail(""), setPassword(""));

  useEffect(() => {
    currentUser()
  }, [])

 // взять информацию (ид-юзера, и т.д.) текущего юзера
  const currentUser = async () => {
    const currentUser = await db.auth().currentUser;
    // console.log('object', currentUser)
  }

  // обновление инф о пользователе

  const addUserInfo = async () => {
    const updateUser = await db.auth().currentUser.updateProfile({
      displayName: "Pit",
      photoURL: "https://comments.ua/img/publications/850x478/UyYR8Ij5RRsx6F-_44FzcAoHTyrrQz74.jpg"
    })
console.log('updateUser', updateUser)
}

// регистрация юзера
  const registerUser = async () => {
    try {
      const user = await db
        .auth()
        .createUserWithEmailAndPassword(email, password);
      resetInputs();
      await user.user.updateProfile({
        displayName: "Bob"
      })
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
        <Text style={styles.text}>UserName*</Text>
        <TextInput
          autoCapitalize={"none"}
          autoCorrect={false}
          style={styles.input}
          onChangeText={value => setDisplayName(value)}
          value={displayName}
        />
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
          onPress={registerUser}
          activeOpacity={0.5}
          style={styles.button}
        >
          <Text style={styles.buttonTitle}>REGISTER</Text>
        </TouchableOpacity>
        <TouchableOpacity
          onPress={() => navigate("LogIn")}
          activeOpacity={0.5}
          style={styles.button}
          style={styles.buttonTitle}
        >
          <Text style={styles.buttonTitle}>LogIn</Text>
        </TouchableOpacity>
      </View>
    </KeyboardAvoidingView>
  );
};

export default RegisterScreen;
