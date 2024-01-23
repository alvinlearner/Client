import React, { useEffect, useState } from "react";
import { useParams, Navigate, useNavigate } from "react-router-dom";
import Swal from "sweetalert2";
import "./editclient.css";

export default function EditCompany() {

  const navigate = useNavigate()

  const { id } = useParams();
  const [company, setCompany] = useState({});
  const [editedCompany, setEditedCompany] = useState({
    company: "",
    phone: "",
    email: "",
    rate: "",
    excessprotector: "",
    pvt: "",
    lossofuse: "",
    pcf: "",
    itl: "",
    stampduty: "",
  });

  useEffect(() => {
    const fetchCompanyDetails = async () => {
      try {
        const url = `http://localhost:8001/insurance_companies/${id}`;
        const response = await fetch(url, {
          method: "GET",
          headers: { "content-type": "application/json" },
        });

        if (!response.ok) {
          throw new Error("Failed to fetch company details");
        }

        const data = await response.json();
        setCompany(data);
        setEditedCompany({
          company: data.company,
          phone: data.phone,
          email: data.email,
          rate: data.rate,
          excessprotector: data.excessprotector,
          pvt: data.pvt,
          lossofuse: data.lossofuse,
          pcf: data.pcf,
          itl: data.itl,
          stampduty: data.stampduty,
        });
      } catch (error) {
        console.error(error);
      }
    };

    fetchCompanyDetails();
  }, [id]);


  const handleInputChange = (e) => {
    const { name, value } = e.target;
  
    // List of fields that should be updated as integers
    const integerFields = [
      "rate",
      "excessprotector",
      "pvt",
      "lossofuse",
      "pcf",
      "itl",
      "stampduty",
    ];
  
    // If the input field is in the integerFields list, convert the value to an integer
    const updatedValue = integerFields.includes(name) ? parseInt(value, 10) : value;
  
    setEditedCompany((prevCompany) => ({
      ...prevCompany,
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
  
        const url = `http://localhost:8001/insurance_companies/${id}`;
        const response = await fetch(url, {
          method: "PUT",
          headers: { "content-type": "application/json" },
          body: JSON.stringify(editedCompany),
        });
  
        if (!response.ok) {
          throw new Error("Failed to update Insurance company details");
        }
  
        // Show SweetAlert success confirmation
        await Swal.fire({
          icon: "success",
          title: "Insurance company details updated successfully!",
          showConfirmButton: false,
          timer: 1500,
        });
  
        // Fetch updated company details immediately after saving
        const updatedResponse = await fetch(`http://localhost:8001/insurance_companies/${id}`, {
          method: "GET",
          headers: { "content-type": "application/json" },
        });
  
        if (!updatedResponse.ok) {
          throw new Error("Failed to fetch updated companies details");
        }
  
        const updatedData = await updatedResponse.json();
        setCompany(updatedData);
      } else {
        // User clicked "Cancel" or closed the modal
        Swal.fire('Cancelled', 'Your changes have not been saved.', 'info');
      }
    } catch (error) {
      console.error(error);
    }
  };
  

  const handleDeleteCompany = () => {
    // Show SweetAlert confirmation for delete
    Swal.fire({
      title: "Are you sure?",
      text: "Once deleted, you will not be able to recover this Insurance company!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#d33",
      cancelButtonColor: "#3085d6",
      confirmButtonText: "Yes, delete it!",
    }).then(async (result) => {
      if (result.isConfirmed) {
        try {
          const url = `http://localhost:8001/insurance_companies/${id}`;
          const response = await fetch(url, {
            method: "DELETE",
            headers: { "content-type": "application/json" },
          });

          if (!response.ok) {
            throw new Error("Failed to delete Insurance company");
          }

          // Show SweetAlert confirmation for delete success
          Swal.fire({
            icon: "success",
            title: "Insurance company deleted successfully!",
            showConfirmButton: false,
            timer: 1500,
          });

          // Navigate back to the companies page
          navigate("/companies");

        } catch (error) {
          console.error(error);
        }
      }
    });
  }


  return (
    <>
    <h1 className="font-bold text-2xl">Edit Insurance company info</h1>
    
    <div className="flex-container">
    
      {/* COMPANY DETAILS */}


      <div className="flex-item" id="div1">
      <h2 className="font-bold text-3xl underline mb-1">Company Information</h2>
      <ul style={{listStyle:"none"}}>
        <li className="text-xl">
          <strong>Company:</strong> {company.company}
        </li>

        <li className="text-xl">
          <strong>Phone:</strong> {company.phone}
        </li>

        <li className="text-xl">
          <strong>Email:</strong> {company.email}
        </li>

        <li className="text-xl">
          <strong>Rate(%):</strong> {company.rate}%
        </li>
        <li className="text-xl">
          <strong>Excess Protector(%):</strong> {company.excessprotector}%
        </li>
        <li className="text-xl">
          <strong>P.V.T(%):</strong> {company.pvt}%
        </li>
        <li className="text-xl">
          <strong>Loss of use:</strong> {company.lossofuse}
        </li>
        <li className="text-xl">
          <strong>P.C.F(%):</strong> {company.itl}%
        </li>
        <li className="text-xl">
          <strong>I.T.L(%):</strong> {company.itl}%
        </li>
        <li className="text-xl">
          <strong>Stamp Duty:</strong> {company.stampduty}
        </li>
      </ul>
    </div>



      {/* UPDATE FORM */}
      <div className="flex-item" id="div1">    
      <form className="update-client">
        <h2 className="font-bold text-2xl underline mb-2">Update company</h2>


        <div className="flex items-center mb-1">
            <label className="mr-2">
          Company:
          </label>
          <input
            type="text"
            className="shadow appearance-none border rounded w-full py-1 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            name="company"
            placeholder="Update company name"
            onChange={handleInputChange}
          />
        </div>

        <div className="flex items-center mb-1">
            <label className="mr-2">
          Phone:
          </label>
          <input
            type="tel"
            className="shadow appearance-none border rounded w-full py-1 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            name="phone"
            placeholder="Update phone number"
            onChange={handleInputChange}
          />
        </div>

        <div className="flex items-center mb-1">
            <label className="mr-2">
          Email:
          </label>
          <input
            type="text"
            className="shadow appearance-none border rounded w-full py-1 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            name="email"
            placeholder="Update email"
            onChange={handleInputChange}
          />
        </div>

        <div className="flex items-center mb-1">
            <label className="mr-2">
          Rate(%):
          </label>
          <input
            type="number"
            className="shadow appearance-none border rounded w-full py-1 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            name="rate"
            placeholder="Update Rate(%)"
            onChange={handleInputChange}
          />
        </div>

        <div className="flex items-center mb-1">
            <label className="mr-2">
            Excess_Protector(%):
          </label>
          <input
            type="number"
            className="shadow appearance-none border rounded w-full py-1 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            name="excessprotector"
            placeholder="Update Excess protector(%)"
            onChange={handleInputChange}
          />
        </div>

        <div className="flex items-center mb-1">
            <label className="mr-2">
            P.V.T(%):
          </label>
          <input
            type="number"
            className="shadow appearance-none border rounded w-full py-1 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            name="pvt"
            placeholder="Update P.V.T(%)"
            onChange={handleInputChange}
          />
        </div>

        <div className="flex items-center mb-1">
            <label className="mr-2">
          Loss_of_use:
          </label>
          <input
            type="number"
            className="shadow appearance-none border rounded w-full py-1 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            name="lossofuse"
            placeholder="Update Loss of use"
            onChange={handleInputChange}
          />
        </div>

        <div className="flex items-center mb-1">
            <label className="mr-2">
            P.C.F(%):
          </label>
          <input
            type="number"
            className="shadow appearance-none border rounded w-full py-1 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            name="pcf"
            placeholder="Update P.C.F(%)"
            onChange={handleInputChange}
          />
        </div>

        <div className="flex items-center mb-1">
            <label className="mr-2">
            I.T.L(%):
          </label>
          <input
            type="number"
            className="shadow appearance-none border rounded w-full py-1 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            name="itl"
            placeholder="Update I.T.L(%)"
            onChange={handleInputChange}
          />
        </div>

        <div className="flex items-center mb-1">
            <label className="mr-2">
          Stamp_duty:
          </label>
          <input
            type="number"
            className="shadow appearance-none border rounded w-full py-1 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            name="stampduty"
            placeholder="Update Stamp duty"
            onChange={handleInputChange}
          />
        </div>

    <div className="flex mt-2">

        <button
        
         type="button"
        onClick={handleSaveChanges} 
        className="bg-blue-500 hover:bg-blue-600 text-white font-bold  py-1 px-2 rounded mr-3 "
        >
          Save Changes
        </button>

        <button 
        type="button" 
        onClick={handleDeleteCompany} 
        className="bg-red-500 hover:bg-red-600 text-white font-bold  py-1 px-2  rounded "

        >
              Delete Company
            </button>

     </div>       

      </form>
      </div>



    </div>
    <div class="flex items-center justify-center">
        <button onClick={() => navigate(`/companies`)} className="view-more-button">
          Back
        </button>
    </div>
    </>

  );
}
