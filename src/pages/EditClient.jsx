import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

export default function EditClient() {
  const { id } = useParams(); // Get the client ID from the URL parameters
  const [client, setClient] = useState({});
  const [editedClient, setEditedClient] = useState({
    // Initialize with the existing client data or empty fields
    name: "",
    phone: "",
    email: "",
    krapin: "",
    idno: "",
  });

  useEffect(() => {
    // Fetch the specific client details based on the ID
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
        // Handle error, e.g., show an error message to the user
      }
    };

    fetchClientDetails();
  }, [id]);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setEditedClient((prevClient) => ({
      ...prevClient,
      [name]: value,
    }));
  };

  const handleSaveChanges = async () => {
    // Implement logic to update the client details on the server
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

      // Handle successful update, e.g., show a success message or navigate back to the client list
    } catch (error) {
      console.error(error);
      // Handle error, e.g., show an error message to the user
    }
  };

  return (
    <div>
      <h2>Edit Client {client.name}</h2>
      <form>
        <label>
          Name:
          <input
            type="text"
            name="name"
            value={editedClient.name}
            onChange={handleInputChange}
          />
        </label>
        <br />
        <label>
          Phone Number:
          <input
            type="text"
            name="phone"
            value={editedClient.phone}
            onChange={handleInputChange}
          />
        </label>
        <br />
        <label>
          Email:
          <input
            type="text"
            name="email"
            value={editedClient.email}
            onChange={handleInputChange}
          />
        </label>
        <br />
        <label>
          KRA PIN:
          <input
            type="text"
            name="krapin"
            value={editedClient.krapin}
            onChange={handleInputChange}
          />
        </label>
        <br />
        <label>
          ID Number:
          <input
            type="text"
            name="idno"
            value={editedClient.idno}
            onChange={handleInputChange}
          />
        </label>
        <br />
        <button type="button" onClick={handleSaveChanges}>
          Save Changes
        </button>
      </form>
    </div>
  );
}
