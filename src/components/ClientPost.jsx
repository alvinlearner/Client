import React, { useState } from "react";
import "./ClientPost.css";

function ClientPost() {
  const [reg, setReg] = useState("");
  const [policyno, Setpolicyno] = useState("");
  const [start, setStart] = useState("");
  const [expire, setExpire] = useState("");
  const [description, setDescription] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();

    const regInUppercase = reg.toUpperCase();

    const newTransaction = {
      start: start,
      expire: expire,
      reg: regInUppercase,
      description: description,
      policyno: policyno,
    };

    fetch(`http://localhost:8001/transactions`, {
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
        window.location.reload();
      })
      .catch((error) => {
        console.error(error);
      });
  };

  return (
    <div className="container" style={{ marginBottom: "10px", fontWeight: "bold" }}>
      <form onSubmit={handleSubmit}>
        <label>
          Name:
          <input
            type="text"
            value={reg}
            placeholder="Enter Name"
            onChange={(e) => setReg(e.target.value)}
            required
          />
        </label>

        <label>
          Phone:
          <input
            type="text"
            value={policyno}
            placeholder="Enter phone number"
            onChange={(e) => Setpolicyno(e.target.value)}
            required
          />
        </label>

        <label>
          Email:
          <input
            type="text"
            value={start}
            placeholder="Enter email"
            onChange={(e) => setStart(e.target.value)}
            required
          />
        </label>

        <label>
          K.R.A pin:
          <input
            type="text"
            value={expire}
            onChange={(e) => setExpire(e.target.value)}
            required
            placeholder="Enter K.R.A pin"
          />
        </label>

        <label>
          Documents:
          <input
            type="file"
            value={description}
            placeholder="Enter description"
            accept="application/pdf,application/vnd.ms-excel"
            onChange={(e) => setDescription(e.target.value)}
            
          />
        </label>

        <button type="submit">Add Client</button>
      </form>
    </div>
  );
}

export default ClientPost;
