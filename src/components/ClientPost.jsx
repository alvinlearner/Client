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

    fetch(`https://insurance-xgcq.onrender.com/clients`, {
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

        <div className="inputwrapper">
        <label >
          Name:
          </label><span/>
          <input
            type="text"
            value={name}
            placeholder="Enter Name"
            onChange={(e) => setName(e.target.value)}
            required
          />
        </div>



      <div className="inputwrapper">
        <label >
          Phone:
          </label> <span/>
          <input
            type="tel"
            value={phone}
            placeholder="Enter phone number"
            onChange={(e) => SetPhone(e.target.value)}
      //       pattern="^\+(?:[0-9] ?){6,14}[0-9]$"
      //  title="Phone number must be in the format +1234567890"
      //  oninvalid="setCustomValidity('Phone number must be in the format +1234567890')"
      //  oninput="setCustomValidity('')" 
            required
          />
      </div>

      <div className="inputwrapper">
        <label >
          Email:
          </label><span/>
          <input
            type="email"
            value={email}
            placeholder="Enter email"
            onChange={(e) => setEmail(e.target.value)}
            required
          />
     </div>


     <div className="inputwrapper">
        <label >
          K.R.A pin:
          </label>
          <span/>
          <input
            type="text"
            value={krapin}
            onChange={(e) => setKrapin(e.target.value)}
            required
            placeholder="Enter K.R.A pin"
          />
       </div>


      <div className="inputwrapper">
        <label>
          I.D number:
          </label><span/>
          <input
            type="text"
            value={idno}
            onChange={(e) => setIdno(e.target.value)}
            required
            placeholder="Enter I.D number"
          />
        
      </div>
        {/* <label>
          Documents:
          <input
            type="file"
            
            placeholder="Enter description"
            accept="application/pdf,application/vnd.ms-excel"
            
            
          />
        </label> */}

        <button type="submit" 
        className="bg-green-600 hover:bg-green-500 text-white font-bold mt-4 py-1 px-3 rounded"
        >Add Client</button>
      </form>
    </div>
  );
}

export default ClientPost;
