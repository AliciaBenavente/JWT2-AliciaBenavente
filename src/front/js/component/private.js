import React, { Component, useContext } from "react";
import { Context } from "../store/appContext";
import { Navigate } from "react-router-dom";

export const Private = () => {
    const { store, actions } = useContext(Context)
    // const navigate = useNavigate()
    const autenticate = store.isLoggedIn

    if (!autenticate){
        return <Navigate to="/" />
    }

    return (
    <div className="container col-6 mt-5">
        <h1 className="text-center">Hello! THIS IS THE PRIVATE VIEW</h1>        
    </div>
);
}