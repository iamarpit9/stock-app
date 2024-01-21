import React from "react";
import "./App.css";
import Table from "./Components/Table";
import StockState from "./Context/StockState";

function App() {
  return (
    <div className="App">
      <StockState>
        <Table />
      </StockState>
    </div>
  );
}

export default App;
