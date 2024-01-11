import React, { useEffect, useState } from "react";
import { useParams, Navigate, useNavigate } from "react-router-dom";
import Swal from "sweetalert2";
import "./editclient.css";

export default function EditTransaction() {

  const navigate = useNavigate()

  const { id } = useParams();
  const [transaction, setTransaction] = useState({});
  const [editedTransaction, setEditedTransaction] = useState({
    client_id: "",
    policyno: "",
    reg: "",
    start: "",
    expire: "",
    description: "",
  });

  useEffect(() => {
    const fetchClientDetails = async () => {
      try {
        const url = `http://localhost:8001/transactions/${id}`;
        const response = await fetch(url, {
          method: "GET",
          headers: { "content-type": "application/json" },
        });

        if (!response.ok) {
          throw new Error("Failed to fetch transaction details");
        }

        const data = await response.json();
        setTransaction(data);
        setEditedTransaction({
          client_id: data.client_id,
          policyno: data.policyno,
          reg: data.reg,
          start: data.start,
          expire: data.expire,
          description:data.description,
        });
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
          navigate("/");

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

  const getStatusColor = (remainingDays) => {
    if (remainingDays === 0) {
      return 'red';
    } else if (remainingDays <= 7) {
      return 'orange';
    } else {
      return 'green';
    }
  };

  return (
    <>
    <h1>Edit transaction info</h1>
    
    <div className="flex-container">
    
      {/* CLIENT DETAILS */}


      <div className="flex-item" id="div1">
      <h2>Policy  Information</h2>
      <ul style={{listStyle:"none"}}>
        <li>
          <strong>Name:</strong> {transaction.client_id}
        </li>
        <li>
          <strong>Policy:</strong> {transaction.policyno}
        </li>
        <li>
          <strong>Registration:</strong> {transaction.reg}
        </li>
        <li>
          <strong>Description:</strong> {transaction.description}
        </li>
        <li>
          <strong>Start Date:</strong> {transaction.start}
        </li>
        <li>
          <strong>Expire Date:</strong> {transaction.expire}
        </li>

        <li
             className={`px-4 py-2 text-${getStatusColor(calculateDaysLeft(transaction.start, transaction.expire) )}`}><strong>Days left: </strong>
                              {calculateDaysLeft(transaction.start, transaction.expire)} days left
        </li>

      </ul>
    </div>



      {/* UPDATE FORM */}
      <div className="flex-item" id="div1">    
      <form className="update-transaction">
        <h2>Update Policy</h2>
        <label>
          Name:
          <input
            type="text"
            name="name"
            placeholder="Update name"
            onChange={handleInputChange}
          />
        </label>
        <br />
        <label>
          Policy:
          <input
            type="text"
            name="policy"
            placeholder="Update policy number"
            onChange={handleInputChange}
          />
        </label>
        <br />
        <label>
          Registration:
          <input
            type="text"
            name="registration"
            placeholder="Update registration"
            onChange={handleInputChange}
          />
        </label>
        
        <label>
          <p>Description:</p>
          </label>
          <textarea
            type="text"
            name="description"
            placeholder="Update description"
            onChange={handleInputChange}
            style={{height:"60PX"}}
          />

        <br/>
        <label>
          Start Date
          <input
            type="date"
            name="start"
            onChange={handleInputChange}
          />
        </label>
        <br />
        <label>
          Expire:
          <input
            type="date"
            name="expire"
            onChange={handleInputChange}
          />
        </label>
        <br />
        <button type="button" onClick={handleSaveChanges} className="update-button">
          Save Changes
        </button>

        <button type="button" onClick={handleDeleteTransaction} className="delete-button">
              Delete Client
            </button>

      </form>
      </div>



    </div>
    <button onClick={() => navigate(`/`)} className="view-more-button">Back</button>
    </>

  );
}
