import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import Motornav from "../../components/Motornav";

import "../../components/ClientPost.css";
// import '../style.css'

function Companies() {

  const navigate = useNavigate();

  const [companies, setCompanies] = useState([]);  
  const [company, setCompany] = useState("");
  const [rate, setRate] = useState();
  const [excessprotector, setExcessprotector] = useState();
  const [pvt, setPvt] = useState();
  const [lossofuse, setLossofuse] = useState();
  const [pcf, setPcf] = useState();
  const [itl, setItl] = useState();
  const [stampduty, setStampduty] = useState();  

  const url = "https://insurance-xgcq.onrender.com/companies"
  // const url = '""https://insurance-xgcq.onrender.com/insurance_companies""'


  useEffect(() => {
    fetchCompaniesData();
  }, []);

  const fetchCompaniesData = () => {
    fetch(url)
      .then((res) => res.json())
      .then((data) => {
        setCompanies(data);
      })

      .catch((error) => {
        console.error(error);
      });
  };


  const handleSubmit = (e) => {
    e.preventDefault();


    const rateValue = parseFloat(rate, 10);
    const excessprotectorValue = parseFloat(excessprotector, 10);
    const pvtValue = parseFloat(pvt, 10);
    const lossofuseValue = parseFloat(lossofuse, 10);
    const pcfValue = parseFloat(pcf, 10);
    const itlValue = parseFloat(itl, 10);
    const stampdutyValue = parseFloat(stampduty, 10);


    const newTransaction = {
        organization: company,
        rate: rateValue,
        excessprotector: excessprotectorValue,
        pvt: pvtValue,
        lossofuse: lossofuseValue,
        pcf: pcfValue,
        itl: itlValue,
        stampduty: stampdutyValue,
      };


    fetch(url, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(newTransaction),
    })
      .then((res) => res.json())
      .then((data) => {
        console.log(data);
        setCompany("");
        setRate("");
        setExcessprotector(""),
        setPvt(""),
        setPcf(""),
        setLossofuse(""),
        setItl(""),
        setStampduty("")
        fetchCompaniesData();
        // window.location.reload();
      })
      .catch((error) => {
        console.error(error);
      });
  };

  return (
    
    <div className="container mx-auto p-4" style={{ marginBottom: "10px", fontWeight: "bold" }}>
            <Motornav/>
            <div className="flex items-center justify-center">
              
                <h2 className="font-bold text-3xl">Insurance Companies</h2>
            </div>



    {/* POST INSURANCE COMPANY */}

      <form onSubmit={handleSubmit} className="post-data">

      <div className="inputwrapper">
            <label className="mr-2 ">
          Company:
          </label>
          <input
            type="text"
            className=" pl-0 shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            value={company}
            placeholder="Enter Insurance company"
            onChange={(e) => setCompany(e.target.value)}
            required
          />
        </div>

        <div className="inputwrapper">
            <label className="mr-2">
          Rate(%):
          </label><span/>
          <input
            type="number"
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            value={rate}
            onChange={(e) => setRate(e.target.value)}
            required
            placeholder="Enter rate(%)"
          />
        </div>

            <div className="inputwrapper">
            <label className="mr-2">
          Excess_Protector(%):
          </label>
          <input
            type="number"
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            value={excessprotector}
            onChange={(e) => setExcessprotector(e.target.value)}
            required
            placeholder="Enter Excess Protector(%)"
          />
        </div>

        <div className="inputwrapper">
            <label className="mr-2">
          P.V.T(%):
          </label>
          <input
            type="text"
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            value={pvt}
            onChange={(e) => setPvt(e.target.value)}
            required
            placeholder="Enter P.V.T(%)"
          />
        </div>

        <div className="inputwrapper">
            <label className="mr-2">
          Loss_Of_Use:
          </label>
          <input
            type="text"
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            value={lossofuse}
            onChange={(e) => setLossofuse(e.target.value)}
            required
            placeholder="Enter Loss Of Use"
          />
        </div>

        <div className="inputwrapper">
            <label className="mr-2">
          P.C.F(%):
          </label>
          <input
            type="text"
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            value={pcf}
            onChange={(e) => setPcf(e.target.value)}
            required
            placeholder="Enter P.C.F(%)"
          />
        </div>


        <div className="inputwrapper">
            <label className="mr-2">
          I.T.L(%):
          </label>
          <input
            type="text"
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            value={itl}
            onChange={(e) => setItl(e.target.value)}
            required
            placeholder="Enter I.T.L(%)"
          />
        </div>




        <div className="inputwrapper">
            <label className="mr-2">
          Stamp Duty:
          </label>
          <input
            type="text"
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            value={stampduty}
            onChange={(e) => setStampduty(e.target.value)}
            required
            placeholder="Enter Stamp duty"
          />
        </div>



        <button type="submit" 
        className="bg-green-600 hover:bg-green-500 text-white font-bold mt-3 py-1 px-3 rounded"
        >Add Insurance company</button>
      </form>


         {/* Displaying companies data in a table */}

         <style>
        {`

table {
    border-collapse: collapse;
  }
  
  th, td {
    padding: 8px;
    text-align: left;
    border-bottom: 1px solid #ddd;
    
  }
  
  tr:nth-child(even) {
    background-color: #CACEC7;
  }
  
  th {
    background-color: #00818D;
    color: white;
  }       
        `}
      </style>

      <div className="container mx-auto p-4">
        <h3 className="font-bold text-xl mb-2">Insurance Companies List</h3>
        <div style={{ maxWidth: '100%', overflowX: 'auto' }}>
        <table className="min-w-full bg-white border border-gray-300">
          <thead>
            <tr>
              <th className="border border-gray-300 px-4 py-2">Company</th>
              <th className="border border-gray-300 px-4 py-2">Rate (%)</th>
              <th className="border border-gray-300 px-4 py-2">Excess Protector (%)</th>
              <th className="border border-gray-300 px-4 py-2">P.V.T (%)</th>
              <th className="border border-gray-300 px-4 py-2">Loss Of Use </th>
              <th className="border border-gray-300 px-4 py-2">P.C.F (%)</th>
              <th className="border border-gray-300 px-4 py-2">I.T.L (%)</th>
              <th className="border border-gray-300 px-4 py-2">Stamp Duty</th>
              <th className="border border-gray-300 px-4 py-2">Action</th>
            </tr>
          </thead>
          <tbody>
            {companies.map((company) => (
              <tr key={company.id}>
                <td className="border border-gray-300 px-4 py-2">{company.organization}</td>
                <td className="border border-gray-300 px-4 py-2">{company.rate}%</td>
                <td className="border border-gray-300 px-4 py-2">{company.excessprotector}%</td>
                <td className="border border-gray-300 px-4 py-2">{company.pvt}%</td>
                <td className="border border-gray-300 px-4 py-2">{company.lossofuse}</td>
                <td className="border border-gray-300 px-4 py-2">{company.pcf}%</td>
                <td className="border border-gray-300 px-4 py-2">{company.itl}%</td>
                <td className="border border-gray-300 px-4 py-2">{company.stampduty}</td>
                <td className="border border-gray-300 px-4 py-2"><button onClick={() => navigate(`/companies/${company.id}`)} className="view-more-button">View more</button></td>
              </tr>
            ))}
          </tbody>
        </table>
        </div>


        </div>
    </div>
  );




}  

export default Companies;




