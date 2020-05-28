import React, { useState, useEffect } from "react";
import { TouchableOpacity, Text, View, Image, Alert } from "react-native";
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

  if (hasPermission === false) {
    return <Text>No access to camera</Text>;
  }
  
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
      setPicture(photo.uri);
      handelUpload(photo.uri)
    }
  };

  const handelUpload = async (img) => {
    const response = await fetch(img);
    const file = await response.blob();
    const uniquePostsId = Date.now().toString();

    await storage.ref(`image/${uniquePostsId}`).put(file);

    const urlPosts = await storage
      .ref("image")
      .child(uniquePostsId)
      .getDownloadURL();

    createPost(urlPosts);
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
      avatar: "",
      comments: [],
      description: postDescription,
      likes:''
    });

    await setPicture("");
   
  };

  return (
    <View style={{ justifyContent: "center", alignItems: "center" }}>
      {picture ? (
        <Image
          source={{ uri: picture }}
          style={{ width: 350, height: 200, margin: 4 }}
        />
      ) : (
        <Camera
          ref={(ref) => setTakePhoto(ref)}
          style={{ width: 360, height: 220, margin: 4 }}
          type={type}
        >
          <View
            style={{
              flex: 1,
              backgroundColor: "transparent",
              flexDirection: "row",
            }}
          >
            <TouchableOpacity
              style={{
                flex: 0.1,
                alignSelf: "flex-end",
                alignItems: "center",
              }}
              onPress={() => {
                setType(
                  type === Camera.Constants.Type.back
                    ? Camera.Constants.Type.front
                    : Camera.Constants.Type.back
                );
              }}
            >
              <Text style={{ fontSize: 18, marginBottom: 10, color: "white" }}>
                Flip
              </Text>
            </TouchableOpacity>
          </View>
        </Camera>
      )}
      <TouchableOpacity
        style={{

        }}
        onPress={snap}
      >
        <Text style={{ fontSize: 18, marginBottom: 10, color: "#000" }}>
          take Photo!!
        </Text>
      </TouchableOpacity>
      <TouchableOpacity
        style={{}}
        onPress={() => setPicture("")}
      >
        <Text style={{ fontSize: 18, marginBottom: 10, color: "#000" }}>
          once more take Photo!!
        </Text>
      </TouchableOpacity>
      <TouchableOpacity
        style={{}}
        onPress={createPost}
      >
        <Text style={{ fontSize: 18, marginBottom: 10, color: "#000" }}>
          ADD POST
        </Text>
      </TouchableOpacity>
    </View>
  );
}
