import React from "react";
import AddTransaction from "../../components/TransactionPost";
import DisplayTransaction from "../../components/TransactionDisplay";
import Motornav from "../../components/Motornav";

export default function Motor(){

return(
    <>
    <div className="container mx-auto p-4" style={{ marginBottom: "10px", fontWeight: "bold" }}>
    <Motornav/>
    <h1 className="font-bold text-3xl">MOTOR PAGE</h1>
    <AddTransaction/>
    <br/>
    <DisplayTransaction/>
    </div>

    </>

)


}