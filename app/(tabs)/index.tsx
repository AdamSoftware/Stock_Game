import { View, StyleSheet, ScrollView } from "react-native";
import { SideBarMenu } from "../../components/(sidebar)/SideBarMenu";
import { AllStocks } from "../../components/(Bought_Stocks)/AllStocks";
import { CandlestickChart } from "../../components/(Charts)/StockChart";
import { BusinessSymbols } from "../../components/(Charts)/BusinessSybols";

export default function Index() {
  return (
    <View style={styles.container}>
      <BusinessSymbols />
      <CandlestickChart />
      <SideBarMenu />
      <AllStocks />
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
