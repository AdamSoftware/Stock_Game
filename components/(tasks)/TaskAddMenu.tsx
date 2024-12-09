import React, { useState, useEffect, useRef } from "react";
import { TaskButton } from "../../components/(buttons)/taskbutton";
import { SubmitButton } from "../(buttons)/SubmitButton";
import { CloseTaskButton } from "../(buttons)/CloseTaskButton";
import {
  View,
  StyleSheet,
  Modal,
  Dimensions,
  Animated,
} from "react-native";

const ScreenHeight = Dimensions.get("window").height;

export const TaskAddMenu = () => {
  const [modalVisible, setModalVisible] = useState(false);
  const slideAnim = useRef(new Animated.Value(ScreenHeight)).current; // Start off-screen at the bottom

  useEffect(() => {
    Animated.timing(slideAnim, {
      toValue: modalVisible ? 0 : ScreenHeight, // Slide up to on-screen or down off-screen
      duration: 700,
      useNativeDriver: true,
    }).start();
  }, [modalVisible]);

  return (
    <View style={styles.container}>
      {/* Button to show the modal */}
      <TaskButton title="New Task" onPress={() => setModalVisible(true)} />

      {/* Modal Overlay */}
      <Modal
        animationType="none" // Use no animation since we're handling it manually
        transparent={true}
        visible={modalVisible}
        onRequestClose={() => setModalVisible(false)}
      >
        <View style={styles.overlay}>
          <Animated.View
            style={[styles.AddMenu, { transform: [{ translateY: slideAnim }] }]}
          >
            {/* this is build too close the minipage and is being called from the button components */}
            <CloseTaskButton onPress={() => setModalVisible(false)} /> 
            <SubmitButton
              title="Create Task"
              onPress={() => setModalVisible(false)}
            />
          </Animated.View>
        </View>
      </Modal>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#25292e",
    alignItems: "center",
    justifyContent: "flex-start",
  },
  overlay: {
    flex: 1,
    justifyContent: "flex-start",
    alignItems: "flex-start",
    backgroundColor: "rgba(0, 0, 0, 0.5)", // Semi-transparent background
  },
  AddMenu: {
    position: "absolute",
    top: "15%", // Adjusted to leave more space at the top
    bottom: "10%", // Adjusted to leave space at the bottom
    left: "5%", // Added space on the left side
    right: "5%", // Added space on the right side
    backgroundColor: "#878787",
    padding: 30,
    borderTopEndRadius: 20,
    borderBottomEndRadius: 20,
    borderTopStartRadius: 20,
    borderBottomStartRadius: 20,
    justifyContent: "center", // Center content vertically inside the modal
    alignItems: "center", // Center content horizontally inside the modal
    transform: [{ translateX: "-50%" }, { translateY: "-50%" }], // Adjusted to ensure centering
  },
  modalText: {
    color: "#fff",
    fontSize: 18,
    marginBottom: 20,
  },
});
