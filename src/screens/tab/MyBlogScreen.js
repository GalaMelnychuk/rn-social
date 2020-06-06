import React, { useState, useEffect } from "react";
import {
  TouchableOpacity,
  Text,
  View, Alert,
  FlatList,
} from "react-native";
import { useDispatch, useSelector } from "react-redux";
import { Header } from "react-native-elements";
import { useNavigation } from "@react-navigation/native";
import { styles } from "../../../Styles";
import { auth, firestore } from "../../../firebase/config";

import MyBlogPost from "../../components/MyBlogPost";

export default function MyBlogScreen() {
  const dispatch = useDispatch();
  const [allPosts, setAllPosts] = useState([]);
  const navigation = useNavigation();
  const { userId, userPosts } = useSelector((state) => state.user);

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
            <Text
              style={{
                fontSize: 18,
                color: "#fff",
                fontFamily: "openSansLight",
              }}
            >
              Back
            </Text>
          </TouchableOpacity>
        }
        centerComponent={{
          text: `My Blog`,
          style: { color: "#fff", fontSize: 18, fontFamily: "openSansBold" },
        }}
      />
      <View style={styles.container}>
        <FlatList
          keyExtractor={(item, idx) => idx.toString()}
          data={allPosts}
          renderItem={({ item }) => <MyBlogPost post={item} />}
        />
      </View>
    </>
  );
}
