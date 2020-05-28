import React from "react";
import { View } from "react-native";

const AppCard = (props) => <View style={{
    borderWidth: 2,
    borderRadius: 4,
    padding: 10,
    margin: 8,
    borderColor: "#f0f8ff",
  }}>{props.children}</View>;

export default AppCard;