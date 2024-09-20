import React, { useContext } from "react";
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
			<div className="container-fluid">
				{store.isLoggedIn === true ? 
				<div className="d-flex justify-content-end w-100">
						<button className="btn btn-danger float-end"
						onClick={handleLogout}>
							Log out
						</button>
				</div>
				 : ""		
				} 
			</div>
		</nav>
	);
};
