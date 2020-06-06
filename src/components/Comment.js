import React, { useState } from "react";
import { useSelector } from "react-redux";
import { firestore } from "../../firebase/config";
import { Text, TouchableOpacity, View, Alert } from "react-native";

const Comment = ({ comment, post }) => {
  const { userName } = useSelector((state) => state.user);

  const removeComment = () => {
    if (userName !== comment.name) {
      return;
    } else {
      Alert.alert(
        `Deleting comment`,
        `Do you really want to delete your comment?`,
        [
          {
            text: "Cancel",
            style: "cancel",
          },
          {
            text: "OK",
            onPress: async () => {
              const data = await firestore
                .collection("posts")
                .doc(post.id)
                .get();
              const newCommentsArr = await data
                .data()
                .comments.filter((elem) => elem.id !== comment.id);
              await firestore.collection("posts").doc(post.id).update({
                comments: newCommentsArr,
              });
              console.log('post.id', post.id)
            },
          },
        ],
        { cancelable: false }
      );
    }
  };

  return (
    <TouchableOpacity onLongPress={removeComment}>
      <View
        style={{
          margin: 10,
        }}
      >
        <Text style={{ fontFamily: "openSansExtraBold" }}>{comment.name}</Text>
        <Text
          style={{
            fontSize: 14,
            justifyContent: "center",
            alignItems: "center",
            fontFamily: "openSansRegular",
            paddingLeft: 16,
          }}
        >
          {comment.comment}
        </Text>
      </View>
    </TouchableOpacity>
  );
};

export default Comment;
