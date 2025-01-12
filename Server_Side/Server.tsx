// TODO: this will create the calls to fetch the data from the API for the stock chart on the first page.
// will try this later because I do not know how to set up a complete backend without it being with a return for the front end in react typescript.

import { useEffect } from "react";

export const CandlestickChart = () => {
  // grabbing the data
  const [data, setData] = useState<any[]>([]);

  useEffect(() => {
    const fetchStockData = async () => {
      const APIKey = "YU9KJH0TKIDHYFQ4";
      const symbol = "AAPL"; // WARNING: This is default hard coded for apple stock TESTING PURPOSES please don't forget to change this
      const response = await fetch(
        `https://www.alphavantage.co/query?function=TIME_SERIES_DAILY&symbol=${symbol}&apikey=${APIKey}&outputsize=compact`,
      );
      const data = await response.json();

      setData(data);
    };
    fetchStockData();
  }, []);
};
