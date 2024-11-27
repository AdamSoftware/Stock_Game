import React from "react";
import { View, StyleSheet, TouchableOpacity } from "react-native";
import Icon from "react-native-vector-icons/MaterialIcons"; // Choose your icon set

export const BtnSidebar = ({ onPress }) => {
  return (
    <View style={styles.sidebar}>
      <TouchableOpacity style={styles.Sidebar} onPress={onPress}>
        <Icon name="menu" size={24} color="#fff" /> {/* Add your icon */}
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  sidebar: {
    position: "absolute",
    top: 0,
    left: 0,
    width: "auto",
    alignSelf: "flex-start",
  },
  Sidebar: {
    flexDirection: "row", // Align icon and text
    alignItems: "center",
    justifyContent: "space-between",
    paddingVertical: 15,
    paddingHorizontal: 20,
    borderRadius: 25,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 4,
    elevation: 5,
  },
  text: {
    color: "#fff",
    fontSize: 16,
    marginLeft: 10,
  },
});
