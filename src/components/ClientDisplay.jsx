import React, { useEffect, useState } from "react";
import Clientfilter from "./Clientfilter";
// import { useHistory } from "react-router-dom";



import "../styles.css"; 

export default function DisplayClient() {  

  // const history = useHistory();


  const [clients, setClients] = useState([]);
  const [filteredClients, setFilteredClients] = useState([]);
  const [sortConfig, setSortConfig] = useState({ key: null, direction: "asc" });
  const [currentPage, setCurrentPage] = useState(1);
  const [rowsPerPage] = useState(7);

  useEffect(() => {
    const url = `http://localhost:8001/clients`;

    fetch(url, {
      method: "GET",
      headers: { "content-type": "application/json" },
    })
      .then((res) => res.json())
      .then((data) => {
        setClients(data);
        setFilteredClients(data);
      })
      .catch((error) => {
        console.error(error);
      });
  }, []);


  
  const handleFilter = (filteredClients) => {
    setFilteredClients(filteredClients);
  };



  const handleSort = (key) => {
    let direction = "asc";
    if (sortConfig.key === key && sortConfig.direction === "asc") {
      direction = "desc";
    }
    setSortConfig({ key, direction });
  };

  const sortedClients = () => {
    const sorted = [...filteredClients];
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

  const indexOfLastRow = currentPage * rowsPerPage;
  const indexOfFirstRow = indexOfLastRow - rowsPerPage;
  const currentRows = sortedClients().slice(indexOfFirstRow, indexOfLastRow);

  const paginate = (pageNumber) => {
    setCurrentPage(pageNumber);
  };

  return (
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
    background-color: #5950D2;
    color: white;
  }       
        `}
      </style>
      <Clientfilter clients={clients} onFilter={handleFilter} />
      <div style={{overFlowX:"auto;"}}>
      <table className="table-auto w-full">
        <thead>
          <tr>
            <th className="px-4 py-2" onClick={() => handleSort("name")}>
              NAME
            </th>
            <th className="px-4 py-2" onClick={() => handleSort("phone")}>
              PHONE NUMBER
            </th>
            <th className="px-4 py-2">
              EMAIL
            </th>
            <th className="px-4 py-2" onClick={() => handleSort("krapin")}>
              KRA PIN
            </th>
            <th className="px-4 py-2" onClick={() => handleSort("idno")}>
              ID NUMBER
            </th>
            <th className="px-4 py-2">
              Action
            </th>
          </tr>
        </thead>
        <tbody>
          {currentRows.map((clients) => (
            <tr key={clients.id} className="bg-gray-100">
              <td className="px-4 py-2">{clients.name}</td>
              <td className="px-4 py-2">{clients.phone}</td>
              <td className="px-4 py-2">{clients.email}</td>
              <td className="px-4 py-2">{clients.krapin}</td>
              <td className="px-4 py-2">{clients.idno}</td>

              <td className="px-4 py-2">

              {/* <button onClick={() => handleEdit(client.id)}>Edit</button> */}

                <button onClick={() => history.push(`/client/${clients.id}/edit`)}>
                     View more
               </button>

              </td>

  

            </tr>
          ))}
        </tbody>
      </table>
      </div>
      <div className="flex justify-center mt-4">
        <button
          className={`mr-2 ${currentPage === 1 && 'opacity-50 cursor-not-allowed'}`}
          onClick={() => paginate(currentPage - 1)}
          disabled={currentPage === 1}
        >
          Previous
        </button>
        <button
          className={`ml-2 ${indexOfLastRow >= sortedClients().length && 'opacity-50 cursor-not-allowed'}`}
          onClick={() => paginate(currentPage + 1)}
          disabled={indexOfLastRow >= sortedClients().length}
        >
          Next
        </button>
      </div>
    </div>
  );
  
}
