const SeatMasterApiClient = {
	get: async (url, queryParams) => {
		// todo
		console.log(url, queryParams);
	},
	post: async (url, bodyParams) => {
		console.log('Post to SeatMaster api: ', url, bodyParams);
		try {
			const response = await fetch(url, {
				method: 'POST',
				mode: 'cors',
				headers: {
					'Content-Type': 'application/json'
				},
				body: JSON.stringify(bodyParams)
			});
			const parsedResponse = await response.json();
			parsedResponse.status = response.status;
			console.log('Post response: ', parsedResponse);
			return parsedResponse;
		} catch(err) {
			console.log('err in post', err);
		}
	},
	put: async (url, bodyParams) => {
		// todo
		console.log(url, bodyParams);
	},
	delete: async (url, queryParams) => {
		// todo
		console.log(url, queryParams);
	},
	
};

export default SeatMasterApiClient;