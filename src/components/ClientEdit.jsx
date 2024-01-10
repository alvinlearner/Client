import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";

const EditClient = () => {
  const { id } = useParams();
  const [client, setClient] = useState({});
  const [formData, setFormData] = useState({
    name: "",
    phone: "",
    email: "",
    krapin: "",
    idno: "",
    // Add other fields as needed
  });

  useEffect(() => {
    // Fetch client data based on the provided id
    const url = `http://localhost:8001/clients/${id}`;

    fetch(url, {
      method: "GET",
      headers: { "content-type": "application/json" },
    })
      .then((res) => res.json())
      .then((data) => {
        setClient(data);
        // Set form data with the fetched client data
        setFormData({
          name: data.name,
          phone: data.phone,
          email: data.email,
          krapin: data.krapin,
          idno: data.idno,
          // Set other fields as needed
        });
      })
      .catch((error) => {
        console.error(error);
      });
  }, [id]);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // Implement logic to update client data on the server
    // You can use the same endpoint with a PUT request
    // Example:
    const updateUrl = `http://localhost:8001/clients/${id}`;
    fetch(updateUrl, {
      method: "PUT",
      headers: { "content-type": "application/json" },
      body: JSON.stringify(formData),
    })
      .then((res) => res.json())
      .then((data) => {
        alert(`Data updated successfully:${data}`)
      })
      .catch((error) => {
        console.error(error);
      });
  };

  return (
    <div>
      <h2>Edit Client</h2>
      <form onSubmit={handleSubmit}>
        {/* Add form fields for editing client data */}
        <label>Name:</label>
        <input
          type="text"
          name="name"
          value={formData.name}
          onChange={handleInputChange}
        />
        {/* Add other form fields as needed */}
        <button type="submit">Update</button>
      </form>
    </div>
  );
};

export default EditClient;
