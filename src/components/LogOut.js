import React from "react";
import { TouchableOpacity, Text } from "react-native";
import { useDispatch } from "react-redux";
import { Ionicons } from "@expo/vector-icons";
import { auth} from "../../firebase/config";

const LogOut = () => {
  const dispatch = useDispatch();
  const signOut = async () => {
    await auth.signOut();
    dispatch({ type: "USER_SIGNOUT" });
  };

  return (
    <TouchableOpacity
      onPress={signOut}
      style={{
        flexDirection: "row",
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <Ionicons
        name="ios-exit"
        size={24}
        color="#fff"
      />
      <Text style={{ fontSize: 14, color: "#fff" }}>LogOut</Text>
    </TouchableOpacity>
  );
};

export default LogOut;
