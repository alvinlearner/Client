import React, { useState } from "react";

function AddTransaction() {
  const [reg, setReg] = useState("");
  const [policyno, Setpolicyno] = useState("");
  const [date, setDate] = useState("");
  const [duration, setDuration] = useState("");
  const [description, setDescription] = useState("");


  const handleSubmit = (e) => {
    e.preventDefault();

    const newTransaction = {
      date: date,
      reg: reg,
      description: description,
      duration: duration,
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
        setDate("");
        setReg("");
        setDescription("");
        Setpolicyno("");
        setDuration("");
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
          Date:
          <input
            type="date"
            value={date}
            onChange={(e) => setDate(e.target.value)}
            required
          />
        </label>
            
        <label>
          Duration:
          <input
            type="text"
            value={duration}
            placeholder="Enter duration"
            onChange={(e) => setDuration(e.target.value)}
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
