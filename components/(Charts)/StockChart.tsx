import React, { useEffect, useState } from "react";
import { StyleSheet, Text, View } from "react-native";
import { LineChart } from "react-native-chart-kit";
import { Dimensions } from "react-native";
import { ScrollView } from "react-native-gesture-handler";

interface OHLCData {
  x: Date; // Date object for the x-axis
  open: number;
  high: number;
  low: number;
  close: number;
}

const { width, height } = Dimensions.get("window");

export const CandlestickChart: React.FC = () => {
  const [data, setData] = useState<OHLCData[]>([]);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchData = async () => {
      const apiKey = "YU9KJH0TKIDHYFQ4";
      const symbol = "AAPL";

      try {
        const response = await fetch(
          `https://www.alphavantage.co/query?function=TIME_SERIES_DAILY&symbol=${symbol}&apikey=${apiKey}&outputsize=compact`,
        );

        if (!response.ok) {
          throw new Error("Failed to fetch data");
        }

        const rawData = await response.json();
        const timeSeries = rawData["Time Series (Daily)"];

        if (timeSeries) {
          const parsedData = Object.entries(timeSeries).map(
            ([date, values]: [string, any]) => ({
              x: new Date(date),
              open: parseFloat(values["1. open"]),
              high: parseFloat(values["2. high"]),
              low: parseFloat(values["3. low"]),
              close: parseFloat(values["4. close"]),
            }),
          );

          setData(parsedData.slice(0, 12).reverse());
          setError(null);
        } else {
          setError("No more time left LOSER!!!!! 😭");
        }
      } catch (error: any) {
        setError(error.message);
        console.error("Error fetching data:", error);
      }
    };

    fetchData();
  }, []);

  // Transform data for LineChart (open-close points)
  const transformedData = {
    labels: data.map((d) => d.x.toLocaleDateString()),
    datasets: [
      {
        data: data.map((d) => d.close),
        strokeWidth: 2, // Line thickness
        color: (opacity = 1) => `rgba(0, 255, 0, ${opacity})`, // Green line for closing prices
      },
      {
        data: data.map((d) => d.open),
        strokeWidth: 2, // Line thickness
        color: (opacity = 1) => `rgba(0, 0, 255, ${opacity})`, // Blue line for opening prices
      },
    ],
  };

  if (error) {
    return (
      <View style={styles.errorContainer}>
        <Text style={styles.errorText}>Error: {error}</Text>
      </View>
    );
  }

  return (
    <ScrollView
      style={styles.container}
      contentContainerStyle={{ paddingBottom: 20 }}
    >
      {/* Vertical ScrollView for Chart */}
      <ScrollView horizontal={true} contentContainerStyle={styles.chartWrapper}>
        <LineChart
          data={transformedData}
          width={width * 2} // Set width to be large enough for horizontal scrolling
          height={400} // Increase height for better vertical scrolling
          chartConfig={{
            backgroundGradientFrom: "#ffffff",
            decimalPlaces: 2,
            color: (opacity = 1) => `rgba(0, 0, 0, ${opacity})`, // Label color
            labelColor: (opacity = 1) => `rgba(0, 0, 0, ${opacity})`,
            style: {
              borderRadius: 16,
            },
            propsForDots: {
              r: "6",
              strokeWidth: "2",
              stroke: "#ffa726",
            },
          }}
          style={{
            marginVertical: 8,
            borderRadius: 16,
          }}
        />
      </ScrollView>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    marginTop: 35,
    padding: 20,
  },
  errorContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    padding: 20,
  },
  errorText: {
    fontSize: 18,
    color: "red",
    fontWeight: "bold",
  },
  chartWrapper: {
    justifyContent: "center",
    paddingTop: 80,
    flexDirection: "row",
    flexWrap: "nowrap",
  },
});
