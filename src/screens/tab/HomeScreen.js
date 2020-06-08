import React, { useState, useEffect } from "react";
import { View, FlatList, StyleSheet } from "react-native";
import { useDispatch, useSelector } from "react-redux";
import { auth, firestore } from "../../../firebase/config";
import { Header } from "react-native-elements";
import { LogOut } from "../../components/LogOut";
import { Post } from "../../components/Post";

export const HomeScreen = () => {
  const dispatch = useDispatch();
  const [allPosts, setAllPosts] = useState([]);
  const { userId, userName } = useSelector((state) => state.user);

  useEffect(() => {
    currentUser();
  }, []);

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
          style: { ...styles.header },
        }}
        rightComponent={LogOut}
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
  header: { color: "#fff", fontSize: 18, fontFamily: "openSansBold" },
  container: {
    flex: 1,
    backgroundColor: "#fff",
    justifyContent: "center",
  },
});
