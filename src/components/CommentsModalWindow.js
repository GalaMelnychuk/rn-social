import React from "react";
import { Modal, StyleSheet, FlatList, Text, Button, View } from "react-native";
import Comment from "./Comment";

const CommentsModalWindow = ({ showModalCmnts, onCancelModalCmnts, post }) => {
  return (
    <Modal animationType="slide" visible={showModalCmnts} transparent={true}>
      <View
        style={{
          flex: 2,
          justifyContent: "center",
          alignItems: "center",
          marginHorizontal: 30,
          backgroundColor: "#d3d3d3",
          borderRadius: 20,
          padding: 15,
          shadowColor: "#000",
          shadowOffset: {
            width: 0,
            height: 2,
          },
          shadowOpacity: 0.7,
          shadowRadius: 3.84,
          elevation: 5,
        }}
      >
        <View>
          <FlatList
            keyExtractor={(item, idx) => idx.toString()}
            data={post.comments}
            renderItem={({ item }) => <Comment comment={item} />}
          />
        </View>

        <View style={{ width: 200, height: 200, justifyContent: "center" }}>
          <Button title="Back" onPress={onCancelModalCmnts} />
        </View>
      </View>
    </Modal>
  );
};

export default CommentsModalWindow;
