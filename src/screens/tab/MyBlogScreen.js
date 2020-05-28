import React, { useState, useEffect } from "react";
import {
  Alert,
  TouchableOpacity,
  Keyboard,
  Text,
  View,
  StyleSheet,
  TextInput,
  FlatList,
} from "react-native";
import { useDispatch, useSelector } from "react-redux";
import { styles } from "../../../Styles";
import { auth, firestore } from "../../../firebase/config";
import Post from '../../components/Post';

export default function MyBlogScreen () {
  const dispatch = useDispatch();
  const [allPosts, setAllPosts] = useState([]);
  const { userId, userPosts } = useSelector((state) => state.user);

  useEffect(() => {
    currentUser();
    getAllPosts();
  }, [userId]);

  // useEffect(() => {
  //   getAllPosts();
  // }, [userPosts]);

  // взять информацию (ид-юзера, и т.д.) текущего юзера
  const currentUser = async () => {
    const currentUser = await auth.currentUser;
    dispatch({
      type: "CURRENT_USER",
      payload: { userName: currentUser.displayName, userId: currentUser.uid },
    });
  };

  const signOut = async () => {
    await auth.signOut();
    dispatch({ type: "USER_SIGNOUT" });
  };

  const getAllPosts = async () => {
    const dataPosts = await firestore
      .collection("posts")
      .where("userId", "==", userId)
      .onSnapshot((data) => setAllPosts(data.docs.map((doc) => doc.data())));

  };

  return (
    <>
      <View style={styles.container}>
        <FlatList
          keyExtractor={(item) => item.userId}
          data={allPosts}
          renderItem={({ item }) =>(<Post post={item} />)}
        />
      </View>
    </>
  );
}

const stylesText = StyleSheet.create({
  tex: {
    color: "blue",
    fontSize: 70,
    marginBottom: 20,
    // marginHorizontal: 80,
    alignItems: "center",
  },
});
