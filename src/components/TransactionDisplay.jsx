// DisplayTransaction.jsx
import React, { useEffect, useState } from "react";
import TransactionFilter from "./Transactionfilter";
import TransactionDelete from "./TransactionDelete";
// import "../styles.css"; // Import the Tailwind CSS file

export default function DisplayTransaction() {
  const [transactions, setTransactions] = useState([]);
  const [filteredTransactions, setFilteredTransactions] = useState([]);
  const [sortConfig, setSortConfig] = useState({ key: null, direction: "asc" });

  useEffect(() => {
    const url = `http://localhost:8001/transactions`;

    fetch(url, {
      method: "GET",
      headers: { "content-type": "application/json" },
    })
      .then((res) => res.json())
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

    startDate.setHours(23, 59, 59, 999);
    expireDate.setHours(23, 59, 59, 999);

    const remainingDays = Math.floor((expireDate - currentDate) / (1000 * 60 * 60 * 24));
    return remainingDays >= 0 ? remainingDays : 0;
  };

  const getStatusColor = (remainingDays) => {
    if (remainingDays === 0) {
      return 'red';
    } else if (remainingDays <= 7) {
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

  const handleSort = (key) => {
    let direction = "asc";
    if (sortConfig.key === key && sortConfig.direction === "asc") {
      direction = "desc";
    }
    setSortConfig({ key, direction });
  };

  const sortedTransactions = () => {
    const sorted = [...filteredTransactions];
    if (sortConfig.key) {
      sorted.sort((a, b) => {
        const aValue = keyExtractor(a, sortConfig.key);
        const bValue = keyExtractor(b, sortConfig.key);
        return directionMultiplier(sortConfig.direction) * compareValues(aValue, bValue);
      });
    }
    return sorted;
  };

  const keyExtractor = (item, key) => {
    if (key === "daysLeft") {
      return calculateDaysLeft(item.start, item.expire);
    } else {
      return item[key];
    }
  };

  const compareValues = (a, b) => {
    if (a < b) {
      return -1;
    }
    if (a > b) {
      return 1;
    }
    return 0;
  };

  const directionMultiplier = (direction) => {
    return direction === "asc" ? 1 : -1;
  };

  return (
    <div className="container mx-auto p-4">
      <style>
        {`
          th,
          td {
            background-color: #0E2863;
          }
        `}
      </style>
      <TransactionFilter transactions={transactions} onFilter={handleFilter} />
      <table className="table-auto w-full">
        <thead>
          <tr>
            <th className="px-4 py-2" onClick={() => handleSort("description")}>
              Description
            </th>
            <th className="px-4 py-2" onClick={() => handleSort("reg")}>
              Registration number
            </th>
            <th className="px-4 py-2" onClick={() => handleSort("policyno")}>
              Policy number
            </th>
            <th className="px-4 py-2" onClick={() => handleSort("start")}>
              Starting date
            </th>
            <th className="px-4 py-2" onClick={() => handleSort("expire")}>
              Expiry
            </th>
            <th className="px-4 py-2" onClick={() => handleSort("daysLeft")}>
              Status
            </th>
            <th className="px-4 py-2">Actions</th>
          </tr>
        </thead>
        <tbody>
          {sortedTransactions().map((transaction) => (
            <tr key={transaction.id} className="bg-gray-100">
              <td className="px-4 py-2">{transaction.description}</td>
              <td className="px-4 py-2">{transaction.reg}</td>
              <td className="px-4 py-2">{transaction.policyno}</td>
              <td className="px-4 py-2">{transaction.start}</td>
              <td className="px-4 py-2">{transaction.expire}</td>
              <td
                className={`px-4 py-2 text-${getStatusColor(
                  calculateDaysLeft(transaction.start, transaction.expire)
                )}`}
              >
                {calculateDaysLeft(transaction.start, transaction.expire)} days left
              </td>
              <td className="px-4 py-2">
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
