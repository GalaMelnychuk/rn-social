import React from "react";
import { View } from "react-native";

export const AppCard = (props) => (
  <View
    style={{
      borderWidth: 2,
      borderRadius: 4,
      padding: 10,
      marginBottom: 8,
      borderColor: "#f0f8ff",
    }}
  >
    {props.children}
  </View>
);
