import { Text, View, StyleSheet } from "react-native";
import { TaskButton } from "../../components/(buttons)/taskbutton";
import { SideBarMenu } from "../../components/(sidebar)/SideBarMenu";

export default function Index() {
  const handlePress = () => {
    console.log("Button pressed!");
  };

  return (
    <View style={styles.container}>
      <SideBarMenu />
      <Text style={styles.text}>Home screen</Text>
      <TaskButton title="new Task" onPress={handlePress} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#25292e",
    alignItems: "center",
    justifyContent: "center",
  },
  text: {
    color: "#fff",
    fontSize: 18,
  },
});
