import React, { useState } from "react";

function AddTransaction() {
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
      .then((res) => {
       res.json()
      })
      .then((data) => {
        console.log(data);
        setStart("");
        setExpire("")
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
    <div style={{marginBottom:"10px"}}>
      <form onSubmit={handleSubmit}>

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
          Expirey date:
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
    
                <button type="submit">Add Slot</button>
      </form>
    </div>
  );
}

export default AddTransaction;
