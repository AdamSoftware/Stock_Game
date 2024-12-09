import react from "react";
import { Text, StyleSheet, TouchableOpacity } from "react-native";

export const SubmitButton = ({ title = "placeholdre", onPress }) => {
  return (
    <TouchableOpacity style={styles.SubmitButton} onPress={onPress}>
      <Text style={styles.SubmitButtonText}>{title}</Text>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  SubmitButton: {
    position: "absolute",
    bottom: 40,
    width: "100%",
    backgroundColor: "#d7d7d7",
    padding: 15,
    borderRadius: 25,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 4,
    elevation: 5,
  },
  SubmitButtonText: {
    textAlign: "center",
    color: "#000000",
    fontSize: 25,
  },
});
