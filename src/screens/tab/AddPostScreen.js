import React, { useState, useEffect } from "react";
import {
  TouchableOpacity,
  Keyboard,
  Text,
  View,
  Image,
  StyleSheet,
  TextInput,
} from "react-native";
import { useSelector } from "react-redux";
import { useNavigation } from "@react-navigation/native";
import { Camera } from "expo-camera";
import * as Location from "expo-location";
import { firestore, storage } from "../../../firebase/config";
import { Header } from "react-native-elements";

const moment = require("moment");

export const AddPostScreen = () => {
  const { userId, userName } = useSelector((state) => state.user);
  const [hasPermission, setHasPermission] = useState(null);
  const [type, setType] = useState(Camera.Constants.Type.back);
  const [takePhoto, setTakePhoto] = useState("");
  const [picture, setPicture] = useState("");
  const [postDescription, setPostDescription] = useState("");
  const navigation = useNavigation();

  useEffect(() => {
    (async () => {
      const { status } = await Camera.requestPermissionsAsync();
      setHasPermission(status === "granted");
    })();
  }, []);

  useEffect(() => {
    (async () => {
      let { status } = await Location.requestPermissionsAsync();
      if (status !== "granted") {
        console.log("Permission to access location was denied");
      }
    })();
  });

  const snap = async () => {
    if (takePhoto) {
      let photo = await takePhoto.takePictureAsync();
      // console.log("photo.uri", photo.uri);
      setPicture(photo.uri);
    }
  };

  const handlerlUpload = async (img) => {
    const response = await fetch(img);
    const file = await response.blob();
    const photoName = Date.now().toString();

    await storage.ref(`image/${photoName}`).put(file);

    const photoUrl = await storage
      .ref("image")
      .child(photoName)
      .getDownloadURL();
    setPostDescription("");
    createPost(photoUrl);
    setPicture("");
    navigation.navigate("MyBlog");
  };

  const createPost = async (imgUrl) => {
    let location = await Location.getCurrentPositionAsync({});

    await firestore.collection("posts").add({
      image: imgUrl,
      userId,
      userName,
      location: {
        latitude: location.coords.latitude,
        longitude: location.coords.longitude,
      },
      // avatar: "",
      comments: [],
      description: postDescription,
      likes: "",
      date: moment().format("MMMM Do YYYY, h:mm:ss a"),
    });
    Keyboard.dismiss();
  };

  return (
    <>
      <Header
        centerComponent={{
          text: `New Post`,
          style: { ...styles.header },
        }}
        rightComponent={
          <TouchableOpacity onPress={() => setPicture("")}>
            <View style={styles.btnRePhoto}>
              <Text style={styles.btnRePhotoText}>re-photo</Text>
            </View>
          </TouchableOpacity>
        }
      />
      <View style={styles.takePhotoContainer}>
        {picture ? (
          <>
            <Image source={{ uri: picture }} style={styles.camera} />
            <TextInput
              multiline
              autoCapitalize={"none"}
              autoCorrect={false}
              style={styles.postInputDescription}
              onChangeText={(value) => setPostDescription(value)}
              value={postDescription}
              placeholder="Description..."
            />
            <TouchableOpacity
              style={styles.btnAddPost}
              onPress={() => handlerlUpload(picture)}
            >
              <Text style={styles.textBtnAddPost}>ADD POST</Text>
            </TouchableOpacity>
          </>
        ) : (
          <>
            <Camera
              ref={(ref) => setTakePhoto(ref)}
              style={{ width: "100%", height: 250 }}
              type={type}
            >
              <View
                style={{
                  flex: 1,
                  flexDirection: "row",
                  justifyContent: "space-between",
                }}
              >
                <TouchableOpacity
                  onPress={() => {
                    setType(
                      type === Camera.Constants.Type.back
                        ? Camera.Constants.Type.front
                        : Camera.Constants.Type.back
                    );
                  }}
                >
                  <Image
                    style={styles.flipCamera}
                    source={{
                      uri:
                        "https://cdn.dribbble.com/users/100396/screenshots/1220329/flipiconn.png",
                    }}
                  />
                </TouchableOpacity>
              </View>
            </Camera>
            <TouchableOpacity onPress={snap}>
              <Image
                style={styles.snapCamera}
                source={{
                  uri:
                    "https://cdn1.iconfinder.com/data/icons/hand-holding-device/512/849-08-512.png",
                }}
              />
            </TouchableOpacity>
          </>
        )}
      </View>
    </>
  );
}

const styles = StyleSheet.create({
  header: {
    color: "#fff",
    fontSize: 18,
    fontFamily: "openSansBold",
  },
  btnRePhoto: {
    borderColor: "#fff",
    borderWidth: 1,
    borderRadius: 6,
  },
  btnRePhotoText: {
    fontSize: 14,
    paddingHorizontal: 4,
    color: "#fff",
    fontFamily: "openSansLight",
  },
  takePhotoContainer: { justifyContent: "center", alignItems: "center" },
  camera: {
    width: 350,
    height: 200,
    margin: 8,
    alignItems: "center",
    justifyContent: "center",
    borderRadius: 10,
  },
  postInputDescription: {
    width: "75%",
    borderWidth: 1,
    borderColor: "#5f9ea0",
    color: "#5f9ea0",
    fontWeight: "600",
    fontSize: 16,
    backgroundColor: "#fff8dc",
    borderRadius: 10,
    padding: 10,
  },
  btnAddPost: {
    backgroundColor: "red",
    padding: 8,
    margin: 18,
    borderRadius: 4,
  },
  textBtnAddPost: {
    fontSize: 18,
    color: "#000",
    fontFamily: "openSansLight",
  },
  flipCamera: {
    width: 50,
    height: 50,
    borderRadius: 50,
    marginTop: 14,
    marginRight: 6,
  },
  snapCamera: {
    width: 120,
    height: 120,
    borderRadius: 50,
    marginTop: 40,
  },
});
