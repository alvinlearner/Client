import { useNavigate } from "react-router-dom";
import React  from 'react';


export default function Dashboard(){
  const navigate = useNavigate();

  return (
    <>
<div className="flex-container text-2xl font-bold">

<div className="flex-item bg-transparent hover:bg-blue-500 text-blue-700 font-semibold hover:text-white py-2 px-4 border border-blue-500 hover:border-transparent rounded" style={{cursor:"pointer", textAlign:'center'}} onClick={() => navigate('/motor')} > Motor</div>

<div className="flex-item bg-transparent hover:bg-blue-500 text-blue-700 font-semibold hover:text-white py-2 px-4 border border-blue-500 hover:border-transparent rounded" style={{cursor:"pointer", textAlign:'center'}} onClick={() => navigate('/medical')} >Medical</div>

</div>

<div className="flex-container text-2xl font-bold" >
<div className="flex-item bg-transparent hover:bg-blue-500 text-blue-700 font-semibold hover:text-white py-2 px-4 border border-blue-500 hover:border-transparent rounded" style={{cursor:"pointer", textAlign:'center'}} >General</div>
<div className="flex-item bg-transparent hover:bg-blue-500 text-blue-700 font-semibold hover:text-white py-2 px-4 border border-blue-500 hover:border-transparent rounded" style={{cursor:"pointer", textAlign:'center'}} onClick={() => navigate('/general')}>All risk</div>
</div>

</>

  );
};
