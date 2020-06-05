import React, { useState } from "react";
import firebase from "firebase";
import {
  Modal,
  FlatList,
  Text,
  TextInput,
  TouchableOpacity,
  Button,
  View,
} from "react-native";
import Comment from "./Comment";
import { firestore } from "../../firebase/config";
import { useSelector } from "react-redux";
import { Header } from "react-native-elements";

const CommentsModalWindow = ({ showModalCmnts, onCancelModalCmnts, post }) => {
  const { userId, userName } = useSelector((state) => state.user);
  const [textComment, setTextComment] = useState("");



  const addComment = async () => {
    const postRef = await firestore.collection("posts").doc(post.id);

    // Atomically add a new comment to the "comments" array field.
    postRef.update({
      comments: firebase.firestore.FieldValue.arrayUnion({
        name: userName,
        comment: textComment,
        id: Date.now().toString(),
      }),
    });
    setTextComment("");
  };

  return (
    <Modal animationType="slide" visible={showModalCmnts} transparent={true}>
      <Header
        placement="center"
        centerComponent={{
          text: "Comments",
          style: { color: "#fff", fontSize: 20 },
        }}
        leftComponent={() => (
          <Button color="red" title="Back" onPress={onCancelModalCmnts} />
        )}
      />

      <View
        style={{
          flex: 2,
          justifyContent: "center",
          backgroundColor: "rgba(0, 0, 0, 0.7)",
        }}
      >
        <View style={{ backgroundColor: "#fff", borderRadius: 20 }}>
          <FlatList
            keyExtractor={(item, idx) => idx.toString()}
            data={post.comments}
            renderItem={({ item }) => (
              <Comment post={post}  comment={item} />
            )}
          />
          <TextInput
            autoCapitalize={"none"}
            autoCorrect={false}
            style={{
              borderRadius: 20,
              borderColor: "#696969",
              margin: 10,
              borderWidth: 1,
              padding: 15,
            }}
            onChangeText={(value) => setTextComment(value)}
            value={textComment}
            placeholder="Your comment..."
          />
          <View style={{ alignItems: "center" }}>
            <TouchableOpacity
              style={{
                width: "20%",
                justifyContent: "flex-end",
                backgroundColor: "#1e90ff",
                padding: 10,

                marginTop: 20,
                marginBottom: 20,
                borderRadius: 10,
                justifyContent: "center",
                alignItems: "center",
              }}
              onPress={addComment}
            >
              <Text
                style={{
                  fontSize: 18,
                  color: "#000",
                  fontFamily: "openSansLight",
                }}
              >
                ADD
              </Text>
            </TouchableOpacity>
          </View>
        </View>
      </View>
    </Modal>
  );
};

export default CommentsModalWindow;
