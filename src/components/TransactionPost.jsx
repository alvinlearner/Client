import React, { useState, useEffect } from "react";
import "./ClientPost.css";

function AddTransaction() {
  const [reg, setReg] = useState("");
  const [policyno, Setpolicyno] = useState("");
  const [start, setStart] = useState("");
  const [expire, setExpire] = useState("");
  const [classification, setClassification] = useState(""); // Updated state for classification
  const [clientId, setClientId] = useState("");
  const [premium, setPremium] = useState();
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
        setClients(data);
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
      classification: classification,
      premium: premium,
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
        setClassification("");
        Setpolicyno("");
        setClientId("");
        setPremium(0)
        window.location.reload();
      })
      .catch((error) => {
        console.error(error);
      });
  };

  return (
    <>
      <div className="container mx-auto p-4" style={{ marginBottom: "10px", fontWeight: "bold" }}>
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
            Classification:
            <select value={classification} onChange={(e) => setClassification(e.target.value)} required>
            <option value="" disabled>Select Classification</option>
            <optgroup label="Comprehensive">
              <option value="Comprehensive Private">Comprehensive Private</option>
              <option value="Comprehensive Commercial">Comprehensive Commercial</option>
              <option value="Comprehensive PSV">Comprehensive P.S.V</option>
              <option value="Comprehensive TSV">Comprehensive T.S.V</option>
              <option value="Comprehensive Special MV">Comprehensive Special M.V</option>
              <option value="Comprehensive Trailer">Comprehensive Trailer</option>
              </optgroup>

              <optgroup label="T.P.O">
              <option value="T.P.O Private">T.P.O Private</option>
              <option value="T.P.O Commercial">T.P.O Commercial</option>
              <option value="T.P.O PSV">T.P.O P.S.V</option>
              <option value="T.P.O TSV">T.P.O T.S.V</option>
              <option value="T.P.O Special MV">T.P.O Special M.V</option>
              <option value="T.P.O Trailer">T.P.O Trailer</option>\
              </optgroup>

            </select>
          </label>       

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
            Premium:
            <input
              placeholder="Enter premium amount"
              type="number"
              value={premium}
              onChange={(e) => setStart(e.target.value)}
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

          <button type="submit"
            className="bg-green-600 hover:bg-green-500 text-white font-bold py-1 px-3 rounded"
           >Add Policy</button>
        </form>
      </div>
    </>
  );
}

export default AddTransaction;
