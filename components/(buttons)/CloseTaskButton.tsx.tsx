import React from "react";
import { Text, StyleSheet, TouchableOpacity } from "react-native";

export const CloseTaskButton = ({ title = "placeholdre", onPress }) => {
  <TouchableOpacity style={styles.closeButton} onPress={onPress}>
    <Text style={styles.closeButtonText}>{title}</Text>
  </TouchableOpacity>;
};

const styles = StyleSheet.create({
  closeButton: {
    backgroundColor: "#f44336",
    padding: 10,
    borderRadius: 5,
  },
  closeButtonText: {
    color: "#fff",
    fontSize: 16,
  },
});
