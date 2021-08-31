const axios = require('axios').default;

const SeatMasterApiClient = {
	get: async (url, queryParams) => {
		// todo
		console.log(url, queryParams);
	},
	post: async (url, bodyParams) => {
		const headers = {
			headers: {
				'Content-Type': 'application/json'
			}
		};
		
		try {
			const resp = await axios.post(url, bodyParams, headers);
			console.log('Post response', resp);
			return resp;
		} catch (err) {
			console.error('error in Post response', err);
			return err;
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