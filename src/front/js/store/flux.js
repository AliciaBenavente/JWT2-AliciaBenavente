const getState = ({ getStore, getActions, setStore }) => {
	return {
		store: {
			message: null,
			demo: [
				{
					title: "FIRST",
					background: "white",
					initial: "white"
				},
				{
					title: "SECOND",
					background: "white",
					initial: "white"
				}
			],
			users: [],
			isLoggedIn: false,
		},
		actions: {

			userSignup: async (email, password) => {
				try {
					const store = getStore();

					const response = await fetch(process.env.BACKEND_URL + "/api/signup", {
                        method: 'POST',
                        headers: {
                            'Content-Type': 'application/json',
                        },
                        body: JSON.stringify(email, password),
                    });
					console.log(resp);
					
					const data = await response.json()
					console.log(data);
					if (response.ok) {
						setStore({ users: [...store.users], data })
						console.log("User", users)
						console.log(data);
						return data
					} else {
						console.error("Error during signup:", error)
						return ("Error from signup in flux")
                    }
					} catch (error) {
						console.error("Error during signup:", error);
					}
			},

			userLogin: (email, password) => {
					const requestOptions = {
						method: "POST",
						headers: { "Content-Type": "application/json" },
						body: JSON.stringify({
							"email": email,
							"password": password
							}),
					  };
					  
					  fetch(process.env.BACKEND_URL + "/api/login", requestOptions)
						.then((response) => {
							console.log(response.status)
							if (response.status === 200) {
								setStore ({ isLoggedIn: true})
							}
							return response.json()
						}
						)
						.then((data) =>
							localStorage.setItem("TK", data.access_token),
						)
						.catch((error) => console.error("Error", error));
				
			},



			// Use getActions to call a function within a fuction
			exampleFunction: () => {
				getActions().changeColor(0, "green");
			},
			
			getMessage: async () => {
				try{
					// fetching data from the backend
					const resp = await fetch(process.env.BACKEND_URL + "/api/hello")
					const data = await resp.json()
					setStore({ message: data.message })
					// don't forget to return something, that is how the async resolves
					return data;
				}catch(error){
					console.log("Error loading message from backend", error)
				}
			},
			changeColor: (index, color) => {
				//get the store
				const store = getStore();

				//we have to loop the entire demo array to look for the respective index
				//and change its color
				const demo = store.demo.map((elm, i) => {
					if (i === index) elm.background = color;
					return elm;
				});

				//reset the global store
				setStore({ demo: demo });
			}
		}
	};
};

export default getState;
