import React, { useEffect, useState } from "react";
import TransactionFilter from "./Transactionfilter";
import TransactionDelete from "./TransactionDelete";

export default function DisplayTransaction() {
  const [transactions, setTransactions] = useState([]);
  const [filteredTransactions, setFilteredTransactions] = useState([]);

  useEffect(() => {
    const url = `http://localhost:8001/transactions`;

    fetch(url, {
      method: "GET",
      headers: { "content-type": "application/json" },
    })
      .then((res) => {
        return res.json();
      })
      .then((data) => {
        setTransactions(data);
        setFilteredTransactions(data);
      })
      .catch((error) => {
        console.error(error);
      });
  }, []);

  const calculateDaysLeft = (start, expire) => {
    const currentDate = new Date();
    const startDate = new Date(start);
    const expireDate = new Date(expire);
    
    // Set the time to the end of the day for accurate calculation
    startDate.setHours(23, 59, 59, 999);
    expireDate.setHours(23, 59, 59, 999);

    const remainingDays = Math.floor((expireDate - currentDate) / (1000 * 60 * 60 * 24));
    return remainingDays >= 0 ? remainingDays : 0;
  };

  const getStatusColor = (remainingDays) => {
    if (remainingDays === 0) {
      return 'red';
    } else if (remainingDays <= 5) {
      return 'orange';
    } else {
      return 'green';
    }
  };

  const handleFilter = (filteredTransactions) => {
    setFilteredTransactions(filteredTransactions);
  };

  const handleDelete = (id) => {
    const url = `http://localhost:8001/transactions/${id}`;
    fetch(url, {
      method: "DELETE",
      headers: { "content-type": "application/json" },
    })
      .then(() => {
        const newTransactions = transactions.filter(
          (transaction) => transaction.id !== id
        );
        setTransactions(newTransactions);
        setFilteredTransactions(newTransactions);
      })
      .catch((error) => {
        console.error(error);
      });
  };

  return (
    <div>
      <style>
        {`
          th,
          td {
            background-color: #5b5656;
          }
        `}
      </style>
      <TransactionFilter transactions={transactions} onFilter={handleFilter} />
      <table>
        <thead>
          <tr>
            <th>Registration number</th>
            <th>Policy number</th>
            <th>Starting date</th>
            <th>Expiry</th>
            <th>Description</th>
            <th>Status</th>
          </tr>
        </thead>
        <tbody>
          {filteredTransactions.map((transaction) => (
            <tr key={transaction.id}>
              <td>{transaction.reg}</td>
              <td>{transaction.policyno}</td>
              <td>{transaction.start}</td>
              <td>{transaction.expire}</td>
              <td>{transaction.description}</td>
              <td style={{ color: getStatusColor(calculateDaysLeft(transaction.start, transaction.expire)) }}>
                {calculateDaysLeft(transaction.start, transaction.expire)} days left
              </td>

              <td>
                <TransactionDelete
                  id={transaction.id}
                  onDelete={() => handleDelete(transaction.id)}
                />
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
