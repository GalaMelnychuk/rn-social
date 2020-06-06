import React, { useState, useEffect } from "react";
import { View, FlatList, Alert } from "react-native";
import { useDispatch, useSelector } from "react-redux";
import { styles } from "../../../Styles";
import { auth, firestore } from "../../../firebase/config";
import { Header } from "react-native-elements";
import LogOut from "../../components/LogOut";
import Post from "../../components/Post";

export default function HomeScreen() {
  const dispatch = useDispatch();
  const [allPosts, setAllPosts] = useState([]);
  const { userId, userName } = useSelector((state) => state.user);

  useEffect(() => {
    currentUser();
  }, [userId]);
  

  const currentUser = async () => {
    const currentUser = await auth.currentUser;
    await firestore.collection("posts").onSnapshot((data) =>
      setAllPosts(
        data.docs.map((doc) => {
          // console.log('doc.id', doc.id)
          return { ...doc.data(), id: doc.id };
        })
      )
    );

    dispatch({
      type: "CURRENT_USER",
      payload: { userName: currentUser.displayName, userId: currentUser.uid },
    });
  };

  return (
    <>
      <Header
        centerComponent={{
          text: `Hello, ${userName}!`,
          style: { color: "#fff", fontSize: 18, fontFamily: "openSansBold" },
        }}
        rightComponent={LogOut}
      />
      <View style={styles.container}>
        <FlatList
          keyExtractor={(item, idx) => idx.toString()}
          data={allPosts}
          renderItem={({ item }) => <Post deletePost={deletePost} post={item} />}
        />
      </View>
    </>
  );
}
