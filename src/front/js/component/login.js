import React, { Component, useState, useContext, useEffect } from "react";
import { Navigate, useNavigate } from "react-router-dom";
import { Context } from "../store/appContext";
import { Link } from "react-router-dom";

export const Login = () => {
    const { store, actions } = useContext(Context);
    const [ email, setEmail ] = useState("");
    const [ password, setPassword ] = useState("")

    const navigate = useNavigate();

    function handleSubmit (event) {
        event.preventDefault()

        if (!email || !password) {
            console.log("Input is empty")
            return alert("All inputs should be filled");
        }
        else if (!email.includes("@")) {
            return alert("Email should have @ symbol")
        }
        else console.log("Everything looks fine");


        actions.userLogin(email, password)
        navigate("/api/private")
    }

    return (
        <>
        {store.isLoggedIn === true ? <Navigate to="/api/private"/> :
        <div className="container col-6 mt-5" onSubmit={handleSubmit}>
        <h1 className="text-center">LOGIN YOUR USER or <Link to="/">
					<span className="navbar-brand mb-0 h1">go back home</span>
				</Link></h1>
                <form>
                <div className="form-floating col-auto mb-3">
                    <input type="email" 
                    className="form-control"
                    id="floatingInput"
                    placeholder="name@example.com"
                    value={email}
                    onChange={(e)=> setEmail(e.target.value)}/>
                    <label htmlFor="floatingInput">Email address</label>
                </div>
                <div className="form-floating col-auto">
                    <input type="password"
                    className="form-control"
                    id="floatingPassword"
                    placeholder="Password"
                    value={password}
                    onChange={(e)=> setPassword(e.target.value)}/>
                    <label htmlFor="floatingPassword">Password</label>
                </div>
                <button type="submit" className="btn btn-primary mb-5">Access for VIP people</button>
            </form>
            </div>
        }
    </>
);
}