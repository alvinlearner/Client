import React, { useEffect, useState } from "react";
import { useParams, Navigate, useNavigate } from "react-router-dom";
import Swal from "sweetalert2";
import "./editclient.css";

export default function EditClient() {

  const navigate = useNavigate()

  const { id } = useParams();
  const [client, setClient] = useState({});
  const [editedClient, setEditedClient] = useState({
    name: "",
    phone: "",
    email: "",
    krapin: "",
    idno: "",
  });

  useEffect(() => {
    const fetchClientDetails = async () => {
      try {
        const url = `http://localhost:8001/clients/${id}`;
        const response = await fetch(url, {
          method: "GET",
          headers: { "content-type": "application/json" },
        });

        if (!response.ok) {
          throw new Error("Failed to fetch client details");
        }

        const data = await response.json();
        setClient(data);
        setEditedClient({
          name: data.name,
          phone: data.phone,
          email: data.email,
          krapin: data.krapin,
          idno: data.idno,
        });
      } catch (error) {
        console.error(error);
      }
    };

    fetchClientDetails();
  }, [id]);

  const handleInputChange = (e) => {
    const { name, value } = e.target;

    // If the input field is "krapin", convert the value to uppercase
    const updatedValue = name === "krapin" ? value.toUpperCase() : value;

    setEditedClient((prevClient) => ({
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
  
        const url = `http://localhost:8001/clients/${id}`;
        const response = await fetch(url, {
          method: "PUT",
          headers: { "content-type": "application/json" },
          body: JSON.stringify(editedClient),
        });
  
        if (!response.ok) {
          throw new Error("Failed to update client details");
        }
  
        // Show SweetAlert success confirmation
        await Swal.fire({
          icon: "success",
          title: "Client details updated successfully!",
          showConfirmButton: false,
          timer: 1500,
        });
  
        // Fetch updated client details immediately after saving
        const updatedResponse = await fetch(`http://localhost:8001/clients/${id}`, {
          method: "GET",
          headers: { "content-type": "application/json" },
        });
  
        if (!updatedResponse.ok) {
          throw new Error("Failed to fetch updated client details");
        }
  
        const updatedData = await updatedResponse.json();
        setClient(updatedData);
      } else {
        // User clicked "Cancel" or closed the modal
        Swal.fire('Cancelled', 'Your changes have not been saved.', 'info');
      }
    } catch (error) {
      console.error(error);
    }
  };
  

  const handleDeleteClient = () => {
    // Show SweetAlert confirmation for delete
    Swal.fire({
      title: "Are you sure?",
      text: "Once deleted, you will not be able to recover this client!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#d33",
      cancelButtonColor: "#3085d6",
      confirmButtonText: "Yes, delete it!",
    }).then(async (result) => {
      if (result.isConfirmed) {
        try {
          const url = `http://localhost:8001/clients/${id}`;
          const response = await fetch(url, {
            method: "DELETE",
            headers: { "content-type": "application/json" },
          });

          if (!response.ok) {
            throw new Error("Failed to delete client");
          }

          // Show SweetAlert confirmation for delete success
          Swal.fire({
            icon: "success",
            title: "Client deleted successfully!",
            showConfirmButton: false,
            timer: 1500,
          });

          // Navigate back to the clients page
          navigate("/client");

        } catch (error) {
          console.error(error);
        }
      }
    });
  }


  return (
    <>
    <h1>Edit client info</h1>
    
    <div className="flex-container">
    
      {/* CLIENT DETAILS */}


      <div className="flex-item" id="div1">
      <h2>Client  Information</h2>
      <ul style={{listStyle:"none"}}>
        <li>
          <strong>Name:</strong> {client.name}
        </li>
        <li>
          <strong>Email:</strong> {client.email}
        </li>
        <li>
          <strong>Phone:</strong> {client.phone}
        </li>
        <li>
          <strong>I.D number:</strong> {client.idno}
        </li>
        <li>
          <strong>K.R.A pin:</strong> {client.krapin}
        </li>
      </ul>
    </div>



      {/* UPDATE FORM */}
      <div className="flex-item" id="div1">    
      <form className="update-client">
        <h2>Update client</h2>
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
          Phone:
          <input
            type="text"
            name="phone"
            placeholder="Update phone number"
            onChange={handleInputChange}
          />
        </label>
        <br />
        <label>
          Email:
          <input
            type="text"
            name="email"
            placeholder="Update email"
            onChange={handleInputChange}
          />
        </label>
        <br />
        <label>
          KRA PIN:
          <input
            type="text"
            name="krapin"
            placeholder="Update KRA pin"
            onChange={handleInputChange}
          />
        </label>
        <br />
        <label>
          ID Number:
          <input
            type="text"
            name="idno"
            placeholder="Update ID number"
            onChange={handleInputChange}
          />
        </label>
        <br />
        <button type="button" onClick={handleSaveChanges} className="update-button">
          Save Changes
        </button>

        <button type="button" onClick={handleDeleteClient} className="delete-button">
              Delete Client
            </button>

      </form>
      </div>



    </div>
    <button onClick={() => navigate(`/client`)} className="view-more-button">Back</button>
    </>

  );
}
