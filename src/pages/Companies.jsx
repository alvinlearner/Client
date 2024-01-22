import React, { useState } from "react";
// import "../components/ClientPost.css";


function Companies() {
  const [company, setCompany] = useState("");
  const [email, setEmail] = useState("");
  const [phone, SetPhone] = useState("");
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

    fetch(`http://localhost:8001/insurance_companies`, {
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
            <div className="flex items-center justify-center">
                <h2 className="font-bold text-3xl">Insurance Companies</h2>
            </div>
      <form onSubmit={handleSubmit} className="post-data">
      <div className="flex items-center py-1">
            <label className="mr-2">
          Company:
          </label>
          <input
            type="text"
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            value={name}
            placeholder="Enter Name"
            onChange={(e) => setName(e.target.value)}
            required
          />
        </div>

        <div className="flex items-center py-1">
            <label className="mr-2">
          Phone:
          </label>
          <input
            type="tel"
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            value={phone}
            placeholder="Enter phone number"
            onChange={(e) => SetPhone(e.target.value)}
            required
          />
        </div>

        <div className="flex items-center py-1">
            <label className="mr-2">
          Email:
          </label>
          <input
            type="email"
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            value={email}
            placeholder="Enter email"
            onChange={(e) => setEmail(e.target.value)}
            required
          />
        </div>

        <div className="flex items-center py-1">
            <label className="mr-2">
          Rate_(%):
          </label>
          <input
            type="number"
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            value={krapin}
            onChange={(e) => setKrapin(e.target.value)}
            required
            placeholder="Enter rate(%)"
          />
        </div>

            <div className="flex items-center py-1">
            <label className="mr-2">
          Excess_Protector:
          </label>
          <input
            type="number"
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            value={krapin}
            onChange={(e) => setKrapin(e.target.value)}
            required
            placeholder="Enter Excess Protector(%)"
          />
        </div>

        <div className="flex items-center py-1">
            <label className="mr-2">
          P.V.T:
          </label>
          <input
            type="text"
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            value={krapin}
            onChange={(e) => setKrapin(e.target.value)}
            required
            placeholder="Enter P.V.T"
          />
        </div>

        <div className="flex items-center py-1">
            <label className="mr-2">
          Loss_Of_Use:
          </label>
          <input
            type="text"
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            value={krapin}
            onChange={(e) => setKrapin(e.target.value)}
            required
            placeholder="Enter Loss Of Use"
          />
        </div>

        <div className="flex items-center py-1">
            <label className="mr-2">
          P.C.F:
          </label>
          <input
            type="text"
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            value={krapin}
            onChange={(e) => setKrapin(e.target.value)}
            required
            placeholder="Enter P.C.F"
          />
        </div>


        <div className="flex items-center py-1">
            <label className="mr-2">
          I.T.L:
          </label>
          <input
            type="text"
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            value={krapin}
            onChange={(e) => setKrapin(e.target.value)}
            required
            placeholder="Enter I.T.L"
          />
        </div>




        <div className="flex items-center py-1">
            <label className="mr-2">
          Stamp Duty:
          </label>
          <input
            type="text"
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            value={idno}
            onChange={(e) => setIdno(e.target.value)}
            required
            placeholder="Enter Stamp duty"
          />
        </div>



        <button type="submit" 
        className="bg-green-600 hover:bg-green-500 text-white font-bold py-1 px-3 rounded"
        >Add Client</button>
      </form>
    </div>
  );




}  

export default Companies;




