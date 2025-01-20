import { PolyGonAPI } from "../../APIKeys"; // Your Polygon.io API key

export async function grabSymbols() {
  const url = `https://api.polygon.io/v3/reference/tickers?active=true&limit=100`;

  try {
    const response = await fetch(url, {
      method: "GET",
      headers: {
        Authorization: `Bearer ${PolyGonAPI}`,
      },
    });

    if (!response.ok) {
      console.log("Failed to fetch data:", response.statusText);
      throw new Error(`Failed to fetch data: ${response.statusText}`);
    }

    const data = await response.json();

    if (data && data.results && Array.isArray(data.results)) {
      const symbols = data.results.map(
        (ticker: { ticker: string }) => ticker.ticker,
      );
      console.log("Symbols extracted from Grabbing symbols:", symbols);
      return symbols;
    } else {
      throw new Error("Unexpected API response format. No tickers found.");
    }
  } catch (err) {
    console.error("Error fetching symbols:", err);
    return { error: err.message || "Unknown error occurred" };
  }
}
