import React from "react";
import { TouchableOpacity, Text, StyleSheet } from "react-native";
import { useDispatch } from "react-redux";
import { Ionicons } from "@expo/vector-icons";
import { auth } from "../../firebase/config";

export const LogOut = () => {
  const dispatch = useDispatch();
  const signOut = async () => {
    await auth.signOut();
    dispatch({ type: "USER_SIGNOUT" });
  };

  return (
    <TouchableOpacity onPress={signOut} style={styles.btnLogOut}>
      <Ionicons name="ios-exit" size={24} color="#fff" />
      <Text style={styles.text}>LogOut</Text>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  btnLogOut: {
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
  },
  text: { fontSize: 14, color: "#fff" },
});
