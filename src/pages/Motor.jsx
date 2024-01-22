import React from "react";
import AddTransaction from "../components/TransactionPost";
import DisplayTransaction from "../components/TransactionDisplay";

export default function Motor(){

return(
    <>
    <h1 className="font-bold text-3xl">MOTOR PAGE</h1>
    <AddTransaction/>
    <br/>
    <DisplayTransaction/>


    </>

)


}