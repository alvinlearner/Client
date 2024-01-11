import React, { useState, useEffect } from "react";
import "./ClientPost.css";

function AddTransaction() {
  const [reg, setReg] = useState("");
  const [policyno, Setpolicyno] = useState("");
  const [start, setStart] = useState("");
  const [expire, setExpire] = useState("");
  const [description, setDescription] = useState("");
  const [clientId, setClientId] = useState("");
  const [clients, setClients] = useState([]);

  useEffect(() => {
    fetch("http://localhost:8001/clients")
      .then((response) => {
        if (!response.ok) {
          throw new Error(`HTTP error! Status: ${response.status}`);
        }
        return response.json();
      })
      .then((data) => {
        // console.log("Server response:", data);
        setClients(data); // Assuming data is an array of clients
      })
      .catch((error) => {
        console.error("Error fetching clients:", error);
      });
  }, []);
  
  

  const handleSubmit = (e) => {
    e.preventDefault();

    const newTransaction = {
      start: start,
      expire: expire,
      reg: reg.toUpperCase(),
      description: description,
      policyno: policyno.toUpperCase(),
      client_id: parseInt(clientId, 10)
      
    };

    fetch("http://localhost:8001/transactions", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(newTransaction),
    })
      .then((res) => res.json())
      .then((data) => {
        console.log(data);
        setStart("");
        setExpire("");
        setReg("");
        setDescription("");
        Setpolicyno("");
        setClientId("");
        window.location.reload();
      })
      .catch((error) => {
        console.error(error);
      });
  };

  return (
    <>
    <div style={{ marginBottom: "10px", fontWeight: "bold" }}>
      <form onSubmit={handleSubmit} className="post-data">
        {clients && clients.length > 0 && (
          <label>
            Select Client:
            <select value={clientId} onChange={(e) => setClientId(e.target.value)} required>
              <option value="" disabled>Select Client</option>
              {clients.map((client) => (
                <option key={client.id} value={client.id}>
                  {client.name}
                </option>
              ))}
            </select>
          </label>
        )}
  
        <label>
          Registration Number:
          <input
            type="text"
            value={reg}
            placeholder="Enter Registration number"
            onChange={(e) => setReg(e.target.value)}
            required
          />
        </label>
  
        <label>
          Policy Number:
          <input
            type="text"
            value={policyno}
            placeholder="Enter policy number"
            onChange={(e) => Setpolicyno(e.target.value)}
            required
          />
        </label>
  
        <label>
          Starting date:
          <input
            type="date"
            value={start}
            onChange={(e) => setStart(e.target.value)}
            required
          />
        </label>
  
        <label>
          Expiry date:
          <input
            type="date"
            value={expire}
            onChange={(e) => setExpire(e.target.value)}
            required
          />
        </label>
  
        <label>
          Description:
          <input
            type="text"
            value={description}
            placeholder="Enter description"
            onChange={(e) => setDescription(e.target.value)}
            required
          />
        </label>
  
        <button type="submit" className="post-button">Add Policy</button>
      </form>
    </div>
    </>
  );
  
}

export default AddTransaction;


