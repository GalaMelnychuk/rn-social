import React, { useState, useEffect } from "react";
import {
  TouchableOpacity,
  Keyboard,
  Text,
  View,
  Image,
  Alert,
  TextInput,
} from "react-native";
import { useSelector } from "react-redux";
import { Camera } from "expo-camera";
import * as Location from "expo-location";
import { firestore, storage } from "../../../firebase/config";
import { styles } from "../../../Styles";

export default function AddPostScreen() {
  const { userId, userName } = useSelector((state) => state.user);
  const [hasPermission, setHasPermission] = useState(null);
  const [type, setType] = useState(Camera.Constants.Type.back);
  const [takePhoto, setTakePhoto] = useState("");
  const [picture, setPicture] = useState("");
  const [postDescription, setPostDescription] = useState("");

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
      console.log("photo.uri", photo.uri);
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
    });
    Keyboard.dismiss();
  };

  return (
    <View style={{ justifyContent: "center", alignItems: "center" }}>
      {picture ? (
        <Image
          source={{ uri: picture }}
          style={{
            width: 350,
            height: 200,
            margin: 8,
            alignItems: "center",
            justifyContent: "center",
            borderRadius: 10,
          }}
        />
      ) : (
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
            <TouchableOpacity onPress={snap}>
              <Image
                style={{
                  width: 50,
                  height: 50,
                  borderRadius: 50,
                  marginTop: 14,
                  marginLeft: 6,
                }}
                source={{
                  uri:
                    "https://lh3.googleusercontent.com/UEhZQtc_3LCwkKIayRjHG63EfC9bsXvJjuWiFMvVRAe_tHyk0pW4ZmCBJQCENxmYlYk",
                }}
              />
            </TouchableOpacity>
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
                style={{
                  width: 50,
                  height: 50,
                  borderRadius: 50,
                  marginTop: 14,
                  marginRight: 6,
                }}
                source={{
                  uri:
                    "https://cdn.dribbble.com/users/100396/screenshots/1220329/flipiconn.png",
                }}
              />
            </TouchableOpacity>
          </View>
        </Camera>
      )}

<TouchableOpacity
        style={{}}
        onPress={() => setPicture("")}
      >
        <Text style={{ fontSize: 18, marginBottom: 10, color: "#000" }}>
        redo photo
        </Text>
        </TouchableOpacity>

      <TextInput
        autoCapitalize={"none"}
        autoCorrect={false}
        style={{
          width: "75%",
          borderWidth: 1,
          borderColor: "#5f9ea0",
          color: "#5f9ea0",
          fontWeight: "600",
          fontSize: 16,
          backgroundColor: "#fff8dc",
          borderRadius: 10,
          padding: 10,
        }}
        onChangeText={(value) => setPostDescription(value)}
        value={postDescription}
        placeholder="Description..."
      />
      <TouchableOpacity style={{ backgroundColor: "red", padding: 8, margin: 18, borderRadius: 4 }} onPress={() => handlerlUpload(picture)}>
        <Text style={{ fontSize: 18, color: "#000", fontFamily: "openSansLight" }}>
          ADD POST
        </Text>
      </TouchableOpacity>
    </View>
  );
}
