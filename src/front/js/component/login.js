import React, { Component, useState, useContext, useEffect } from "react";
import { Navigate, useNavigate } from "react-router-dom";
import { Context } from "../store/appContext";
import { Link } from "react-router-dom";
import "../../styles/login.css";

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
        <form className="form mx-auto">
            <div class="group">
                <svg stroke="currentColor" stroke-width="1.5" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg" class="icon">
                <path d="M16.5 10.5V6.75a4.5 4.5 0 10-9 0v3.75m-.75 11.25h10.5a2.25 2.25 0 002.25-2.25v-6.75a2.25 2.25 0 00-2.25-2.25H6.75a2.25 2.25 0 00-2.25 2.25v6.75a2.25 2.25 0 002.25 2.25z" stroke-linejoin="round" stroke-linecap="round"></path>
                </svg>
                <input type="password"
                className="form-control passwordInput"
                id="floatingPassword"
                // placeholder="Password"
                value={password}
                onChange={(e)=> setPassword(e.target.value)}/>
            </div>

            <div class="group2">
            <input type="email" 
                className="form-control emailInput"
                id="floatingInput"
                placeholder="email addess"
                value={email}
                onChange={(e)=> setEmail(e.target.value)}/>
            </div>

                {/* <div className="form-floating col-auto mb-3">
                    <input type="email" 
                    className="form-control"
                    id="floatingInput"
                    placeholder="name@example.com"
                    value={email}
                    onChange={(e)=> setEmail(e.target.value)}/>
                    <label htmlFor="floatingInput">Email address</label>
                </div> */}
                {/* <div className="form-floating col-auto">
                    <input type="password"
                    className="form-control"
                    id="floatingPassword"
                    placeholder="Password"
                    value={password}
                    onChange={(e)=> setPassword(e.target.value)}/>
                    <label htmlFor="floatingPassword">Password</label>
                </div> */}
                <button type="submit" className="btn btn-primary mb-5">Access for VIP people</button>
            </form>
            </div>
        }
    </>
);
}