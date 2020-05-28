import React, { useState, useEffect } from "react";
import {useDispatch} from "react-redux";
import * as ImagePicker from "expo-image-picker";
import * as Permissions from "expo-permissions";
import {
  Alert,
  Button,
  TouchableOpacity,
  KeyboardAvoidingView,
  Keyboard,
  Text,
  View,
  TextInput, StyleSheet,
  Platform, Image, ActivityIndicatorBase
} from "react-native";
import { styles } from "../../../Styles";
import { auth } from "../../../firebase/config";

const initialState = {
  email: "",
  password: "",
  displayName: "",
};

const RegisterScreen = ({ navigation: { navigate } }) => {
  const [state, setState] = useState(initialState);
  const [message, setmessage] = useState(null);
  const [avatar, setAvatar] = useState("https://encrypted-tbn0.gstatic.com/images?q=tbn%3AANd9GcR3f9NC9AOGGOhiz0_jrzZIM6mQIASnNme8z6b2BV_lgLkT_ktd&usqp=CAU");
  const dispatch = useDispatch();

  // обновление инф о пользователе

  // const addUserInfo = async () => {
  //   const updateUser = await auth.currentUser.updateProfile({
  //     displayName: "Pit",
  //     photoURL: "https://comments.ua/img/publications/850x478/UyYR8Ij5RRsx6F-_44FzcAoHTyrrQz74.jpg"
  //   })
// console.log('updateUser', updateUser)


  useEffect(() => {
    getPermissionAsync();
  }, []);

  const getPermissionAsync = async () => {
    const { status } = await Permissions.askAsync(Permissions.CAMERA_ROLL);
    if (status !== "granted") {
      alert("Sorry, we need camera roll permissions!");
    }
  };

  const takePhoto = async () => {
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.All,
      allowsEditing: true,
      aspect: [4, 3],
      quality: 1,
    });

    setAvatar(result.uri);
  };

  const currentUser = async () => {
    const currentUser = await auth.currentUser;
    console.log("currentUser", currentUser);
    dispatch({
      type: "CURRENT_USER",
      payload: {
        userName: currentUser.displayName,
        userId: currentUser.uid,
        avatar: currentUser.photoURL,
      },
    });
  };

  const registerUser = async () => {    
    const { email, password, displayName } = state;
  try {
    const user = await auth.createUserWithEmailAndPassword(email, password);

    await user.user.updateProfile({
      displayName: displayName,
      photoURL: avatar,
    });
  } catch (error) {
    console.log(error);
    setmessage(error.message);
  }
  currentUser();
};


  return (
    <KeyboardAvoidingView
      behavior={Platform.Os == "ios" ? "padding" : "height"}
      style={styles.container}
    >
      <View>
      <TouchableOpacity onPress={takePhoto}>
      <Image
                style={{
                  width: 100,
                  height: 100,
                  borderRadius: 50,
                  // position: "absolute",
                  // top: "5%",
                  right: "-40%"
                }}

                source={{uri: avatar}}
          />
      
        </TouchableOpacity>
        <Text style={styles.text}>UserName*</Text>
        <TextInput
          autoCapitalize={"none"}
          autoCorrect={false}
          style={styles.input}
          value={state.displayName}
          onChangeText={(value) => setState({ ...state, displayName: value })}
        />
        <Text style={styles.text}>Email*</Text>
        <TextInput
          autoCapitalize={"none"}
          autoCorrect={false}
          style={styles.input}
          onChangeText={(value) => setState({ ...state, email: value })}
          value={state.email}
        />
        <Text style={styles.text}>Password*</Text>
        <TextInput
          autoCapitalize={"none"}
          autoCorrect={false}
          style={styles.input}
          secureTextEntry={true}
          onChangeText={(value) => setState({ ...state, password: value })}
          value={state.password}
        />
        <TouchableOpacity
          onPress={() => registerUser()}
          activeOpacity={0.5}
          style={{...styles.button, }}
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
}

export default RegisterScreen;
