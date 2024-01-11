import React, { useState } from "react";
import "./buttons.css"; 
export default function TransactionFilter({ transactions, onFilter }) {
  const [searchTerm, setSearchTerm] = useState("");

  const handleSearch = () => {
    onFilter(
      transactions.filter((transaction) =>
        transaction.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
        transaction.reg.toUpperCase().includes(searchTerm.toUpperCase()) ||
        transaction.policyno.toLowerCase().includes(searchTerm.toLowerCase())

      )
    );
  };

  return (
    <div style={{ marginBottom: "10px" }}>
      <label style={{ marginRight: "10px",fontWeight:"bold" }}>Search for policy:</label>
      <input
        type="text"
        placeholder="Search for policy"
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
        className="searchbar"
      />
      <button onClick={handleSearch} className="search-button">Search</button>
    </div>
  );
}
