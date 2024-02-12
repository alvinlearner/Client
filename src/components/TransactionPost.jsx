import React, { useState, useEffect } from "react";
import Swal from 'sweetalert2';
import "./ClientPost.css";
import Select from 'react-select';

function AddTransaction() {
  const [reg, setReg] = useState("");
  const [policyno, setPolicyno] = useState("");
  const [start, setStart] = useState("");
  const [expire, setExpire] = useState("");
  const [classification, setClassification] = useState(""); // Updated state for classification
  const [clientId, setClientId] = useState(null);
  const [companyId, setCompanyId] = useState(null);
  
  const [companies, setCompanies] = useState([]);
  const [proposed, setProposed] = useState();
  const [clients, setClients] = useState([]);


      // CLIENT IDS

  useEffect(() => {
    fetch("https://insurance-xgcq.onrender.com/clients")
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

        // COMPANY IDS


        useEffect(() => {
          fetch("https://insurance-xgcq.onrender.com/companies")
            .then((response) => {
              if (!response.ok) {
                throw new Error(`HTTP error! Status: ${response.status}`);
              }
              return response.json();
            })
            .then((data) => {
              setCompanies(data); // Corrected: setCompanies instead of setCompanyId
            })
            .catch((error) => {
              console.error("Error fetching companies:", error);
            });
        }, []);


        // HANDLE ADDING 365 DAYS TO EXPIRE DATE

        const handleStartDateChange = (e) => {
          const selectedStartDate = e.target.value;
          setStart(selectedStartDate);
      
          // Calculate expiry date by adding 365 days to the selected start date
          const expiryDate = new Date(selectedStartDate);
          expiryDate.setDate(expiryDate.getDate() + 364);
      
          // Format the expiry date as 'YYYY-MM-DD'
          const formattedExpiryDate = expiryDate.toISOString().split('T')[0];
          setExpire(formattedExpiryDate);
        };

  const handleSubmit = (e) => {
    e.preventDefault();
  
    const proposedValue = parseFloat(proposed, 10);
  
    const newTransaction = {
      start: start,
      expire: expire,
      reg: reg.toUpperCase(),
      classification: classification,
      proposed: proposedValue,
      policyno: policyno.toUpperCase(),
      client_id: clientId,
      company_id: companyId,
    };
  
    fetch("https://insurance-xgcq.onrender.com/transactions", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(newTransaction),
    })
      .then((res) => {
        if (!res.ok) {
          throw new Error(`HTTP error! Status: ${res.status}`);
        }
        return res.json();
      })
      .then((data) => {
        console.log(data);
        setStart("");
        setExpire("");
        setReg("");
        setClassification("");
        setPolicyno("");
        setClientId("");
        setProposed(0);
  
        // Use SweetAlert for success feedback
        Swal.fire({
          icon: 'success',
          title: 'Success',
          text: 'Policy added successfully!',
        });
  
        window.location.reload();
      })
      .catch((error) => {
        console.error(error);
  
        // Use SweetAlert for error feedback
        Swal.fire({
          icon: 'error',
          title: 'Error',
          text: 'Failed to add policy. Please try again.',
        });
      });
  };
  

  return (
    <>
      <div className="container mx-auto p-4" style={{ marginBottom: "10px", fontWeight: "bold" }}>
        <form onSubmit={handleSubmit} className="post-data">
        
      {/* CLIENT AND INSURANCE AUTO COMPLETE SELECT */}


    <div >

        <label >
            Select Client:
            <Select
            className="w-60"
              defaultValue={null}
              onChange={(selectedOption) => setClientId(selectedOption ? selectedOption.value : null)}
              options={clients.map((client) => ({ value: client.id, label: client.name }))}
              isSearchable
              placeholder="Select Client"
            />

          </label>

     

          <label >
            Select Company:
            <Select
              defaultValue={null}
              onChange={(selectedOption) => setCompanyId(selectedOption ? selectedOption.value : null)}
              options={companies.map((company) => ({ value: company.id, label: company.organization }))}
              isSearchable
              placeholder="Select Company"
              className="w-60"
            />

          </label>


    </div>

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
              onChange={(e) => setPolicyno(e.target.value)}
              required
            />
          </label>

          <label>
            Proposed value:
            <input
              placeholder="Enter proposed value amount"
              type="number"
              value={proposed}
              onChange={(e) => setProposed(e.target.value)}
              required
            />
          </label>

          <label>
            Starting date:
            <input
              type="date"
              value={start}
              onChange={handleStartDateChange}
              required
            />
          </label>

          <label>
            Expiry date:
            <input
              type="date"
              value={expire}
              onChange={() => {}}
              readOnly
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
