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
			users: []
		},
		actions: {
			userSignup: async (formData) => {
				try {
					const store = getStore();

					const resp = await fetch(process.env.BACKEND_URL + "/signup", {
                        method: 'POST',
						// mode: 'no-cors',
                        headers: {
                            'Content-Type': 'application/json',
							// "Accept": "application/json",
                        },
                        body: JSON.stringify(formData),
                    });
					console.log(resp);
					
					const text = await resp.text()
					console.log(text);
					if (resp.ok) {
						const data = JSON.parse(text)
						setStore({ users: [...store.users], data })
						console.log(users)
						console.log(data);
						
					} else {
						console.error("Error during signup:", error)
                    }
					} catch (error) {
						console.error("Error during signup:", error);
					}
			},
			userLogin: () => {
				setStore ({ isLoggedIn: true})
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
