import React, { useState, useEffect } from "react";
import { View, FlatList } from "react-native";
import { useDispatch, useSelector } from "react-redux";
import { styles } from "../../../Styles";
import { auth, firestore } from "../../../firebase/config";
import Post from "../../components/Post";

export default function HomeScreen() {
  const dispatch = useDispatch();
  const [allPosts, setAllPosts] = useState([]);
  const { userId, userPosts } = useSelector((state) => state.user);

  useEffect(() => {
    currentUser();
  }, [userId]);

  // useEffect(() => {
  //   getAllPosts();
  // }, [userPosts]);

  // взять информацию (ид-юзера, и т.д.) текущего юзера
  const currentUser = async () => {
    const currentUser = await auth.currentUser;
    const data = await firestore.collection("posts").onSnapshot((data) =>
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
