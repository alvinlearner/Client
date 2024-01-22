import React, { useEffect, useState } from "react";
import { useParams, Navigate, useNavigate } from "react-router-dom";
import Swal from "sweetalert2";
import "./editclient.css";

export default function EditTransaction() {

  const navigate = useNavigate()
  const [clientDetails, setClientDetails] = useState({});


  const { id } = useParams();
  const [transaction, setTransaction] = useState({});
  const [editedTransaction, setEditedTransaction] = useState({
    client_id: "",
    policyno: "",
    reg: "",
    start: "",
    expire: "",
    classification: "",
    premium:"",
  });

  useEffect(() => {
    const fetchClientDetails = async () => {
      try {
        // Fetch transaction details
        const transactionUrl = `http://localhost:8001/transactions/${id}`;
        const transactionResponse = await fetch(transactionUrl, {
          method: "GET",
          headers: { "content-type": "application/json" },
        });
  
        if (!transactionResponse.ok) {
          throw new Error("Failed to fetch transaction details");
        }
  
        const transactionData = await transactionResponse.json();
        setTransaction(transactionData);
        setEditedTransaction({
          client_id: transactionData.client_id,
          policyno: transactionData.policyno,
          reg: transactionData.reg,
          premium: transaction.premium,
          start: transactionData.start,
          expire: transactionData.expire,
          classification: transactionData.classification,
        });
  
        // Fetch client details
        const clientUrl = `http://localhost:8001/clients/${transactionData.client_id}`;
        const clientResponse = await fetch(clientUrl, {
          method: "GET",
          headers: { "content-type": "application/json" },
        });
  
        if (!clientResponse.ok) {
          throw new Error("Failed to fetch client details");
        }
  
        const clientData = await clientResponse.json();
        setClientDetails(clientData);
      } catch (error) {
        console.error(error);
      }
    };
  
    fetchClientDetails();
  }, [id]);
  

  const handleInputChange = (e) => {
    const { name, value } = e.target;

    // If the input field is "policy", convert the value to uppercase
    const updatedValue = name === "policyno" ? value.toUpperCase() : value;

    setEditedTransaction((prevClient) => ({
      ...prevClient,
      [name]: updatedValue,
    }));
  };


  const handleSaveChanges = async () => {
    try {
      const result = await Swal.fire({
        title: 'Confirm Update',
        text: 'Are you sure you want to save changes?',
        icon: 'question',
        showCancelButton: true,
        confirmButtonText: 'Yes, save it!',
        cancelButtonText: 'Cancel',
      });
  
      if (result.isConfirmed) {
        // User clicked "Yes, save it!" button
  
        const url = `http://localhost:8001/transactions/${id}`;
        const response = await fetch(url, {
          method: "PUT",
          headers: { "content-type": "application/json" },
          body: JSON.stringify(editedTransaction),
        });
  
        if (!response.ok) {
          throw new Error("Failed to update transaction details");
        }
  
        // Show SweetAlert success confirmation
        await Swal.fire({
          icon: "success",
          title: "Client details updated successfully!",
          showConfirmButton: false,
          timer: 1500,
        });
  
        // Fetch updated transaction details immediately after saving
        const updatedResponse = await fetch(`http://localhost:8001/transactions/${id}`, {
          method: "GET",
          headers: { "content-type": "application/json" },
        });
  
        if (!updatedResponse.ok) {
          throw new Error("Failed to fetch updated transaction details");
        }
  
        const updatedData = await updatedResponse.json();
        setTransaction(updatedData);
      } else {
        // User clicked "Cancel" or closed the modal
        Swal.fire('Cancelled', 'Your changes have not been saved.', 'info');
      }
    } catch (error) {
      console.error(error);
    }
  };
  

  const handleDeleteTransaction = () => {
    // Show SweetAlert confirmation for delete
    Swal.fire({
      title: "Are you sure?",
      text: "Once deleted, you will not be able to recover this Policy!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#d33",
      cancelButtonColor: "#3085d6",
      confirmButtonText: "Yes, delete it!",
    }).then(async (result) => {
      if (result.isConfirmed) {
        try {
          const url = `http://localhost:8001/transactions/${id}`;
          const response = await fetch(url, {
            method: "DELETE",
            headers: { "content-type": "application/json" },
          });

          if (!response.ok) {
            throw new Error("Failed to delete transaction");
          }

          // Show SweetAlert confirmation for delete success
          Swal.fire({
            icon: "success",
            title: "Policy deleted successfully!",
            showConfirmButton: false,
            timer: 1500,
          });

          // Navigate back to the transactions page
          navigate("/motor");

        } catch (error) {
          console.error(error);
        }
      }
    });
  }



  const calculateDaysLeft = (start, expire) => {
    const currentDate = new Date();
    const startDate = new Date(start);
    const expireDate = new Date(expire);

    startDate.setHours(23, 59, 59, 999);
    expireDate.setHours(23, 59, 59, 999);

    const remainingDays = Math.floor((expireDate - currentDate) / (1000 * 60 * 60 * 24));
    return remainingDays >= 0 ? remainingDays : 0;
  };

 

  return (
    <>
    <h1 className="font-bold text-2xl">Edit transaction info</h1>
    
    <div className="flex-container">
    
      {/* CLIENT DETAILS */}


      <div className="flex-item" id="div1">
      <h2 className="font-bold text-2xl underline py-2">Policy  Information</h2>
      <ul style={{listStyle:"none"}}>
  
      <li>
      <strong>Name:</strong> {clientDetails.name} {/* Updated line */}
      </li>

        <li>
          <strong>Policy:</strong> {transaction.policyno}
        </li>
        <li>
          <strong>Registration:</strong> {transaction.reg}
        </li>
        <li>
          <strong>Classification:</strong> {transaction.classification}
        </li>
        <li>
          <strong>Premium:</strong> {transaction.premium}
        </li>
        <li>
          <strong>Start Date:</strong> {transaction.start}
        </li>
        <li>
          <strong>Expire Date:</strong> {transaction.expire}
        </li>

        <li><strong>Days left: </strong> <em style={{ color: calculateDaysLeft(transaction.start, transaction.expire) > 0 ? 'black' : 'red'}}>{calculateDaysLeft(transaction.start, transaction.expire)}</em> days left</li>

      </ul>
    </div>

      {/* Insurance company cost breakdown */}

      <div className="flex-item" id="div1">
      <h2 className="font-bold text-2xl underline mb-2">Premium breakdown</h2>
        </div>



      {/* UPDATE FORM */}
      <div className="flex-item" id="div1">    
      <form className="update-transaction">
        <h2 className="font-bold text-2xl underline mb-2">Update Policy</h2>

        <div className="flex items-center mb-1">
            <label className="mr-2">
              Policy:
            </label>
            <input
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              type="text"
              name="policy"
              placeholder="Update policy number"
              onChange={handleInputChange}
            />
        </div>

        <div className="flex items-center py-1">
            <label className="mr-2">
          Registration:
          </label>
          <input
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            type="text"
            name="registration"
            placeholder="Update registration"
            onChange={handleInputChange}
          />
        </div>
        

        <div className="flex items-center py-1">
            <label className="mr-2">
				    Classification:
              </label>
            <select
              value={editedTransaction.classification}
              className="appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              onChange={(e) =>
                setEditedTransaction({
                  ...editedTransaction,
                  classification: e.target.value,
                })
              }
              required
            >
              <option value="" disabled>
                Select Classification
              </option>
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
              <option value="T.P.O Trailer">T.P.O Trailer</option>
              </optgroup>  
            </select>            
        </div>

        <div className="flex items-center mb-1">
            <label className="mr-2">
              Premium:
            </label>
            <input
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              type="number"
              name="premium"
              placeholder="Update premium amount"
              onChange={handleInputChange}
            />
        </div>

        <div className="flex items-center py-1">
            <label className="mr-2">    
        Start_Date:
          </label>
          <input
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            type="date"
            name="start"
            onChange={handleInputChange}
          />
        </div>

        <div className="flex items-center py-1">
            <label className="mr-2">
          Expire:
          </label>
          <input
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            type="date"
            name="expire"
            onChange={handleInputChange}
          />
        </div>
        
        <button type="button"
        onClick={handleSaveChanges}
        className="bg-blue-500 hover:bg-blue-600 text-white font-bold py-1 px-3 rounded mt-2 mb-3"
        
        >
          Save Changes
        </button>

        <button
            type="button"
            onClick={handleDeleteTransaction}
            className="bg-red-500 hover:bg-red-600 text-white font-bold py-1 px-3 rounded"
            >
              Delete Policy
        </button>

      </form>
      </div>



    </div>
    <div className="flex items-center justify-center">
        <button onClick={() => navigate(`/motor`)} className="view-more-button">
          Back
        </button>
    </div>

    </>

  );
}
