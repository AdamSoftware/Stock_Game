// BUG: all the different things in here are coming back as uknown

import React, { useEffect, useState } from "react";
import { View, Text, StyleSheet } from "react-native";
import RNPickerSelect from "react-native-picker-select";
import { grabSymbols } from "./GrabbingSyboles";

export const BusinessSymbols = () => {
  const [symbols, setSymbols] = useState<string[]>([]);
  const [selectedSymbol, setSelectedSymbol] = useState<string>("");
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    grabSymbols()
      .then((res) => {
        const tickers = Object.values(res).map(
          (item: { ticker: string }) => item.ticker,
        );
        setSymbols(tickers);
        console.log("Set symbols:", tickers);

        // BUG: it is hitting this so that is good it means it has data
        if (tickers.length > 0) {
          setSelectedSymbol(tickers[0]);
          // BUG: this is coming back as uknown
          console.log("ticker length is set:", tickers);
        }
      })
      .catch((err) => {
        setError("An error occurred while fetching symbols");
        console.log("Error fetching symbols:", err);
      });
  }, []);

  // WARNING: I don't know about this I have not gotton that far yet
  const handleSelectSymbol = (value: string) => {
    setSelectedSymbol(value);
    console.log("Selected symbol:", value);
  };

  // BUG: uknown
  console.log("Symbols:", symbols);

  return (
    <View style={styles.container}>
      <Text>Select a Symbol:</Text>
      {symbols.length > 0 ? (
        <RNPickerSelect
          onValueChange={handleSelectSymbol}
          value={selectedSymbol}
          items={symbols.map((symbol) => ({
            label: symbol,
            value: symbol,
          }))}
          style={pickerSelectStyles}
        />
      ) : (
        <Text>Loading symbols...</Text>
      )}
      {selectedSymbol && <Text>You selected: {selectedSymbol}</Text>}
      {error && <Text style={styles.errorText}>{error}</Text>}
    </View>
  );
};

const pickerSelectStyles = StyleSheet.create({
  inputIOS: {
    fontSize: 18,
    paddingVertical: 10,
    paddingHorizontal: 12,
    borderWidth: 1,
    borderColor: "gray",
    borderRadius: 4,
    color: "black",
    paddingRight: 30,
    marginVertical: 10,
  },
  inputAndroid: {
    fontSize: 18,
    paddingVertical: 10,
    paddingHorizontal: 12,
    borderWidth: 1,
    borderColor: "gray",
    borderRadius: 4,
    color: "black",
    paddingRight: 30,
    marginVertical: 10,
  },
});

const styles = StyleSheet.create({
  container: {
    padding: 20,
    justifyContent: "center",
    alignItems: "center",
  },
  selectedText: {
    fontSize: 18,
    fontWeight: "bold",
    color: "#008000",
    marginBottom: 20,
  },
  errorText: {
    color: "red",
    fontSize: 16,
    marginBottom: 10,
  },
});
