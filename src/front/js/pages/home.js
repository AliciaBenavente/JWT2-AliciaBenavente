import React from "react";
import { Link } from "react-router-dom";
import "../../styles/home.css";

export const Home = () => {

	return (
		<div className="text-center container mt-5 " id="home">
			<h1 className="mb-5">It's good to have you here! What would you like to do?</h1>
			<div className="d-flex justify-content-evenly">
			<Link to="/api/signup">
				<button className="signup">
					<div className="original">Signup</div>
					<div className="letters">
						<span>S</span>
						<span>I</span>
						<span>G</span>
						<span>N</span>
						<span>U</span>
						<span>P</span>
					</div>
				</button>
			</Link>
			<Link to="/api/login">
				<button className="login">
					<div className="original">Login</div>
					<div className="letters">
						<span>L</span>
						<span>O</span>
						<span>G</span>
						<span>I</span>
						<span>N</span>
					</div>
				</button>
			</Link>
			</div>
		</div>
	);
};
