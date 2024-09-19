import React, { Component } from "react";
import { useState, useContext } from "react";
import { Navigate, useNavigate } from "react-router-dom";
import { Context } from "../store/appContext";
import { Link } from "react-router-dom";
import { func } from "prop-types";

export const Signup = () => {
    const [ formData, setFormData ] = useState({ email: '', password: '' });
    const [ email, setEmail ] = useState("");
    const [ password, setPassword ] = useState("")

    const { store, actions } = useContext(Context)
    const navigate = useNavigate();

    
    // function handleSubmit2 = async (event) => {}

    function handleSubmit (event) {
        event.preventDefault()

        // const requestOptions = {
        //     method: "POST",
        //     headers: {"Content-Type": "application/json"},
        //     body: JSON.stringify({
        //         "email": email,
        //         "password": password
        //         }),
        //     redirect: "follow"
        //   };
          
        //   fetch("https://refactored-carnival-v6gv6gw5x65j3xggx-3001.app.github.dev/api/signup", requestOptions)
        //     .then((response) => response.json())
        //     .then((data) => console.log(data))
        //     .catch((error) => console.error(error));

        if (!email || !password) {
            console.log("Input is empty")
            return alert("All inputs should be filled");
        }
        else if (!email.includes("@")) {
            return alert("Email should have @ symbol")
        }
        else console.log("Everything looks fine");


        actions.userSignup(email, password)
        // store.isLoggedIn === true
        navigate("/api/login")
    }

    
    return (
    <div className="container col-6 mt-5">
        <h1 className="text-center">SING UP NEW USER or <Link to="/">
					<span className="navbar-brand mb-0 h1">go back home</span>
				</Link></h1>
        <form onSubmit={handleSubmit}>
            <div className="form-floating col-auto mb-3">
                <input type="email"
                className="form-control"
                id="emailInput"
                placeholder="name@example.com"
                value={email}
                onChange={(e)=> setEmail(e.target.value)}
                />
                <label htmlFor="emailInput">Email address</label>
            </div>
            <div className="form-floating col-auto">
                <input type="password"
                className="form-control"
                id="passwordInput"
                placeholder="Password"
                value={password}
                onChange={(e)=> setPassword(e.target.value)}
                />
                <label htmlFor="passwordInput">Password</label>
            </div>
            <div className="col-auto mt-1 text-center">
                <span id="passwordHelpInline" className="form-text">
                We suggest to create a password containing upper and lowercase letters, special characters and numbers.
                </span>
            </div>
            <p className="mt-5 mb-5 text-primary">If you want to be VIP, press Sign Up</p>
            <button type="submit" className="btn btn-primary mb-5">I want to be VIP!</button>
        </form>
    </div>
);
}