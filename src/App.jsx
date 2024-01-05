import React from "react";
import "./App.css";
import DisplayTransaction from "./components/TransactionDisplay";
import AddTransaction from "./components/TransactionPost";

function App() {
  return (
    <>
      <h1>MOTOR CLIENT TRACKER</h1>
      <AddTransaction />
      <br/>
      <DisplayTransaction />
    </>
  );
}

export default App;
