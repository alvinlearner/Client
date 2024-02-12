import React, { useState, useEffect } from 'react';
import "../../styles.css"; 

const MedicalTable = () => {
  const [transactions, setTransactions] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch('http://localhost:3000/transactions');
        const data = await response.json();
        // Sorting transactions based on the "start" date in ascending order
        const sortedTransactions = data.sort((a, b) => new Date(a.start) - new Date(b.start));
        setTransactions(sortedTransactions);
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };

    fetchData();
  }, []);

  return (
    <>
    <div>
      <h2>Transaction Details</h2>
      <div className="container mx-auto p-4">
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
  background-color: #04AA6D;
  color: white;
}

        `}
      </style>
      <table>
        <thead>
          <tr>
            <th>ID</th>
            <th>Policy No</th>
            <th>Registration</th>
            <th>Proposed</th>
            <th>Start Date</th>
            <th>Expiration Date</th>
            <th>Classification</th>
            <th>Client Name</th>
            <th>Client Phone</th>
            <th>Client Email</th>
            <th>Insurance name</th>
            <th>Insurance rate</th>
            {/* Add more columns as needed */}
          </tr>
        </thead>
        <tbody>
          {transactions.map((transaction) => (
            <tr key={transaction.id}>
              <td>{transaction.id}</td>
              <td>{transaction.policyno}</td>
              <td>{transaction.reg}</td>
              <td>{transaction.proposed}</td>
              <td>{transaction.start}</td>
              <td>{transaction.expire}</td>
              <td>{transaction.classification}</td>
              <td>{transaction.client.name}</td>
              <td>{transaction.client.phone}</td>
              <td>{transaction.client.email}</td>

              <td>{transaction.company.organization}</td>
              <td>{transaction.company.rate}</td>
              {/* Add more cells as needed */}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
    </div>
    </>
  );
};

export default MedicalTable;
