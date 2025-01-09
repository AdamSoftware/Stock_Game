import React, { useEffect, useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  ActivityIndicator,
  Dimensions,
} from "react-native";
import { LineChart } from "react-native-chart-kit"; // Import LineChart
import { ScrollView } from "react-native-gesture-handler";

type StockData = {
  time: string;
  high: number;
  close: number;
};

const screenWidth = Dimensions.get("window").width;

export const StockChart = () => {
  const [data, setData] = useState<StockData[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchStockData = async () => {
      const apiKey = "YU9KJH0TKIDHYFQ4";
      const symbol = "AAPL";
      const url = `https://www.alphavantage.co/query?function=TIME_SERIES_DAILY&symbol=${symbol}&apikey=${apiKey}&outputsize=compact`;

      try {
        const response = await fetch(url);
        const result = await response.json();

        if (result["Time Series (Daily)"]) {
          const historicalData = Object.entries(result["Time Series (Daily)"])
            .slice(0, 10)
            .map(([date, values]: [string, any]) => ({
              time: date,
              high: parseFloat(values["2. high"]),
              close: parseFloat(values["4. close"]),
            }));
          setData(historicalData);
        } else {
          throw new Error("Invalid data returned");
        }
      } catch (error: any) {
        console.error("Error fetching stock data:", error);
        setError("Failed to fetch stock data. Please try again later.");
      } finally {
        setLoading(false);
      }
    };

    fetchStockData();
  }, []);

  if (loading) {
    return (
      <View style={styles.centered}>
        <ActivityIndicator size="large" color="#0000ff" />
        <Text>Loading...</Text> {/* Wrap text correctly */}
      </View>
    );
  }

  if (error) {
    return (
      <View style={styles.centered}>
        <Text style={styles.errorText}>{error}</Text>{" "}
        {/* Wrap error text properly */}
      </View>
    );
  }

  const chartData = {
    labels: data.map((entry) => entry.time),
    datasets: [
      {
        data: data.map((entry) => entry.close),
        strokeWidth: 2,
        color: () => "#8884d8", // Line color
      },
      {
        data: data.map((entry) => entry.high),
        strokeWidth: 2,
        color: () => "#82ca9d", // Line color
      },
    ],
  };

  return (
    <View style={styles.container}>
      <ScrollView horizontal>
        <LineChart
          data={chartData}
          width={300} // Extend width to make chart scrollable
          height={300}
          chartConfig={{
            backgroundColor: "#fff",
            backgroundGradientFrom: "#fff",
            backgroundGradientTo: "#fff",
            decimalPlaces: 2, // Round to 2 decimal places
            color: () => "#000", // Line color
            labelColor: () => "#000", // Label color
            style: {
              borderRadius: 16,
            },
          }}
          withDots={false} // Remove dots from the line
          withInnerLines={false} // Hide inner lines
          withOuterLines={false} // Hide outer lines
        />
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    padding: 16,
  },
  centered: {
    justifyContent: "center",
    alignItems: "center",
    flex: 1,
  },
  errorText: {
    color: "red",
    fontSize: 16,
  },
});
