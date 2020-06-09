import React, { useState } from "react";
import { Text, View, Image, Alert, TouchableOpacity, StyleSheet } from "react-native";
import { AppCard } from "./ui/AppCard";
import { MapModalWindow } from "../components/MapModalWindow";
import { CommentsModalWindow } from "./CommentsModalWindow";
import { firestore } from "../../firebase/config";

export const MyBlogPost = ({ post }) => {
  const [showModal, setShowModal] = useState(false);
  const [showModalCmnts, setShowModalCmnts] = useState(false);
  const {
    description,
    userName,
    date,
    image,
    likes, id,
    location: { latitude, longitude },
  } = post;

  const deletPost = () => {
      Alert.alert(
        `Deleting post`,
        `Do you really want to delete your post?`,
        [
          {
            text: "Cancel",
            style: "cancel",
          },
          {
            text: "OK",
            onPress: async () => {
             await firestore
                .collection("posts")
                .doc(post.id)
                .delete();
              
              }
            },
        ],
        { cancelable: false }
      );
  };

  const getCurrentUserPost = async (id) => {
    const data = await firestore.collection("posts").doc(id).get();
    // console.log('likes', post.id)
  
    if (data.data().likes === "") {
      (await data.data().likes) == 0;
    }
  
    await firestore
      .collection("posts")
      .doc(id)
      .update({
        likes: Number(data.data().likes) + 1,
      });
  };

  return (
    <>
      <CommentsModalWindow
        showModalCmnts={showModalCmnts}
        post={post}
        onCancelModalCmnts={() => setShowModalCmnts(false)}
      />
      <MapModalWindow
        latitude={latitude}
        longitude={longitude}
        showModal={showModal}
        onCancelModal={() => setShowModal(false)}
      />
      <AppCard>
        <TouchableOpacity onLongPress={deletPost}>
          <Text style={styles.name}>{userName}</Text>
          <Text style={styles.date}>{date}</Text>
          <TouchableOpacity>
            <Text style={styles.postDesc}>{description}</Text>
          </TouchableOpacity>
          <TouchableOpacity onLongPress={() => setShowModal(true)}>
            <Image style={styles.postImg} source={{ uri: image }} />
          </TouchableOpacity>
          <View style={styles.likesAndCommntsContainer}>
            <TouchableOpacity style={styles.btnsLikesComnts}  onPress={() => getCurrentUserPost(id)}>
              <View style={styles.likesContainer}>
                <Image
                  source={require("../assets/img/like.png")}
                  style={styles.icons}
                />
                <Text style={styles.likesText}>{likes}</Text>
              </View>
            </TouchableOpacity>

            <TouchableOpacity
              style={styles.btnsLikesComnts}
              onPress={() => setShowModalCmnts(true)}
            >
              <View>
                <Image
                  source={require("../assets/img/chat.png")}
                  style={styles.icons}
                />
              </View>
            </TouchableOpacity>
          </View>
        </TouchableOpacity>
      </AppCard>
    </>
  );
};

const styles = StyleSheet.create({
  name: { fontFamily: "openSansExtraBold" },
  date: { fontFamily: "openSansLight", fontSize: 10, color: "#808080" },
  postDesc: { fontFamily: "openSansLight", marginBottom: 4 },
  postImg: {
    width: "100%",
    height: 200,
    marginBottom: 8,
    alignItems: "center",
    justifyContent: "center",
    borderRadius: 10,
  },
  likesAndCommntsContainer: {
    flexDirection: "row",
    justifyContent: "space-around",
    alignItems: "baseline",
  },
  btnsLikesComnts: {
    flexDirection: "row",
    justifyContent: "flex-end",
    alignItems: "center",
  },
  likesContainer: {
    width: 24,
    height: 24,
    alignItems: "center",
    justifyContent: "center",
  },
  icons: {
    width: 22,
    height: 22,
  },
  likesText: {
    fontSize: 9,
    color: "black",
    justifyContent: "center",
    alignItems: "center",
    color: "blue",
  },
});
