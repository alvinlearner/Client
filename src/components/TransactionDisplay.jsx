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

  const calculateDaysLeft = (date, duration) => {
    const currentDate = new Date();
    const transactionDate = new Date(date);
    const endTransactionDate = new Date(transactionDate);
    endTransactionDate.setDate(endTransactionDate.getDate() + duration);
    const remainingDays = Math.ceil((endTransactionDate - currentDate) / (1000 * 60 * 60 * 24));
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
            <th>registration number</th>
            <th>policy number</th>
            <th>starting date</th>
            <th>duration</th>
            <th>description</th>
            <th>status</th>
          </tr>
        </thead>
        <tbody>
          {filteredTransactions.map((transaction) => (
            <tr key={transaction.id}>
              <td>{transaction.reg}</td>
              <td>{transaction.policyno}</td>
              <td>{transaction.date}</td>
              <td>{transaction.duration}</td>
              <td>{transaction.description}</td>
              <td style={{ color: getStatusColor(calculateDaysLeft(transaction.date, transaction.duration)) }}>
                {calculateDaysLeft(transaction.date, transaction.duration)} days left
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
