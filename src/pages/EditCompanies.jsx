import  {useState} from "react";

export default function EditCompanies(){

    const [count, Setcount]= useState(0);

    function add(){
        Setcount(count + 1)
    }


    return(
        <>
        
        <button onClick={add} className="bg-red-500 hover:bg-red-600 px-4 py-3">Add </button>
        <h1 className="bold text-xl">{count}</h1>
        </>
    )
}