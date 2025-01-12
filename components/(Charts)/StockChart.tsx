// WARNING: that alpha vantage API you can only make 25 requests per day for free
// must find a different API to use for this project but this will work for testing
// I could sub for more requests but I don't want to pay for this project

import React, { useEffect, useState } from "react";

import { StyleSheet } from "react-native";

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

const { width } = Dimensions.get("window");

export const CandlestickChart: React.FC = () => {
  const [data, setData] = useState<OHLCData[]>([]);
  const [setError] = useState<string | null>(null);

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

          setData(parsedData.slice(0, 30).reverse());
          setError(null);
        } else {
          console.error("no valid time series data found", rawData);
        }
      } catch (error) {
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
        color: (opacity = 1) => (opacity ? "green" : "red"),
      },
      {
        data: data.map((d) => d.open),
        strokeWidth: 2, // Line thickness
        color: (opacity = 1) => (opacity ? "blue" : "yellow"),
      },
    ],
  };

  return (
    <ScrollView style={styles.container}>
      <LineChart
        data={transformedData}
        width={width - 40} // Set width of the chart
        height={210}
        chartConfig={{
          backgroundGradientFrom: "#ffffff",
          backgroundGradientTo: "#ffffff",
          decimalPlaces: 2,
          color: (opacity = 1) => `rgba(0, 0, 0, ${opacity})`,
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
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    marginTop: 25,
    padding: 20,
  },
});
