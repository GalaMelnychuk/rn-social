import React, { useState, useEffect } from "react";
import {
  TouchableOpacity,
  Text,
  View,
  StyleSheet,
  FlatList,
} from "react-native";
import { useDispatch, useSelector } from "react-redux";
import { Header } from "react-native-elements";
import { useNavigation } from "@react-navigation/native";
import { auth, firestore } from "../../../firebase/config";

import {Post} from "../../components/Post";

export const MyBlogScreen = () => {
  const dispatch = useDispatch();
  const [allPosts, setAllPosts] = useState([]);
  const navigation = useNavigation();
  const { userId } = useSelector((state) => state.user);

  useEffect(() => {
    currentUser();
    getAllPosts();
  }, [userId]);

  useEffect(() => {
    getAllPosts();
  }, []);

  // взять информацию (ид-юзера, и т.д.) текущего юзера
  const currentUser = async () => {
    const currentUser = await auth.currentUser;
    dispatch({
      type: "CURRENT_USER",
      payload: { userName: currentUser.displayName, userId: currentUser.uid },
    });
  };

  const getAllPosts = async () => {
    const dataPosts = await firestore
      .collection("posts")
      .where("userId", "==", userId)
      .onSnapshot((data) => setAllPosts(data.docs.map((doc) => doc.data())));
  };

  return (
    <>
      <Header
        leftComponent={
          <TouchableOpacity onPress={() => navigation.navigate("Home")}>
            <Text style={styles.btnTextBack}>Back</Text>
          </TouchableOpacity>
        }
        centerComponent={{
          text: `My Blog`,
          style: { ...styles.header },
        }}
      />
      <View style={styles.container}>
        <FlatList
          keyExtractor={(item, idx) => idx.toString()}
          data={allPosts}
          renderItem={({ item }) => <Post post={item} />}
        />
      </View>
    </>
  );
}

const styles = StyleSheet.create({
  btnTextBack: {
    fontSize: 18,
    color: "#fff",
    fontFamily: "openSansLight",
  },
  header: { color: "#fff", fontSize: 18, fontFamily: "openSansBold" },
  container: {
    flex: 1,
    backgroundColor: "#fff",
    justifyContent: "center",
  },
});
