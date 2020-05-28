import React from 'react';
import { Text, TouchableOpacity, View } from "react-native";

const Comment = ({ comment }) => {
//   const [showModal, setShowModal] = useState(false);

  return (
      <View>
    <Text
    style={{
      fontSize: 70,
      color: "black",
      justifyContent: "center",
      alignItems: "center",
      color: "blue",
    }}
  >
    {comment}
  </Text>
  </View>
  );
};

export default Comment;
 