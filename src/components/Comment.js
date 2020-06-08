import React from "react";
import { useSelector } from "react-redux";
import { firestore } from "../../firebase/config";
import { Text, TouchableOpacity, View, Alert, StyleSheet } from "react-native";

export const Comment = ({ comment, post }) => {
  const { userName } = useSelector((state) => state.user);
  const { name, text, id } = comment;

  const removeComment = () => {
    if (userName !== name) {
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
                .comments.filter((elem) => elem.id !== id);
              await firestore.collection("posts").doc(post.id).update({
                comments: newCommentsArr,
              });
            },
          },
        ],
        { cancelable: false }
      );
    }
  };

  return (
    <TouchableOpacity onLongPress={removeComment}>
      <View style={styles.container}>
        <Text style={styles.userName}>{name}</Text>
        <Text style={styles.textComm}>{text}</Text>
      </View>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  container: {
    margin: 10,
  },
  userName: { fontFamily: "openSansExtraBold" },
  textComm: {
    fontSize: 14,
    justifyContent: "center",
    alignItems: "center",
    fontFamily: "openSansRegular",
    paddingLeft: 16,
  },
});
