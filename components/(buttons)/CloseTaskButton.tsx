import React from "react";
import { Text, StyleSheet, TouchableOpacity } from "react-native";
import Icon from "react-native-vector-icons/MaterialIcons"; // Choose your icon set

export const CloseTaskButton = ({ onPress }) => {
  return (
    <TouchableOpacity onPress={onPress} style={styles.closeButton}>
      <Icon name="close" size={30} color="#000" /> {/* Add your icon */}
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  closeButton: {
    position: "absolute",
    top: "5%",
    left: "5%",
    padding: 10,
    borderRadius: 5,
  },
});
