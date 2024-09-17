import React, { Component } from "react";
import { useState } from "react";

export const Signup = () => {
    const [ formData, setFormData ] = useState({ username: '', password: '' });
    const handleSubmit = () => {
        
    }

    return (
    <div className="container col-6 mt-5" onSubmit={() => handleSubmit}>
        <h1>SING UP NEW USER</h1>
        <div className="form-floating col-auto mb-3">
            <input type="email" className="form-control" id="floatingInput" placeholder="name@example.com"/>
            <label for="floatingInput">Email address</label>
        </div>
        <div className="form-floating col-auto">
            <input type="password" className="form-control" id="floatingPassword" placeholder="Password"/>
            <label for="floatingPassword">Password</label>
        </div>
        <div className="col-auto mt-1 text-center">
            <span id="passwordHelpInline" className="form-text">
            We suggest to create a password containing upper and lowercase letters, special characters and numbers.
            </span>
        </div>
        <p className="mt-5 mb-5 text-primary">If you want to be VIP, press Sign Up</p>
        <button type="submit" className="btn btn-primary mb-5">I want to be VIP!</button>
    </div>
);
}