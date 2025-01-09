import React, { useState, useEffect, useRef } from "react";
import {
  View,
  Text,
  StyleSheet,
  Modal,
  TouchableOpacity,
  Animated,
} from "react-native";
import Icon from "react-native-vector-icons/MaterialIcons";

export const SideBarMenu = () => {
  const [modalVisible, setModalVisible] = useState(false);
  const slideAnim = useRef(new Animated.Value(-300)).current;

  useEffect(() => {
    if (modalVisible) {
      // Animate to the visible position (slide in)
      Animated.timing(slideAnim, {
        toValue: 0,
        duration: 700,
        useNativeDriver: true,
      }).start();
    } else {
      // Animate back to off-screen (slide out)
      Animated.timing(slideAnim, {
        toValue: -300,
        duration: 700,
        useNativeDriver: true,
      }).start();
    }
  }, [modalVisible, slideAnim]);

  return (
    <View style={styles.container}>
      <TouchableOpacity
        onPress={() => setModalVisible(true)}
        style={styles.iconButton}
      >
        <Icon name="menu" size={24} color="#fff" />
      </TouchableOpacity>

      {/* Custom Modal with sliding animation */}
      <Modal
        transparent={true}
        visible={modalVisible}
        onRequestClose={() => setModalVisible(false)}
      >
        <View style={styles.overlay}>
          <TouchableOpacity
            style={styles.outsideTouchable}
            onPress={() => setModalVisible(false)}
          />
          <Animated.View
            style={[
              styles.sidebar,
              {
                transform: [{ translateX: slideAnim }], // Apply sliding animation
              },
            ]}
          >
            <TouchableOpacity
              onPress={() => setModalVisible(false)}
              style={styles.closeButton}
            >
              <Text style={styles.closeText}>Close</Text>
            </TouchableOpacity>

            <View style={styles.Items}>
              <View style={styles.SubItems}>
                <TouchableOpacity
                  onPress={() => setModalVisible(true)}
                  style={styles.iconButton}
                >
                  <Icon name="settings" size={24} color="#fff" />
                  <Text style={styles.text}>Settings</Text>
                </TouchableOpacity>
              </View>
            </View>
          </Animated.View>
        </View>
      </Modal>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    position: "absolute",
    top: 0,
    left: 0,
    width: "auto",
    alignSelf: "flex-start",
  },
  overlay: {
    flex: 1,
    flexDirection: "row",
    backgroundColor: "rgba(0, 0, 0, 0.5)", // Dim background
  },
  outsideTouchable: {
    flex: 1,
  },
  text: {
    marginLeft: 10,
    fontSize: 18,
    color: "#F8F8FF",
  },
  sidebar: {
    position: "absolute",
    left: 0, // Place it on the left
    top: 105,
    width: "auto",
    borderTopEndRadius: 20,
    borderBottomEndRadius: 20,
    borderTopStartRadius: 20,
    borderBottomStartRadius: 20,
    marginLeft: 5,
    backgroundColor: "#878787",
    borderRadius: "0, 0, 0, 20",
    padding: 20,
    elevation: 5,
    shadowColor: "#000",
    shadowOffset: { width: 2, height: 0 },
    shadowOpacity: 0.3,
    shadowRadius: 3,
    justifyContent: "flex-start",
  },
  iconButton: {
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
  closeButton: {
    position: "absolute",
    top: 20,
    left: 20,
    alignSelf: "flex-end",
  },
  closeText: {
    color: "#F8F8FF",
    fontSize: 16,
    fontWeight: "bold",
  },
  title: {
    fontSize: 18,
    fontWeight: "bold",
    padding: 10,
    justifyContent: "flex-start",
  },
  Items: {
    top: 20,
    bottom: 20,
    alignItems: "center",
  },
  SubItems: {
    paddingBottom: 10,
  },
});
