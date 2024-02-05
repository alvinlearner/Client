import React from "react";
import ClientPost from "../../components/ClientPost";
import ClientDisplay from "../../components/ClientDisplay"
import Motornav from "../../components/Motornav";



export default function Client(){

return(
    <>
    <div className="container mx-auto p-4" style={{ marginBottom: "10px", fontWeight: "bold" }}>
    <Motornav/>
    <h1 className="font-bold text-3xl">CLIENT PAGE</h1>
    <ClientPost/>
    <br/>
    <ClientDisplay/>
    </div>

    </>

)


}