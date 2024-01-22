import React, { useState } from "react";
import "./ClientPost.css";


function ClientPost() {
  const [name, setName] = useState("");
  const [phone, SetPhone] = useState("");
  const [email, setEmail] = useState("");
  const [krapin, setKrapin] = useState("");
  const [idno, setIdno] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();

const Upperkrapin = krapin.toUpperCase()

    const newTransaction = {
      name: name,
      phone: phone,
      email: email,
      krapin: Upperkrapin,
      idno: idno,
    };

    fetch(`http://localhost:8001/clients`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(newTransaction),
    })
      .then((res) => res.json())
      .then((data) => {
        console.log(data);
        setName("");
        SetPhone("");
        setEmail("");
        setKrapin("");
        setIdno("");
        window.location.reload();
      })
      .catch((error) => {
        console.error(error);
      });
  };

  return (
    <div className="container mx-auto p-4" style={{ marginBottom: "10px", fontWeight: "bold" }}>
      <form onSubmit={handleSubmit} className="post-data">
        <label>
          Name:
          <input
            type="text"
            value={name}
            placeholder="Enter Name"
            onChange={(e) => setName(e.target.value)}
            required
          />
        </label>

        <label>
          Phone:
          <input
            type="tel"
            value={phone}
            placeholder="Enter phone number"
            onChange={(e) => SetPhone(e.target.value)}
            required
          />
        </label>

        <label>
          Email:
          <input
            type="email"
            value={email}
            placeholder="Enter email"
            onChange={(e) => setEmail(e.target.value)}
            required
          />
        </label>

        <label>
          K.R.A pin:
          <input
            type="text"
            value={krapin}
            onChange={(e) => setKrapin(e.target.value)}
            required
            placeholder="Enter K.R.A pin"
          />
        </label>

        <label>
          I.D number:
          <input
            type="text"
            value={idno}
            onChange={(e) => setIdno(e.target.value)}
            required
            placeholder="Enter I.D number"
          />
        </label>

        <label>
          Documents:
          <input
            type="file"
            
            placeholder="Enter description"
            accept="application/pdf,application/vnd.ms-excel"
            
            
          />
        </label>

        <button type="submit" 
        className="bg-green-600 hover:bg-green-500 text-white font-bold py-1 px-3 rounded"
        >Add Client</button>
      </form>
    </div>
  );
}

export default ClientPost;
