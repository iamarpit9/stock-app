import React, { useEffect, useContext } from "react";
import stockContext from "../Context/stockContext";
import "./Table.css";
import Loader from "./Loader";
import { StockData } from "../APIResponseType";
const Table: React.FC = () => {
  const context = useContext(stockContext);
  const {
    fetchData,
    stockData,
    currentPage,
    paginateCount,
    setCurrentPage,
    pageSize,
    loading,
    allData,
  } = context;

  const totalPages: number = Math.ceil(paginateCount / pageSize);

  useEffect(() => {
    fetchData();

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [currentPage]); // Fetch data whenever currentPage changes

  const handlePrevPage = () => {
    setCurrentPage(currentPage - 1);
  };

  const handleNextPage = () => {
    if (currentPage <= totalPages) {
      setCurrentPage(currentPage + 1);
    }
  };

  const calculateOpenColor = (data: any, index: number) => {
    if (index > 0) {
      const previousClose = data[index - 1].close;
      return data[index].open > previousClose
        ? "green"
        : data[index].open < previousClose
        ? "red"
        : "black";
    }

    return "black"; // Default color for the first entry
  };

  // Function to calculate the color for closing price
  const calculateCloseColor = (data: any, index: number) => {
    if (index >= 0) {
      const previousOpen = data[index].open;
      return data[index].close > previousOpen
        ? "green"
        : data[index].close < previousOpen
        ? "red"
        : "black";
    }
    return "black"; // Default color for the first entry
  };

  return (
    <>
      <div className="table">
        <div className="table-header">
          <h1>Stock Market Data</h1>
        </div>
        <div className="table-body">
          <table>
            <thead>
              <tr>
                <th>Date</th>
                <th>Open</th>
                <th>Close</th>
              </tr>
            </thead>
            {loading && <Loader />}
            {!loading && (
              <tbody>
                {stockData?.map((entry: StockData, index: number) => (
                  <tr key={index}>
                    <td>{entry.date.split("T")[0]}</td>
                    <td
                      style={{
                        color: calculateOpenColor(
                          allData,
                          index + pageSize * (currentPage - 1)
                        ),
                      }}
                    >
                      {entry.open}
                    </td>
                    <td
                      style={{
                        color: calculateCloseColor(
                          allData,
                          index + pageSize * (currentPage - 1)
                        ),
                      }}
                    >
                      {entry.close}
                    </td>
                  </tr>
                ))}
              </tbody>
            )}
          </table>
        </div>

        <div className="btn-group">
          <button
            className="prev-btn"
            onClick={handlePrevPage}
            disabled={currentPage === 1 ? true : false}
          >
            Prev
          </button>

          <button
            className="next-btn"
            onClick={handleNextPage}
            disabled={currentPage === totalPages ? true : false}
          >
            Next
          </button>
        </div>
      </div>
    </>
  );
};

export default Table;
