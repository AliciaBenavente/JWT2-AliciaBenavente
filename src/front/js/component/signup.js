import React, { Component } from "react";
import { useState, useContext } from "react";
import { Context } from "../store/appContext";

export const Signup = () => {
    const [ formData, setFormData ] = useState({ email: '', password: '' });
    const [ email, setEmail ] = useState("");
    const [ password, setPassword ] = useState("")

    const { actions } = useContext(Context)


    const handleSubmit = async (event) => {
        event.preventDefault()
        // console.log("Hi")

        if (!email || !password) {
            // console.log("Input is empty")
            return alert("All inputs should be filled");
        // }
        // else if (!email.includes("@")) {
        //     return alert("Email should have @ symbol")
        }
        else console.log("Everything looks fine");
        
        await actions.userSignup(email, password)
        await actions.userSignup(password)
        
    }
    
    return (
    <div className="container col-6 mt-5">
        <h1>SING UP NEW USER</h1>
        <form>
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
            <button type="submit" onClick={handleSubmit} className="btn btn-primary mb-5">I want to be VIP!</button>
        </form>
    </div>
);
}