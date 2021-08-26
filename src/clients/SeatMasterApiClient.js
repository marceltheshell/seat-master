const SeatMasterApiClient = {
	get: async (url, queryParams) => {
		// todo
		console.log(url, queryParams);
	},
	post: async (url, bodyParams) => {
		console.log('Post to SeatMaster api: ', url, bodyParams);
		const response = await fetch(url, {
			method: 'POST',
			mode: 'cors',
			headers: {
				'Content-Type': 'application/json'
			},
			body: JSON.stringify(bodyParams)
		});
		const parsedResponse = await data.json();
		console.log('Post response: ', parsedResponse);
		return parsedResponse;
	},
	put: async (url, bodyParams) => {
		// todo
		console.log(url, queryParams);
	},
	delete: async (url, queryParams) => {
		// todo
		console.log(url, queryParams);
	},
	
};

export default SeatMasterApiClient;