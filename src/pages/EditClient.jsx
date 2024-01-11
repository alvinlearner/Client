import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import Swal from "sweetalert2";
import "./editclient.css";

export default function EditClient() {
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
      const url = `http://localhost:8001/clients/${id}`;
      const response = await fetch(url, {
        method: "PUT",
        headers: { "content-type": "application/json" },
        body: JSON.stringify(editedClient),
      });

      if (!response.ok) {
        throw new Error("Failed to update client details");
      }

      // Show SweetAlert confirmation
      Swal.fire({
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

    } catch (error) {
      console.error(error);
    }
  };

  return (
    <>

    <h2>Edit client info</h2>
    <div className="flex-container">
      
      <div className="flex-item" id="div1">    
      <form>
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
        <button type="button" onClick={handleSaveChanges}>
          Save Changes
        </button>
      </form>
      </div>

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

    </div>
    </>

  );
}
