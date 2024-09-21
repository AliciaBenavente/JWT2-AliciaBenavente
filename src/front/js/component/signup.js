import React, { Component } from "react";
import { useState, useContext } from "react";
import { Navigate, useNavigate } from "react-router-dom";
import { Context } from "../store/appContext";
import { Link } from "react-router-dom";
import "../../styles/signup.css";

export const Signup = () => {
    const [ email, setEmail ] = useState("");
    const [ password, setPassword ] = useState("")
    const [ showEmptyInputs, setShowEmptyInputs ] = useState(false)
    const [ showAt, setShowAt ] = useState(false)
    const [ showSuccessMessage, setShowSuccessMessage ] = useState(false)
    const [ showExists, setShowExists] = useState(false)
    
    // At = @

    
    const { store, actions } = useContext(Context)
    const navigate = useNavigate();
    

    function handleSubmit (event) {
        event.preventDefault()

        if (!email || !password) {
            console.log("Input is empty")
            setShowEmptyInputs(true)
            return;
        }
        else if (!email.includes("@")) {
            setShowAt(true)
            return;
        }

        actions.checkUserExists(email).then(userExists => {
            if (userExists) {
                setShowExists(true)
                return;
            }
            actions.userSignup(email, password);
            setShowSuccessMessage(true);
            // console.log("navigated to login")
            setTimeout(() => {
                navigate("/api/login");
            }, 3000);
        });
    }

    
    return (
    <div className="container col-6 mt-5">
        {showSuccessMessage &&
        <div className="alert alert-success">Signup successful! Redirecting to Login!
            <span className="spinner-border spinner-border-sm ms-3" aria-hidden="true"></span>
            <span className="visually-hidden" role="status">Loading...</span>
        </div>
        }
        <h1 className="text-center">SING UP NEW USER or <Link to="/">
					<span className="navbar-brand mb-0 h1">go back home</span>
				</Link></h1>
        <form className="form1 mt-5" onSubmit={handleSubmit}>
            <p id="heading1">Singup</p>
            {showEmptyInputs &&
            <div className="alert alert-warning alert-dismissible fade show text-center" role="alert">
                All inputs should be filled.
                <button type="button" onClick={()=>setShowEmptyInputs(false)} className="btn-close" data-bs-dismiss="alert" aria-label="Close"></button>
            </div>
            }
            {showExists &&
            <div className="alert alert-danger alert-dismissible fade show text-center" role="alert">
                Email or password incorrect.
                <button type="button" onClick={()=>setShowExists(false)} className="btn-close" data-bs-dismiss="alert" aria-label="Close"></button>
            </div>
            }
            {showAt &&
            <div className="alert alert-warning alert-dismissible fade show text-center" role="alert">
                Email should have @ symbol.
                <button type="button" onClick={()=>setShowAt(false)} className="btn-close" data-bs-dismiss="alert" aria-label="Close"></button>
            </div>
            }
            <div className="field1">
                <svg className="input-icon1" xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" viewBox="0 0 16 16">
                <path d="M13.106 7.222c0-2.967-2.249-5.032-5.482-5.032-3.35 0-5.646 2.318-5.646 5.702 0 3.493 2.235 5.708 5.762 5.708.862 0 1.689-.123 2.304-.335v-.862c-.43.199-1.354.328-2.29.328-2.926 0-4.813-1.88-4.813-4.798 0-2.844 1.921-4.881 4.594-4.881 2.735 0 4.608 1.688 4.608 4.156 0 1.682-.554 2.769-1.416 2.769-.492 0-.772-.28-.772-.76V5.206H8.923v.834h-.11c-.266-.595-.881-.964-1.6-.964-1.4 0-2.378 1.162-2.378 2.823 0 1.737.957 2.906 2.379 2.906.8 0 1.415-.39 1.709-1.087h.11c.081.67.703 1.148 1.503 1.148 1.572 0 2.57-1.415 2.57-3.643zm-7.177.704c0-1.197.54-1.907 1.456-1.907.93 0 1.524.738 1.524 1.907S8.308 9.84 7.371 9.84c-.895 0-1.442-.725-1.442-1.914z"></path>
                </svg>
                <input autoComplete="off"
                placeholder="Email address"
                className="input-field1"
                type="text"
                value={email}
                onChange={(e)=> setEmail(e.target.value)}/>
            </div>
            <div className="field1">
                <svg className="input-icon1" xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" viewBox="0 0 16 16">
                <path d="M8 1a2 2 0 0 1 2 2v4H6V3a2 2 0 0 1 2-2zm3 6V3a3 3 0 0 0-6 0v4a2 2 0 0 0-2 2v5a2 2 0 0 0 2 2h6a2 2 0 0 0 2-2V9a2 2 0 0 0-2-2z"></path>
                </svg>
                <input
                placeholder="Password"
                className="input-field1"
                type="password"
                value={password}
                onChange={(e)=> setPassword(e.target.value)}/>
            </div>
            <div className="btn1">
                <p className="text-white-50">If you want to be VIP, fill the inputs and press the button!</p>
                <button className="button rounded-pill" type="submit">I want to be VIP!</button>
            </div>
        </form>
    </div>
);
}