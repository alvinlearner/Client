import React, { useState } from "react";

export default function Clientfilter({ clients, onFilter }) {
  const [searchTerm, setSearchTerm] = useState("");

  const handleSearch = () => {
    onFilter(
      clients.filter((client) =>
        client.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        client.phone.toUpperCase().includes(searchTerm.toUpperCase()) ||
        client.idno.toLowerCase().includes(searchTerm.toLowerCase())

      )
    );
  };

  return (
    <div style={{ marginBottom: "10px" }}>
      <label style={{ marginRight: "10px", fontWeight:"bold" }}>Search client:</label>
      <input
        type="text"
        style={{fontWeight:"bold"}}
        placeholder="Search client"
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
      />
      <button onClick={handleSearch}>Search</button>
    </div>
  );
}
