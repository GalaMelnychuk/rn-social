import React, { useState } from "react";
import { Text, View, Image, TouchableOpacity, Alert} from "react-native";
import AppCard from "./ui/AppCard";
import MapModalWindow from "../components/MapModalWindow";
import { firestore } from "../../firebase/config";
import CommentsModalWindow from "./CommentsModalWindow";

const MyBlogPost = ({ post }) => {
  const [showModal, setShowModal] = useState(false);
  const [showModalCmnts, setShowModalCmnts] = useState(false);

  const editDescription = () => {};

  const deletePost = () => {
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
          onPress: async (id) => {
            const data = await firestore.collection("posts").doc(id).get();
              console.log('post.id', data)
              console.log('post.id', post.id)
          },
        },
      ],
      { cancelable: false }
    );
  };

  return (
    <>
      <CommentsModalWindow
        showModalCmnts={showModalCmnts}
        post={post}
        onCancelModalCmnts={() => setShowModalCmnts(false)}
      />
      <MapModalWindow
        latitude={post.location.latitude}
        longitude={post.location.longitude}
        showModal={showModal}
        onCancelModal={() => setShowModal(false)}
      />
      <AppCard>
        <TouchableOpacity onLongPress={ () => deletePost(post.id)} >
          <Text style={{ fontFamily: "openSansExtraBold" }}>
            {post.userName}
          </Text>
          <TouchableOpacity onLongPress={editDescription}>
            <Text style={{ fontFamily: "openSansLight" }}>
              {post.description}
            </Text>
          </TouchableOpacity>
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
        </TouchableOpacity>
      </AppCard>
    </>
  );
};

export default MyBlogPost;
