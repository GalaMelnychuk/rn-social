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
  Alert,
  Keyboard,
  StyleSheet,
} from "react-native";
import { Comment } from "./Comment";
import { firestore } from "../../firebase/config";
import { useSelector } from "react-redux";
import { Header } from "react-native-elements";

export const CommentsModalWindow = ({
  showModalCmnts,
  onCancelModalCmnts,
  post,
}) => {
  const { userName } = useSelector((state) => state.user);
  const [textComment, setTextComment] = useState("");

  const addComment = async () => {
    if (textComment.trim()) {
      const postRef = await firestore.collection("posts").doc(post.id);
      // Atomically add a new comment to the "comments" array field.
      postRef.update({
        comments: firebase.firestore.FieldValue.arrayUnion({
          name: userName,
          text: textComment,
          id: Date.now().toString(),
        }),
      });
      setTextComment("");
      Keyboard.dismiss();
    } else {
      Alert.alert(`Please, enter your comment`);
    }
  };

  return (
    <Modal animationType="slide" visible={showModalCmnts} transparent={true}>
      <Header
        placement="center"
        centerComponent={{
          text: "Comments",
          style: { ...styles.header },
        }}
        leftComponent={() => (
          <Button color="red" title="Back" onPress={onCancelModalCmnts} />
        )}
      />

      <View style={styles.modalBackdrop}>
        <View style={styles.modalContent}>
          <FlatList
            keyExtractor={(item, idx) => idx.toString()}
            data={post.comments}
            renderItem={({ item }) => <Comment post={post} comment={item} />}
          />
          <TextInput
            autoCapitalize={"none"}
            autoCorrect={false}
            style={styles.commentInput}
            onChangeText={(value) => setTextComment(value)}
            value={textComment}
            placeholder="Your comment..."
          />
          <View style={{ alignItems: "center" }}>
            <TouchableOpacity style={styles.btnAddComment} onPress={addComment}>
              <Text style={styles.addCommentText}>ADD</Text>
            </TouchableOpacity>
          </View>
        </View>
      </View>
    </Modal>
  );
};

const styles = StyleSheet.create({
  header: { color: "#fff", fontSize: 20 },
  modalBackdrop: {
    flex: 2,
    justifyContent: "center",
    backgroundColor: "rgba(0, 0, 0, 0.7)",
  },
  modalContent: { backgroundColor: "#fff", borderRadius: 20 },
  commentInput: {
    borderRadius: 20,
    borderColor: "#696969",
    margin: 10,
    borderWidth: 1,
    padding: 15,
  },
  btnAddComment: {
    width: "20%",
    justifyContent: "flex-end",
    backgroundColor: "#1e90ff",
    padding: 10,
    marginTop: 20,
    marginBottom: 20,
    borderRadius: 10,
    justifyContent: "center",
    alignItems: "center",
  },
  addCommentText: {
    fontSize: 18,
    color: "#000",
    fontFamily: "openSansLight",
  },
});
