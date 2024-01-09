import React, { useState } from "react";

export default function Clientfilter({ transactions, onFilter }) {
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
      <label style={{ marginRight: "10px", fontWeight:"bold" }}>Search description:</label>
      <input
        type="text"
        placeholder="Search by description"
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
      />
      <button onClick={handleSearch}>Search</button>
    </div>
  );
}
