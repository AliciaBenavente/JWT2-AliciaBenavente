import React, { useContext } from "react";
import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import { Context } from "../store/appContext";


export const Navbar = () => {
	
	const { store, actions } = useContext(Context);
	const navigate = useNavigate();

	function handleLogout () {
		console.log("Hi");
		actions.userLogout()
		navigate("/")
	}

	return (
		<nav className="navbar navbar-light bg-light">
			<div className="container text-center">
				{store.isLoggedIn === true ? 
						<button className="btn btn-danger"
						onClick={handleLogout}>
							Log out
						</button>
				 : ""		
				} 
			</div>
		</nav>
	);
};
