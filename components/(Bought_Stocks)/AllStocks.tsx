import { View, Text, StyleSheet, TouchableOpacity } from "react-native";
import { IconWithDynamicColor } from "./IconWithDynamics";
import { DynamicAmounts } from "./DynamicAmounts";
import { ScrollView } from "react-native-gesture-handler";

export const AllStocks = ({ onPress }) => {
  return (
    <ScrollView>
      <View>
        <TouchableOpacity onPress={onPress}>
          <View style={styles.StockChildren}>
            <Text style={styles.StockChildrenText}>Apple</Text>
            <IconWithDynamicColor
              name="arrow-upward"
              condition="up"
              style={styles.StockChildrenicon}
            />
            <DynamicAmounts
              style={styles.StockChildrenAmount}
              text={200}
              condition="plus"
            />
            <Text style={styles.StockChildrenGraph}>Graph</Text>
          </View>
        </TouchableOpacity>
        /* this is the second test down stock */
        <TouchableOpacity onPress={onPress}>
          <View style={styles.StockChildren}>
            <Text style={styles.StockChildrenText}>Tesla</Text>
            <IconWithDynamicColor
              name="arrow-downward"
              condition="down"
              style={styles.StockChildrenicon}
            />

            <DynamicAmounts
              style={styles.StockChildrenAmount}
              text={100}
              condition="minus"
            />
            <Text style={styles.StockChildrenGraph}>Graph</Text>
          </View>
        </TouchableOpacity>
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  text: {
    fontSize: 20,
    marginTop: 300,
    textAlign: "center",
    padding: 10,
    color: "white",
  },
  StockChildren: {
    padding: 10,
    margin: 10,
    borderRadius: 10,
    borderWidth: 2,
    borderColor: "white",
    backgroundColor: "gray",
    display: "flex",
    flexDirection: "row",
  },
  StockChildrenText: {
    fontSize: 20,
    padding: 4,
    color: "white",
  },
  StockChildrenicon: {
    fontSize: 20,
    paddingLeft: 4,
  },
  StockChildrenGraph: {
    fontSize: 20,
    padding: 4,
    color: "white",
  },
  StockChildrenAmount: {
    fontSize: 20,
    paddingRight: 6,
  },
});
