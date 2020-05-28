import React, { useState } from "react";
import { Text, View, Image, TouchableOpacity, FlatList } from "react-native";
import AppCard from "./ui/AppCard";
import MapModalWindow from "../components/MapModalWindow";
import CommentsModalWindow from "./CommentsModalWindow";
import { firestore } from "../../firebase/config";

const Post = ({ post }) => {
  const [showModal, setShowModal] = useState(false);
  const [showModalCmnts, setShowModalCmnts] = useState(false);

  const getCurrentUserPost = async (id) => {
    const data = await firestore.collection("posts").doc(id).get();
    // console.log('likes', data.data().likes)

    if (data.data().likes === "") {
      (await data.data().likes) == 0;
      await firestore
        .collection("posts")
        .doc(id)
        .update({
          likes: Number(data.data().likes) + 1,
        });
    }

    await firestore
      .collection("posts")
      .doc(id)
      .update({
        likes: Number(data.data().likes) + 1,
      });
  };

  return (
    <AppCard>
      <Text style={{ fontFamily: "openSansExtraBold" }}>{post.userName}</Text>
      {/* <Text>{post.date.seconds}</Text> */}
      <Text style={{ fontFamily: "openSansLight" }}>{post.description}</Text>
      <MapModalWindow
        latitude={post.location.latitude}
        longitude={post.location.longitude}
        showModal={showModal}
        onCancelModal={() => setShowModal(false)}
      />
      <TouchableOpacity onLongPress={() => setShowModal(true)}>
        <Image
          style={{
            width: 350,
            height: 200,
            margin: 8,
            alignItems: "center",
            justifyContent: "center",
            borderRadius: 10,
          }}
          source={{ uri: post.image }}
        />
      </TouchableOpacity>
      <View
        style={{
          flexDirection: "row",
          justifyContent: "space-around",
          alignItems: "center",
        }}
      >
        <TouchableOpacity
          style={{
            flexDirection: "row",
            justifyContent: "flex-end",
            alignItems: "center",
          }}
          onPress={() => getCurrentUserPost(post.id)}
        >
          <View
            style={{
              width: 24,
              height: 24,
              alignItems: "center",
              justifyContent: "center",
            }}
          >
            <Image
              source={require("../assets/img/like.png")}
              style={{
                width: 22,
                height: 22,
              }}
            />
            <Text
              style={{
                fontSize: 9,
                color: "black",
                justifyContent: "center",
                alignItems: "center",
                color: "blue",
              }}
            >
              {post.likes}
            </Text>
          </View>
        </TouchableOpacity>
        <CommentsModalWindow
          showModalCmnts={showModalCmnts}
          post={post}
          onCancelModalCmnts={() => setShowModalCmnts(false)}
        />
        <TouchableOpacity
          style={{
            flexDirection: "row",
            justifyContent: "flex-end",
            alignItems: "center",
          }}
          onPress={() => setShowModalCmnts(true)}
        >
          <View
            style={{
              width: 24,
              height: 24,
              alignItems: "center",
              justifyContent: "center",
            }}
          >
            <Image
              source={require("../assets/img/chat.png")}
              style={{
                width: 22,
                height: 22,
              }}
            />
          </View>
        </TouchableOpacity>
      </View>
    </AppCard>
  );
};

export default Post;
