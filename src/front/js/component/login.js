import React, { Component } from "react";
import { useState } from "react";

export const Login = () => {
    const handleSubmit = () => {

    }

    return (
    <div className="container col-6 mt-5" onSubmit={() => handleSubmit}>
        <h1>LOGIN YOUR USER</h1>
        <div className="form-floating col-auto mb-3">
            <input type="email" className="form-control" id="floatingInput" placeholder="name@example.com"/>
            <label for="floatingInput">Email address</label>
        </div>
        <div className="form-floating col-auto">
            <input type="password" className="form-control" id="floatingPassword" placeholder="Password"/>
            <label for="floatingPassword">Password</label>
        </div>
        <button type="submit" className="btn btn-primary mb-5">Access for VIP people</button>
    </div>
);
}