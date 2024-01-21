import StockContext from "./stockContext";
import React, { useState } from "react";
import axios from "axios";
import { StockData } from "../APIResponseType";

const StockState = (props) => {
  const [stockData, setStockData] = useState<StockData[]>([]);
  const [paginateCount, setpaginateCount] = useState<number>();
  const [loading, setLoading] = useState<boolean>(false);
  const [allData, setAllData] = useState<StockData[]>([]);

  const [currentPage, setCurrentPage] = useState<number>(1);
  const [pageSize] = useState<number>(7);

  const fetchData = async (): Promise<any> => {
    try {
      setLoading(true);
      const apiUrl = `https://f68370a9-1a80-4b78-b83c-8cb61539ecd6.mock.pstmn.io/api/v1/get_market_data/`;

      const response = await axios.get(apiUrl);
      const tData = response.data;
      const stdata = tData.data.reverse();

      const paginatData = tData.pagination;
      setpaginateCount(paginatData.count);

      // Calculate start and end index based on current page and page size
      const startIndex = (currentPage - 1) * pageSize;
      const endIndex = startIndex + pageSize;

      // Extract the data for the current page
      const pageData = stdata.slice(startIndex, endIndex);

      setStockData(pageData);
      setAllData(stdata);
      setLoading(false);
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };
  console.log(allData);

  return (
    <StockContext.Provider
      value={{
        fetchData,
        stockData,
        paginateCount,
        currentPage,
        setCurrentPage,
        pageSize,
        loading,
        allData,
      }}
    >
      {props.children}
    </StockContext.Provider>
  );
};

export default StockState;
