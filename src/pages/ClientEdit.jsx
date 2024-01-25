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
        const url = `https://insurancetestdatabase.vercel.app/clients/${id}`;
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
  
        const url = `https://insurancetestdatabase.vercel.app/clients/${id}`;
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
        const updatedResponse = await fetch(`https://insurancetestdatabase.vercel.app/clients/${id}`, {
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
          const url = `https://insurancetestdatabase.vercel.app/clients/${id}`;
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
    <h1 className="font-bold text-4xl">Edit client information</h1>
    
    <div className="flex-container">
    
      {/* CLIENT DETAILS */}


      <div className="flex-item" id="div1">
      <h2 className="font-bold text-3xl underline mb-1">Client  Information</h2>
      <ul style={{listStyle:"none"}} >

        <li className="text-xl">
          <strong>Name:</strong> {client.name}
        </li>
        <li className="text-xl">
          <strong>Phone:</strong> {client.phone}
        </li>
        <li className="text-xl">
          <strong>Email:</strong> {client.email}
        </li >
        <li className="text-xl">
          <strong>K.R.A pin:</strong> {client.krapin}
        </li>
        <li className="text-xl">
          <strong>I.D number:</strong> {client.idno}
        </li>

      </ul>
    </div>



      {/* UPDATE FORM */}
      <div className="flex-item" id="div1">    
      <form className="update-client">
        <h2 className="font-bold text-3xl underline mb-2">Update client</h2>


        <div className="flex items-center mb-1">
            <label className="mr-2 text-xl">
          Name:
          </label>
          <input
            type="text"
            className="shadow appearance-none border rounded w-full py-1 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            name="name"
            placeholder="Update name"
            autoComplete="off"
            onChange={handleInputChange}
          />
        </div>

        <div className="flex items-center mb-1">
            <label className="mr-2 text-xl">
          Phone:
          </label>
          <input
            type="text"
            className="shadow appearance-none border rounded w-full py-1 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            name="phone"
            placeholder="Update phone number"
            autoComplete="off"
            onChange={handleInputChange}
          />
        </div>

        <div className="flex items-center mb-1">
            <label className="mr-2 text-xl">
          Email:
          </label>
          <input
            type="text"
            className="shadow appearance-none border rounded w-full py-1 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            name="email"
            placeholder="Update email"
            autoComplete="off"
            onChange={handleInputChange}
          />
        </div>

        <div className="flex items-center mb-1">
            <label className="mr-2 text-xl">
          KRA_PIN:
          </label>
          <input
            type="text"
            className="shadow appearance-none border rounded w-full py-1 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            name="krapin"
            placeholder="Update KRA pin"
            autoComplete="off"
            onChange={handleInputChange}
          />
        </div>

        <div className="flex items-center mb-1">
            <label className="mr-2 text-xl">
          ID_Number:
          </label>
          <input
            type="text"
            className="shadow appearance-none border rounded w-full py-1 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            name="idno"
            placeholder="Update ID number"
            autoComplete="off"
            onChange={handleInputChange}
          />
        </div>
        <button
         type="button"
        onClick={handleSaveChanges} 
        className="bg-blue-500 hover:bg-blue-600 text-white font-bold py-1 px-3 rounded mb-2"
        >
          Save Changes
        </button>

        <button 
        type="button" 
        onClick={handleDeleteClient} 
        className="bg-red-500 hover:bg-red-600 text-white font-bold py-1 px-3 rounded"

        >
              Delete Client
            </button>

      </form>
      </div>



    </div>
    <div class="flex items-center justify-center">
        <button onClick={() => navigate(`/client`)} className="view-more-button">
          Back
        </button>
    </div>
    </>

  );
}
