import { Text, View, StyleSheet } from "react-native";
import {TaskAddMenu} from "../../components/(tasks)/TaskAddMenu";
import { SideBarMenu } from "../../components/(sidebar)/SideBarMenu";

export default function Index() {

  return (
    <View style={styles.container}>
      <SideBarMenu />
      <TaskAddMenu />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#25292e",
    alignItems: "center",
    justifyContent: "flex-start",
  },
});
 