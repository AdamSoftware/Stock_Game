import { View, StyleSheet, ScrollView } from "react-native";
import { SideBarMenu } from "../../components/(sidebar)/SideBarMenu";
import { AllStocks } from "../../components/(Bought_Stocks)/AllStocks";
import { StockChart } from "../../components/(Charts)/StockChart";

export default function Index() {
  return (
    <View style={styles.container}>
      <ScrollView contentContainerStyle={styles.scrollContainer}>
        <StockChart />
        <SideBarMenu />
        <AllStocks />
      </ScrollView>
    </View>
  );
}
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#25292e",
  },
  scrollContainer: {
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "flex-start",
    padding: 10,
  },
});
